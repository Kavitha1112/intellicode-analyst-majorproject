import { Shield, AlertTriangle } from 'lucide-react';

function EdgeCasesReport({ edgeCases }) {
  if (!edgeCases || edgeCases.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Shield className="w-6 h-6 text-orange-600" />
        Edge Case Analysis
      </h2>

      <p className="text-gray-600 mb-4">
        Identified potential edge cases that may cause unexpected behavior:
      </p>

      <div className="space-y-3">
        {edgeCases.map((edgeCase, index) => (
          <div key={index} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{edgeCase.case}</h3>
                <p className="text-sm text-gray-700 mb-2">{edgeCase.description}</p>
                {edgeCase.example && (
                  <div className="mt-2 p-2 bg-white rounded border border-orange-200">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Example:</p>
                    <code className="text-xs text-gray-800 font-mono">{edgeCase.example}</code>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EdgeCasesReport;
