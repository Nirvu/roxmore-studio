// netlify/functions/schedule.js
// Auto-generates articles on a schedule — no external dependencies

const TOPICS = [
  'marketing strategy for small business owners UK',
  'B2B lead generation without paid advertising',
  'how to scale a service business profitably',
  'pricing strategy for consultants and agencies',
  'content marketing ROI for SMEs',
  'sales process automation for small businesses',
  'business development frameworks that work',
  'leadership mistakes founders make when scaling',
  'performance marketing vs brand marketing',
  'how to write a go-to-market strategy',
  'customer retention strategies for growing businesses',
  'how to hire your first marketing person',
];

async function generateArticle(topic) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');

  const prompt = 'You are a world-class content strategist for Roxmore, a performance marketing consultancy in Surrey, UK. Write a complete 900-1200 word article on: "' + topic + '". Optimise for Google SEO and AEO. Open with a Quick Answer blockquote. Use question-based H2 headings. End with a FAQ section. Return ONLY a valid JSON object (no markdown) with: slug, title, category, readTime, excerpt, metaTitle, metaDescription, metaKeywords (array of 6), faqSchema (array of {question,answer}), body (HTML), publishDate (today ISO string), featured (false), seoScore ("A"), wordCount (integer).';

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 6000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  if (!data || !data.content || !data.content[0]) throw new Error('Empty API response');

  let text = data.content[0].text.trim();
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
  if (text.startsWith('[')) {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) text = m[0];
  }

  const article = JSON.parse(text);
  article.status = 'pending';
  article.id = Date.now() + Math.random();
  article.generatedAt = new Date().toISOString();
  article.scheduledGeneration = true;
  return article;
}

exports.handler = async (event) => {
  console.log('Roxmore scheduled generation starting...');

  const shuffled = [...TOPICS].sort(() => Math.random() - 0.5);
  const topics = shuffled.slice(0, 2);
  const results = [];
  const errors = [];

  for (const topic of topics) {
    try {
      const article = await generateArticle(topic);
      results.push(article);
      console.log('Generated: ' + article.title);
    } catch (err) {
      errors.push({ topic, error: err.message });
      console.error('Failed: ' + topic + ' — ' + err.message);
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ generated: results.length, errors: errors.length, articles: results, timestamp: new Date().toISOString() }),
  };
};
