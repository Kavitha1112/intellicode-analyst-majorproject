export function safeJsonParse(text) {
  try {
    if (!text) return null;

    // Remove markdown fences if any
    let cleaned = text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    // 🔑 Extract JSON object safely
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
      return null;
    }

    const jsonString = cleaned.substring(firstBrace, lastBrace + 1);

    return JSON.parse(jsonString);
  } catch (err) {
    return null;
  }
}
