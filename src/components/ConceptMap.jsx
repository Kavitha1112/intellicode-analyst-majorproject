import { BookOpen, CheckCircle } from 'lucide-react';

function ConceptMap({ concepts }) {
  if (!concepts || concepts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-indigo-600" />
        Concept Mapping
      </h2>

      <p className="text-gray-600 mb-4">
        Programming concepts identified in your code:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {concepts.map((concept, index) => (
          <div key={index} className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{concept.name}</h3>
                <p className="text-sm text-gray-700 mb-2">{concept.description}</p>
                {concept.location && (
                  <p className="text-xs text-gray-500 font-mono">
                    Found at: {concept.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConceptMap;
