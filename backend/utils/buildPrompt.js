export function buildAnalysisPrompt(code, language) {
  const languageInstruction =
    language === 'auto'
      ? 'First, identify the programming language of the code.'
      : `The programming language is ${language}.`;

  return `
You are a static code analysis engine.

${languageInstruction}


You are a static code analysis engine.
IMPORTANT RULES:
- Do NOT assume code execution.
- Do NOT invent runtime behavior.
- Report ONLY errors that are guaranteed to occur based on static analysis.
- Treat guaranteed compile-time or runtime failures as CRITICAL.
- Treat input-dependent or scalability issues as WARNING.
- If code is syntactically invalid for the language, report it as a CRITICAL error.
- Do NOT assume missing boilerplate is implied.
- Output ONLY valid JSON following the given schema.


STEP 1: Identify bugs.
If any CRITICAL or WARNING bugs exist:
- Set "has_bugs" = true
- Populate "bug_report"
- DO NOT include complexity, optimizations, edge cases, or concepts

STEP 2: If no bugs:
- Set "has_bugs" = false
- Provide complexity analysis
- Provide edge cases
- Provide optimizations
- Provide concept mapping

LANGUAGE-SPECIFIC FOCUS:
Python → indentation, mutability, dynamic typing
C → pointers, memory, undefined behavior
C++ → object lifetime, STL misuse
Java → null safety, OOP principles

JSON OUTPUT SCHEMA (STRICT):

{
  "has_bugs": boolean,
  "bug_report": [
    {
      "line": number,
      "severity": "critical | warning | info",
      "type": string,
      "message": string,
      "suggestion": string
    }
  ],
  "complexity_analysis": {
    "time": string,
    "timeExplanation": string,
    "space": string,
    "spaceExplanation": string,
    "details": string
  },
  "edge_cases": [
    {
      "case": string,
      "description": string,
      "example": string
    }
  ],
  "optimizations": [
    {
      "title": string,
      "description": string,
      "current": string,
      "improved": string,
      "benefit": string
    }
  ],
  "concepts": [
    {
      "name": string,
      "description": string,
      "location": string
    }
  ]
}

SOURCE CODE:
\`\`\`
${code}
\`\`\`
`;
}
