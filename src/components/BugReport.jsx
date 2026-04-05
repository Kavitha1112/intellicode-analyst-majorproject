import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

function BugReport({ bugs }) {
  if (!bugs || bugs.length === 0) {
    return null;
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <AlertCircle className="w-6 h-6 text-red-600" />
        Bug Detection Report
      </h2>

      <div className="space-y-4">
        {bugs.map((bug, index) => (
          <div
            key={index}
            className={`p-4 border-l-4 rounded-r-lg ${
              bug.severity === 'critical' ? 'border-red-500 bg-red-50' :
              bug.severity === 'warning' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}
          >
            <div className="flex items-start gap-3">
              {getSeverityIcon(bug.severity)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded border ${getSeverityBadge(bug.severity)}`}>
                    {bug.severity.toUpperCase()}
                  </span>
                  <span className="text-sm font-mono text-gray-600">Line {bug.line}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{bug.type}</h3>
                <p className="text-gray-700 mb-3">{bug.message}</p>
                {bug.suggestion && (
                  <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Suggested Fix:</p>
                    <p className="text-sm text-gray-600">{bug.suggestion}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Analysis stopped:</span> {bugs.length} {bugs.length === 1 ? 'bug' : 'bugs'} detected.
          Please fix the above issues before proceeding with advanced analysis.
        </p>
      </div>
    </div>
  );
}

export default BugReport;
