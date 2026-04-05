export function detectLanguageFromCode(code) {
  const snippet = code.toLowerCase();

  
  // -------- Java (strict) --------
  if (
    /\bpublic\s+class\s+\w+/.test(snippet) ||          // public class X
    /\bpublic\s+static\s+void\s+main/.test(snippet) || // main method
    /\bsystem\.out\.println\s*\(/.test(snippet)
  ) {
    return 'java';
  }

  // -------- Python (strict) --------
  if (
    /\bdef\s+\w+\s*\(/.test(snippet) ||               // def func(
    /\bprint\s*\(/.test(snippet) ||                    // print(
    /\bimport\s+\w+/.test(snippet) ||                  // import module
    /if\s+__name__\s*==\s*['"]__main__['"]/.test(snippet)
  ) {
    return 'python';
  }

  // -------- C++ (strict) --------
  if (
    /#include\s*<iostream>/.test(snippet) ||            // iostream
    /\bstd::\w+/.test(snippet) ||                        // std::
    /\busing\s+namespace\s+std\b/.test(snippet)
  ) {
    return 'cpp';
  }

  // -------- C (strict) --------
  if (
    /#include\s*<stdio\.h>/.test(snippet) ||             // stdio
    /\bprintf\s*\(/.test(snippet)
  ) {
    return 'c';
  }

  // -------- Unknown --------
  return 'unknown';
}
