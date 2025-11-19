import React, { useState } from 'react';
import { ClassRoom, Signature } from '../types';
import { Send, AlertCircle, EyeOff, Eye } from 'lucide-react';

interface SignFormProps {
  onSign: (signature: Omit<Signature, 'id' | 'timestamp'>) => void;
}

const SignForm: React.FC<SignFormProps> = ({ onSign }) => {
  const [name, setName] = useState('');
  // Default to the only class available
  const [classRoom] = useState<ClassRoom>(ClassRoom.CLASS_9U);
  const [reason, setReason] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reason.trim()) {
      setError('Preencha seu nome e o motivo para validar o voto.');
      return;
    }

    onSign({
      name: name.trim(),
      classRoom: classRoom,
      reason: reason.trim(),
      isAnonymous
    });

    // Reset form
    setName('');
    setReason('');
    setIsAnonymous(false);
    setError('');
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4">Registre seu Voto</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded text-red-200 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Nome Completo (Obrigatório)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-slate-600"
            placeholder="Seu nome real para validação"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Sua Turma</label>
          <div className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-400 font-medium cursor-not-allowed">
            {classRoom}
          </div>
          <p className="text-xs text-slate-500 mt-1">Petição exclusiva para o 9º Ano Único.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Por que o 8º ano não deve ir?</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-slate-600"
            placeholder="Explique seu motivo (ex: queremos nossa privacidade, a viagem é nossa conquista, etc.)"
          />
        </div>

        <div className="flex items-center gap-3 py-2 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 cursor-pointer" onClick={() => setIsAnonymous(!isAnonymous)}>
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isAnonymous ? 'bg-blue-500 border-blue-500' : 'border-slate-500'}`}>
                {isAnonymous && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <div className="flex-1">
                <span className="text-sm text-slate-300 block font-medium">Modo Privacidade</span>
                <span className="text-xs text-slate-500 block">Seu nome ficará oculto na lista pública, mas será contado.</span>
            </div>
            {isAnonymous ? <EyeOff size={18} className="text-slate-400"/> : <Eye size={18} className="text-slate-600"/>}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Send size={18} />
          Assinar Petição
        </button>
      </form>
    </div>
  );
};

export default SignForm;