import { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor({ code, onChange, language, decorations }) {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  useEffect(() => {
    if (editorRef.current && decorations && decorations.length > 0) {
      const decorationsCollection = decorations.map(dec => ({
        range: new window.monaco.Range(dec.line, 1, dec.line, 1),
        options: {
          isWholeLine: true,
          className: dec.severity === 'critical' ? 'bg-red-100' :
                     dec.severity === 'warning' ? 'bg-yellow-100' : 'bg-blue-100',
          glyphMarginClassName: dec.severity === 'critical' ? 'text-red-600' :
                               dec.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600',
          hoverMessage: { value: `**${dec.severity.toUpperCase()}**: ${dec.message}` }
        }
      }));

      editorRef.current.deltaDecorations([], decorationsCollection);
    }
  }, [decorations]);

  return (
    <div className="h-full w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-light"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          rulers: [],
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: 'on',
        }}
      />
    </div>
  );
}

export default CodeEditor;
