import { useState } from 'react';
import { Play, Upload, Loader2 } from 'lucide-react';

function AnalysisPanel({ onAnalyze, onFileUpload, isAnalyzing, language, onLanguageChange }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        onFileUpload(event.target.result, file.name);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Programming Language
          </label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="auto">Auto Detect</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload File (Optional)
          </label>
          <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
            <Upload className="w-4 h-4 mr-2 text-gray-600" />
            <span className="text-sm text-gray-600">
              {fileName || 'Choose file...'}
            </span>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".py,.js,.java,.cpp,.c,.txt"
              className="hidden"
            />
          </label>
        </div>

        <div className="flex-shrink-0">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Action
          </label>
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold shadow-md"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Analyze Code
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPanel;
