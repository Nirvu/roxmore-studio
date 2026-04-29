exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: '' };
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { statusCode: 500, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }) };

  let body;
  try { body = JSON.parse(event.body); } catch (e) { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  // Extract the brief from the message
  const userMsg = body.messages[0].content;
  const briefMatch = userMsg.match(/specified this brief: "([^"]+)"/);
  const brief = briefMatch ? briefMatch[1] : 'marketing strategy for UK business owners';

  const prompt = `Write a short blog article for Roxmore, a UK marketing consultancy. Topic: "${brief}".

Return ONLY valid JSON, no markdown. Single object with these exact fields:
- slug: url-safe string
- title: compelling SEO title
- category: one of Marketing/Growth Strategy/Lead Generation/Leadership/Business Development  
- readTime: "5 min read"
- excerpt: 2 sentence summary
- metaTitle: 58 char title
- metaDescription: 150 char description
- metaKeywords: array of 5 strings
- faqSchema: array of 2 objects with question and answer fields
- body: HTML article with blockquote for quick answer, 2 h2 headings, 3 paragraphs, ul list
- publishDate: "${new Date().toISOString()}"
- featured: false
- seoScore: "A"
- wordCount: 350`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'anthropic-version': '2023-06-01', 'x-api-key': apiKey },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 1500, messages: [{ role: 'user', content: prompt }] }),
    });

    const data = await response.json();
    return { statusCode: response.status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: err.message }) };
  }
};
