import { PDFParse } from "pdf-parse";

export async function extrairTextoPDF(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({
    data: new Uint8Array(buffer),
  });

  try {
    const resultado = await parser.getText();
    return resultado.text.trim();
  } finally {
    await parser.destroy();
  }
}