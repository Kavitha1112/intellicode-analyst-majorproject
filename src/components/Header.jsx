import { Code2, Github } from 'lucide-react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">IntelliCode Analyst</h1>
              <p className="text-sm text-gray-300">Intelligent Static Code Analysis System</p>
            </div>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
