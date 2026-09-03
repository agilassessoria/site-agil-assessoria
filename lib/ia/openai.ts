import OpenAI from "openai";

let client: OpenAI | null = null;

export function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY não configurada.");
  }

  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return client;
}

// Compatibilidade com os arquivos que ainda utilizam:
// import { openai } from "@/lib/ia/openai";
//
// O cliente só será criado quando alguma chamada da OpenAI
// realmente for executada.
export const openai = new Proxy({} as OpenAI, {
  get(_target, propriedade) {
    return (getOpenAI() as any)[propriedade];
  },
});