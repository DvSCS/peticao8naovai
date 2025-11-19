import React, { useState, useEffect } from 'react';
import { Signature } from './types';
import Stats from './components/Stats';
import SignForm from './components/SignForm';
import { AlertTriangle, Users, ShieldBan, Lock, Scale, Share2, MapPin, School, History } from 'lucide-react';

const App: React.FC = () => {
  // Load from localStorage initially
  // CHANGED KEY TO RESET VOTES: 'signatures_porto_mangue_final'
  const [signatures, setSignatures] = useState<Signature[]>(() => {
    try {
      const saved = localStorage.getItem('signatures_porto_mangue_final');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save to localStorage whenever signatures change
  useEffect(() => {
    localStorage.setItem('signatures_porto_mangue_final', JSON.stringify(signatures));
  }, [signatures]);

  const handleSign = (newSig: Omit<Signature, 'id' | 'timestamp'>) => {
    const signature: Signature = {
      ...newSig,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    setSignatures((prev) => [signature, ...prev]);
  };

  const handleShare = () => {
    const text = `URGENTE: O 8º Ano NÃO deve ir na viagem do 9º Ano Único da Escola Francisca Serafim! Assine a petição agora!`;
    const url = window.location.href; 
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      {/* Hero Section */}
      <header className="bg-red-950 border-b border-red-900/50 pt-8 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            {/* Logo Prefeitura */}
            <img 
              src="https://a2fdb8c2bc2bc48d1bf61455680efcdc.cdn.bubble.io/cdn-cgi/image/w=96,h=96,f=auto,dpr=1,fit=contain/f1721125876279x733622820670483600/image00002.png" 
              alt="Brasão Porto do Mangue" 
              className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
            />
            
            <div className="flex flex-col items-center md:items-start gap-2 text-slate-300 text-sm font-medium">
              <span className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md">
                <MapPin size={14} className="text-red-400" /> Prefeitura de Porto do Mangue
              </span>
              <span className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md">
                <School size={14} className="text-red-400" /> Escola Francisca Serafim de Souza
              </span>
            </div>
          </div>

          <div className="inline-flex items-center justify-center p-3 bg-red-600/20 rounded-full mb-6 border border-red-500/30 backdrop-blur-sm animate-pulse">
            <AlertTriangle className="text-red-500 mr-2" size={24} />
            <span className="text-red-200 font-bold tracking-wide uppercase text-sm">PETIÇÃO PÚBLICA • 9º ANO ÚNICO</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            O 8º ANO <span className="text-red-600 decoration-red-600 underline decoration-4 underline-offset-4">NÃO VAI</span><br />
            NA NOSSA VIAGEM
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Esta é uma reivindicação oficial da turma. A inclusão de outra sala na nossa viagem escolar
            foi feita sem o nosso consentimento. Exigimos exclusividade.
          </p>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/2 left-10 opacity-5 rotate-12 pointer-events-none">
          <ShieldBan size={150} className="text-red-500" />
        </div>
        <div className="absolute top-1/3 right-10 opacity-5 -rotate-12 pointer-events-none">
          <Users size={150} className="text-red-500" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: History, Stats & Legal Context */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* HISTORY SECTION */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-red-600/20 transition-all"></div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                <History className="text-red-500" />
                A Verdadeira História
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed text-lg relative z-10">
                <p>
                  <strong className="text-white text-xl">TUDO COMBINADO!</strong> Correto, tudo CERTO, até que ecoa um boato de que 5 alunos selecionados do 8º ano irão para essa viagem.
                </p>
                <div className="bg-slate-950/60 p-4 border-l-4 border-red-600 rounded-r-lg">
                  <p className="italic mb-2">Agora a pergunta é: <strong>VÃO FAZER O QUE?</strong></p>
                  <p>
                    Eles não estão no mesmo conteúdo. O professor responsável irá passar uma atividade <strong className="text-red-400">APENAS PARA 5 ALUNOS?</strong>
                  </p>
                </div>
                <p>
                  <strong className="text-red-500 text-2xl font-black">NÃO!</strong>
                </p>
                <p>
                  Então eles iriam apenas <strong className="text-white bg-red-900/30 px-1">PASSEAR EM NATAL</strong>. Garanto que se fosse uma situação reversa, onde o 9º ano quisesse ir na viagem deles, isso <strong className="text-white underline decoration-red-500">SERIA NEGADO!</strong>
                </p>
              </div>
            </div>

            <Stats signatures={signatures} />
            
            {/* Legal Context Box */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Scale className="text-yellow-500" size={20} />
                Fundamentação Legal
              </h3>
              <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 text-slate-400 text-sm leading-relaxed text-justify">
                <p className="mb-2">
                  Este documento exerce o direito garantido pela <strong>Constituição Federal de 1988</strong>:
                </p>
                <p className="italic border-l-2 border-slate-700 pl-4 my-3 text-slate-300">
                  "Art. 5º, XXXIV, 'a': são a todos assegurados, independentemente do pagamento de taxas, o direito de petição aos Poderes Públicos em defesa de direitos ou contra ilegalidade ou abuso de poder."
                </p>
                <p>
                  Requeremos à direção da <strong>Escola Francisca Serafim de Souza</strong> a revisão imediata da decisão de incluir turmas do 8º ano na viagem do 9º ano.
                </p>
              </div>
            </div>

            {/* Signatures List */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">
                  Votos Confirmados <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{signatures.length}</span>
                </h3>
              </div>
              
              {signatures.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-lg bg-slate-900/50">
                  <Users size={48} className="mx-auto text-slate-700 mb-3" />
                  <p className="text-slate-500 font-medium">A lista está vazia.</p>
                  <p className="text-slate-400 text-sm mt-1">Seja o primeiro a assinar e mostre a força da nossa turma!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {signatures.map((sig) => (
                    <div key={sig.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-red-900/30 transition-colors shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        {sig.isAnonymous ? (
                           <span className="font-bold text-slate-400 flex items-center gap-2 text-sm md:text-base">
                             <Lock size={14} /> Aluno(a) Anônimo(a)
                           </span>
                        ) : (
                           <span className="font-bold text-white text-sm md:text-base uppercase tracking-wide">{sig.name}</span>
                        )}
                        <span className="text-xs font-bold bg-slate-950 text-slate-400 border border-slate-700 px-2 py-1 rounded">
                          {sig.classRoom}
                        </span>
                      </div>
                      <div className="text-slate-300 text-sm leading-relaxed pl-3 border-l-2 border-red-600/50">
                        "{sig.reason}"
                      </div>
                      <div className="mt-2 text-right">
                         <span className="text-[10px] text-slate-600">Registrado em: {new Date(sig.timestamp).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sign Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 space-y-6">
              <SignForm onSign={handleSign} />
              
              {/* Sharing Box */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg">
                <div className="flex items-center gap-2 mb-4 text-slate-200 font-bold">
                  <Share2 size={20} />
                  <h3>Mobilize a Turma</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Quanto mais assinaturas, maior a pressão na direção da escola. Compartilhe agora no grupo da sala!
                </p>
                <button 
                  onClick={handleShare}
                  className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 px-4 rounded-lg transition-colors font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-green-900/20"
                >
                  Compartilhar no WhatsApp
                </button>
              </div>

              <div className="bg-red-950/30 p-4 rounded-lg border border-red-900/30 text-center">
                <p className="text-red-400 text-xs font-medium uppercase tracking-wider">
                  Sistema Seguro &bull; Voto Único &bull; 9º U
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="mt-20 border-t border-slate-900 bg-slate-950 py-8 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Movimento Estudantil do 9º Ano • Escola Francisca Serafim de Souza • Porto do Mangue
          </p>
          <p className="text-slate-700 text-xs mt-2">
            Este site é uma ferramenta de organização civil e democrática dos estudantes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;