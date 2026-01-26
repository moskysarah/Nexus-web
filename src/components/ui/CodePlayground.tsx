import { useState } from 'react';

const CodePlayground = () => {
  const [html, setHtml] = useState('<h1>Bonjour Nexus !</h1>\n<p>Modifie ce code pour voir le résultat.</p>');

  // On génère le document pour l'iframe
  const srcDoc = `
    <html>
      <style>
        body { font-family: sans-serif; color: white; padding: 20px; }
        h1 { color: #6366f1; }
        p { color: #9ca3af; line-height: 1.6; }
      </style>
      <body>${html}</body>
    </html>
  `;

  return (
    <div className="bg-[#121214] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Barre de titre de l'éditeur */}
      <div className="bg-[#1a1a1c] px-6 py-3 border-b border-gray-800 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">HTML Live Preview</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 h-[400px]">
        {/* ÉDITEUR (Gauche) */}
        <textarea
          className="w-full h-full bg-[#0a0a0c] p-6 text-indigo-300 font-mono text-sm outline-none resize-none border-r border-gray-800"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          spellCheck="false"
        />

        {/* RENDU (Droite) */}
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          className="w-full h-full bg-[#121214]"
        />
      </div>
    </div>
  );
};

export default CodePlayground;