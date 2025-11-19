import { Signature } from '../types';

// --- CONFIGURAÇÃO DA REST API (MÉTODO DIRETO) ---
const PROJECT_ID = "porretapizza-d442f";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/signatures`;

// Auxiliar para converter formato do Firestore para JSON normal
// O Firestore retorna: { fields: { name: { stringValue: "João" }, ... } }
const mapDocToSignature = (doc: any): Signature => {
  const fields = doc.fields;
  return {
    id: doc.name.split('/').pop(), // Pega o ID do final do caminho
    name: fields.name?.stringValue || '',
    classRoom: fields.classRoom?.stringValue || '',
    reason: fields.reason?.stringValue || '',
    timestamp: parseInt(fields.timestamp?.integerValue || '0'),
    isAnonymous: fields.isAnonymous?.booleanValue || false
  };
};

// Auxiliar para converter JSON normal para formato de escrita do Firestore
const mapSignatureToDocument = (sig: Omit<Signature, 'id'>) => {
  return {
    fields: {
      name: { stringValue: sig.name },
      classRoom: { stringValue: sig.classRoom },
      reason: { stringValue: sig.reason },
      timestamp: { integerValue: sig.timestamp.toString() },
      isAnonymous: { booleanValue: sig.isAnonymous }
    }
  };
};

// --- FUNÇÕES PÚBLICAS ---

export const isOnline = () => navigator.onLine;

// Sistema de "Polling" (Verifica novidades a cada X segundos)
let intervalId: any = null;

export const subscribeToSignatures = (callback: (signatures: Signature[]) => void) => {
  const fetchSignatures = async () => {
    try {
      // Faz a requisição direta para o Google Cloud
      const response = await fetch(BASE_URL + '?orderBy=timestamp desc&pageSize=100');
      
      if (!response.ok) {
        // Se der 403, é problema de permissão (Regras do Firebase)
        if (response.status === 403) {
          console.error("ERRO DE PERMISSÃO: Vá no Firebase Console > Firestore Database > Regras e altere para 'allow read, write: if true;'");
        }
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // Se não tiver documentos (coleção vazia), retorna array vazio
      if (!data.documents) {
        callback([]);
        return;
      }

      // Mapeia os dados brutos para nosso formato limpo
      const signatures = data.documents.map(mapDocToSignature);
      callback(signatures);

    } catch (error) {
      console.error("Erro ao buscar assinaturas:", error);
      // Se falhar (ex: sem internet), tenta ler do cache local
      const local = localStorage.getItem('signatures_backup');
      if (local) callback(JSON.parse(local));
    }
  };

  // Executa a primeira vez imediatamente
  fetchSignatures();

  // Configura a atualização automática a cada 3 segundos
  intervalId = setInterval(fetchSignatures, 3000);

  // Retorna função para parar a atualização
  return () => {
    if (intervalId) clearInterval(intervalId);
  };
};

export const addSignature = async (signature: Omit<Signature, 'id' | 'timestamp'>) => {
  const newSig = {
    ...signature,
    timestamp: Date.now()
  };

  try {
    // 1. Tenta salvar na Nuvem (Google Firestore)
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mapSignatureToDocument(newSig))
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro detalhado do Firestore:", errorData);
      throw new Error(errorData.error?.message || "Falha ao salvar");
    }

    // 2. Se deu certo, salvamos um backup local também (para experiência rápida)
    const saved = localStorage.getItem('signatures_backup');
    const current = saved ? JSON.parse(saved) : [];
    // Criamos um ID temporário local só para exibição imediata se necessário
    const tempId = Math.random().toString(36).substring(7); 
    localStorage.setItem('signatures_backup', JSON.stringify([{...newSig, id: tempId}, ...current]));

    return true;

  } catch (error) {
    console.error("Erro ao enviar voto:", error);
    alert("Erro ao conectar com o servidor. Verifique se o Banco de Dados Firestore foi criado em 'Modo de Teste' no Console do Firebase.");
    throw error;
  }
};