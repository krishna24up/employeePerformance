const asyncHandler = require('express-async-handler');
const axios = require('axios');

const recommend = asyncHandler(async (req, res) => {
  const { employees } = req.body;
  if (!employees || !Array.isArray(employees) || employees.length === 0) {
    res.status(400);
    throw new Error('Employee list is required for AI recommendation');
  }

  const prompt = `You are an HR analyst. Analyze these employees and provide:
1. promotion recommendation for top performers,
2. training suggestions for low performers,
3. ranking by performance,
4. skill enhancement advice if skills are missing.

Employees:
${employees
    .map(
      (emp, index) =>
        `${index + 1}. Name: ${emp.name}, Department: ${emp.department}, Skills: ${emp.skills?.join(', ') || 'None'}, Performance: ${emp.performanceScore}, Experience: ${emp.experience}`
    )
    .join('\n')}

Respond as JSON with keys: promotionSuggestions, trainingSuggestions, ranking, feedback.`;

  const response = await axios.post(
    process.env.OPENAI_API_URL || 'https://openrouter.ai/api/v1/chat/completions',
    {
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const aiText = response.data?.choices?.[0]?.message?.content || response.data?.choices?.[0]?.text || '';
  res.json({ recommendation: aiText.trim() });
});

module.exports = { recommend };
