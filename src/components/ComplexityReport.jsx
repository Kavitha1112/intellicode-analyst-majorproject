import { Activity, Clock, Database } from 'lucide-react';

function ComplexityReport({ complexity }) {
  if (!complexity) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Activity className="w-6 h-6 text-green-600" />
        Complexity Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Time Complexity</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">{complexity.time}</p>
          <p className="text-sm text-gray-600">{complexity.timeExplanation}</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Space Complexity</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600 mb-2">{complexity.space}</p>
          <p className="text-sm text-gray-600">{complexity.spaceExplanation}</p>
        </div>
      </div>

      {complexity.details && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">{complexity.details}</p>
        </div>
      )}
    </div>
  );
}

export default ComplexityReport;
