import React, { useState } from 'react';
import { Bot, FileText, RefreshCw } from 'lucide-react';
import { analyzeReasons } from '../services/geminiService';
import ReactMarkdown from 'react-markdown'; // Note: In a real env without packages, we'd render simply. Since Recharts is allowed, I'll assume basic rendering or just text. I will stick to simple text rendering with whitespace handling to avoid dependency issues if not pre-installed, but better to assume standard text.
// Actually, I'll implement a simple whitespace pre-wrapper.

interface ManifestoProps {
  reasons: string[];
}

const Manifesto: React.FC<ManifestoProps> = ({ reasons }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await analyzeReasons(reasons);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-700 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Bot className="text-blue-400" /> 
          Análise da IA (Gemini)
        </h3>
        <button
          onClick={handleGenerate}
          disabled={loading || reasons.length === 0}
          className="text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          {loading ? <RefreshCw className="animate-spin" size={16} /> : <FileText size={16} />}
          {analysis ? 'Atualizar Manifesto' : 'Gerar Manifesto Oficial'}
        </button>
      </div>

      {reasons.length === 0 ? (
        <p className="text-slate-500 text-center italic py-4">
          Precisamos de assinaturas para gerar o manifesto.
        </p>
      ) : (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 min-h-[120px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
              <RefreshCw className="animate-spin text-blue-500" size={24} />
              <p>Analisando argumentos...</p>
            </div>
          ) : analysis ? (
            <div className="prose prose-invert max-w-none text-slate-200 whitespace-pre-wrap">
              {analysis}
            </div>
          ) : (
            <p className="text-slate-400 text-center">
              Clique no botão acima para usar a IA e transformar os comentários individuais em um documento formal para a diretoria.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Manifesto;