function isBlockingBug(bug) {
  const text = `${bug.type} ${bug.message}`.toLowerCase();

  const BLOCKING_KEYWORDS = [
  // Division
  'division by zero',
  'divide by zero',
  'zero division',

  // Memory / pointers
  'invalid pointer',
  'dereferencing',
  'null pointer',
  'segmentation fault',
  'buffer overflow',
  'use after free',

  // Java / Python runtime
  'nullpointerexception',
  'null reference',
  'attributeerror',
  'nonetype',
  'index out of bounds',
  'indexerror',

  // Syntax / compile
  'syntax error',
  'compilation error',
  'indentation error',
  'unexpected token',
  'undeclared'
];


  return BLOCKING_KEYWORDS.some(k => text.includes(k));
}

export function normalizeAnalysis(ai) {
  const normalized = {
    has_bugs: false,
    bug_report: [],
    complexity_analysis: ai.complexity_analysis ?? null,
    edge_cases: ai.edge_cases ?? [],
    optimizations: ai.optimizations ?? [],
    concepts: ai.concepts ?? []
  };

  if (ai.has_bugs && Array.isArray(ai.bug_report)) {
    const criticalBugs = ai.bug_report.filter(
      bug => bug.severity === 'critical'
    );

    if (criticalBugs.length > 0) {
      normalized.has_bugs = true;
      normalized.bug_report = criticalBugs;
      return normalized; // ⛔ STOP EVERYTHING
    }
  }

  if (Array.isArray(ai.bug_report)) {
    const blocking = [];
    const nonBlocking = [];

    for (const bug of ai.bug_report) {
      const formatted = {
        line: bug.line ?? 1,
        severity: bug.severity ?? 'warning',
        type: bug.type ?? 'Issue',
        message: bug.message ?? '',
        suggestion: bug.suggestion ?? ''
      };

      if (isBlockingBug(formatted)) {
        blocking.push(formatted);
      } else {
        nonBlocking.push({
          ...formatted,
          severity: 'info' // 👈 downgrade
        });
      }
    }

    // 🔴 Blocking bugs stop analysis
    if (blocking.length > 0) {
      normalized.has_bugs = true;
      normalized.bug_report = blocking;
      return normalized;
    }

    // 🟡 Non-blocking issues → show as analysis insights
    normalized.has_bugs = false;
    normalized.edge_cases = [
      ...normalized.edge_cases,
      ...nonBlocking.map(b => ({
        case: b.type,
        description: b.message,
        example: b.suggestion
      }))
    ];
  }

  return normalized;
}
