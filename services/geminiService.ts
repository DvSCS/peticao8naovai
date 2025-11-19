import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeReasons = async (reasons: string[]): Promise<string> => {
  if (reasons.length === 0) return "Nenhuma razão enviada ainda.";

  const prompt = `
    Você é um representante estudantil do 9º ANO analisando um baixo-assinado com o tema "O 8º ANO NÃO DEVE IR NA NOSSA VIAGEM".
    O contexto é: É a viagem de formatura do 9º ano, e o professor decidiu incluir a turma do 8º ano sem o consentimento dos formandos.
    
    Abaixo estão as razões enviadas pelos alunos do 9º ano. 
    
    Por favor, crie um manifesto resumido, sério e persuasivo (em markdown) para ser entregue à direção e ao professor.
    Argumente que a viagem é um momento de encerramento de ciclo exclusivo do 9º ano.
    Destaque os pontos em comum. Use tom formal, firme, mas respeitoso.

    Razões enviadas:
    ${reasons.join("\n- ")}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise.";
  } catch (error) {
    console.error("Erro ao conectar com Gemini:", error);
    return "Erro ao processar a análise de IA. Verifique a chave de API ou tente novamente mais tarde.";
  }
};