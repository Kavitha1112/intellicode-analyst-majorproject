import { Zap, ArrowRight } from 'lucide-react';

function OptimizationReport({ optimizations }) {
  if (!optimizations || optimizations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Zap className="w-6 h-6 text-yellow-600" />
        Optimization Suggestions
      </h2>

      <p className="text-gray-600 mb-4">
        Recommendations to improve code performance and quality:
      </p>

      <div className="space-y-4">
        {optimizations.map((opt, index) => (
          <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{opt.title}</h3>
                <p className="text-sm text-gray-700 mb-3">{opt.description}</p>

                {opt.current && opt.improved && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="p-3 bg-red-50 rounded border border-red-200">
                      <p className="text-xs font-semibold text-red-700 mb-2">Current Approach:</p>
                      <pre className="text-xs text-gray-800 overflow-x-auto">{opt.current}</pre>
                    </div>
                    <div className="p-3 bg-green-100 rounded border border-green-300">
                      <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" />
                        Optimized Approach:
                      </p>
                      <pre className="text-xs text-gray-800 overflow-x-auto">{opt.improved}</pre>
                    </div>
                  </div>
                )}

                {opt.benefit && (
                  <div className="mt-3 p-2 bg-white rounded border border-gray-200">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Benefit:</span> {opt.benefit}
                    </p>
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

export default OptimizationReport;
