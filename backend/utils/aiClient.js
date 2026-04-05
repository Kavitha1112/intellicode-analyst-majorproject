import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Best balance of cost + reasoning for code analysis
const MODEL = 'gpt-4.1-mini';
// (You can also use 'gpt-4o' if you want max quality)

export async function callAI(prompt) {
  const completion = await client.chat.completions.create({
    model: MODEL,
    temperature: 0.15,
    messages: [
      {
        role: 'system',
        content: `
You are a professional static code analysis engine.
- Be conservative with CRITICAL severity.
- Use CRITICAL only for definite runtime errors, memory corruption, or security issues.
- Prefer WARNING or INFO for style, best practices, or optional checks.
- Output ONLY valid JSON matching the given schema.
        `.trim()
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  return completion.choices[0].message.content;
}
