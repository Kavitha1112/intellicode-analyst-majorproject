import { useState } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import AnalysisPanel from './components/AnalysisPanel';
import BugReport from './components/BugReport';
import ComplexityReport from './components/ComplexityReport';
import EdgeCasesReport from './components/EdgeCasesReport';
import OptimizationReport from './components/OptimizationReport';
import ConceptMap from './components/ConceptMap';

const DEFAULT_CODE = `# Sample Python Code
my_array = [10, 20, 30, 40, 50]
total_sum = 0

for element in my_array:
    total_sum += element

print(f"The sum is: {total_sum}")
# Output: The sum is: 150
`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState('python');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [decorations, setDecorations] = useState([]);

  const handleCodeChange = (value) => {
    setCode(value || '');
  };

  const handleFileUpload = (content, fileName) => {
    setCode(content);
    const ext = fileName.split('.').pop();
    const langMap = {
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'auto': 'Auto Detect',
    };
    if (langMap[ext]) {
      setLanguage(langMap[ext]);
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert('Please enter some code to analyze');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setDecorations([]);

    try {
      const response = await fetch('https://kane-objectionable-unbewilderedly.ngrok-free.dev/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);

      if (result.has_bugs && result.bug_report) {
        const decs = result.bug_report.map(bug => ({
          line: bug.line,
          severity: bug.severity,
          message: bug.message
        }));
        setDecorations(decs);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze code. Please ensure the backend is running.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="container mx-auto px-6 py-6 flex-1">
        <AnalysisPanel
          onAnalyze={handleAnalyze}
          onFileUpload={handleFileUpload}
          isAnalyzing={isAnalyzing}
          language={language}
          onLanguageChange={setLanguage}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="h-[600px]">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              language={language}
              decorations={decorations}
            />
          </div>

          <div className="h-[600px] overflow-y-auto bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Analysis Results</h2>
            {!analysisResult && (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>Run analysis to see results here</p>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-6">
                {analysisResult.has_bugs ? (
                  <BugReport bugs={analysisResult.bug_report} />
                ) : (
                  <>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-semibold">
                        No critical bugs detected! Proceeding with advanced analysis...
                      </p>
                    </div>
                    <ComplexityReport complexity={analysisResult.complexity_analysis} />
                    <EdgeCasesReport edgeCases={analysisResult.edge_cases} />
                    <OptimizationReport optimizations={analysisResult.optimizations} />
                    <ConceptMap concepts={analysisResult.concepts} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-slate-800 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">IntelliCode Analyst - Static Code Analysis System</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
