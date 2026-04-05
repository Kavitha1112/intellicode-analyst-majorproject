const ALLOWED_LANGUAGES = ['python', 'java', 'cpp', 'c', 'auto'];

export function validateAnalyzeRequest(body) {
  const { code, language } = body;

  if (!code || typeof code !== 'string' || !code.trim()) {
    return { valid: false, error: 'Code must be a non-empty string' };
  }

  if (!language || !ALLOWED_LANGUAGES.includes(language)) {
    return { valid: false, error: 'Invalid or unsupported language' };
  }

  return { valid: true };
}
