# IntelliCode Analyst

Intelligent Static Code Analysis and Explanation System

## Overview

IntelliCode Analyst helps developers and students understand and improve their source code through static analysis without execution. The system analyzes code structure, detects bugs, calculates complexity, identifies edge cases, and suggests optimizations.

## Features

- **Code Editor**: Monaco Editor integration with syntax highlighting
- **Bug Detection**: Identifies logical errors, infinite loops, syntax issues, security risks
- **Severity Classification**: Critical, Warning, and Info level bug reporting
- **Complexity Analysis**: Time and space complexity estimation
- **Edge Case Detection**: Identifies boundary conditions and potential failures
- **Optimization Suggestions**: Recommends better algorithms and data structures
- **Concept Mapping**: Explains programming concepts used in the code
- **Multi-Language Support**: Python (full), JavaScript, Java, C++, C (limited)
- **File Upload**: Upload code files directly

## Architecture

### Frontend
- React with JavaScript
- Monaco Editor for code editing
- Tailwind CSS for styling
- Lucide React for icons
- Vite build system

### Backend
- FastAPI with Python
- AST-based static analysis
- Multiple analyzer modules
- RESTful API

### Database
- Supabase for analysis history
- PostgreSQL with Row Level Security

## Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- pip

### Frontend Setup

```bash
npm install
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

## Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
python main.py
```

Backend runs on http://localhost:8000

### Start Frontend (Terminal 2)

```bash
npm run dev
```

Frontend runs on http://localhost:5173

## System Flow

1. **Code Submission**: User pastes code or uploads a file
2. **Code Parsing**: Backend parses code and builds AST
3. **Bug Detection**: System checks for critical bugs
   - If bugs found: Display bug report and STOP
   - If no bugs: Continue to advanced analysis
4. **Complexity Analysis**: Calculate time/space complexity
5. **Edge Case Detection**: Identify potential failure scenarios
6. **Optimization Suggestions**: Recommend improvements
7. **Concept Mapping**: Identify programming concepts
8. **Report Generation**: Display comprehensive analysis

## API Endpoints

### POST /api/analyze

Analyzes code and returns structured report.

**Request:**
```json
{
  "code": "def factorial(n):\n    return 1 if n == 0 else n * factorial(n-1)",
  "language": "python"
}
```

**Response (No Bugs):**
```json
{
  "has_bugs": false,
  "complexity_analysis": {
    "time": "O(n)",
    "space": "O(n)",
    "timeExplanation": "...",
    "spaceExplanation": "..."
  },
  "edge_cases": [...],
  "optimizations": [...],
  "concepts": [...]
}
```

**Response (Bugs Found):**
```json
{
  "has_bugs": true,
  "bug_report": [
    {
      "line": 5,
      "severity": "critical",
      "type": "Infinite Loop",
      "message": "While loop with condition 'True' and no break",
      "suggestion": "Add break condition or change loop condition"
    }
  ]
}
```

## Analysis Modules

### Bug Detector
- Syntax errors
- Infinite loops
- Dead/unreachable code
- Resource leaks
- Security vulnerabilities (eval, exec)
- Broad exception handlers

### Complexity Analyzer
- Loop depth analysis
- Recursion detection
- Time complexity estimation
- Space complexity calculation
- Data structure tracking

### Edge Case Detector
- Division by zero
- Index out of bounds
- Empty collection operations
- Type conversion errors
- File not found errors
- Null/invalid arguments

### Optimizer
- Nested loop optimization
- List comprehension suggestions
- Caching recommendations
- Memoization for recursion
- Efficient iteration patterns

### Concept Mapper
- Recursion
- Iteration/Loops
- Conditional logic
- Functions
- Data structures
- File I/O
- Exception handling
- List comprehensions
- OOP/Classes
- Sorting algorithms

## Supported Languages

- **Python**: Full support with AST-based analysis
- **JavaScript**: Limited support (planned)
- **Java**: Limited support (planned)
- **C++**: Limited support (planned)
- **C**: Limited support (planned)

## Technology Stack

**Frontend:**
- React 18
- Monaco Editor
- Tailwind CSS
- Lucide Icons
- Vite

**Backend:**
- FastAPI
- Python AST
- Uvicorn
- Pydantic

**Database:**
- Supabase
- PostgreSQL

## Project Structure

```
intellicode-analyst/
├── src/
│   ├── components/
│   │   ├── CodeEditor.jsx
│   │   ├── AnalysisPanel.jsx
│   │   ├── BugReport.jsx
│   │   ├── ComplexityReport.jsx
│   │   ├── EdgeCasesReport.jsx
│   │   ├── OptimizationReport.jsx
│   │   ├── ConceptMap.jsx
│   │   └── Header.jsx
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── analyzers/
│   │   ├── bug_detector.py
│   │   ├── complexity_analyzer.py
│   │   ├── edge_case_detector.py
│   │   ├── optimizer.py
│   │   └── concept_mapper.py
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## Key Constraints

- No code execution
- No runtime testing
- No dynamic input simulation
- Static analysis only with AI inference

## Future Enhancements

- Support for more languages
- Custom rule definitions
- Code quality metrics
- Security vulnerability scanning
- Integration with version control
- Team collaboration features
- Historical analysis comparison

## License

MIT License

## Contributors

Academic Major Project
