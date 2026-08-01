import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export const extractTextFromFile = async (filePath: string, mimeType: string) => {
  const normalizedType = mimeType.toLowerCase();

  if (normalizedType.includes('pdf')) {
    const fileBuffer = await fs.promises.readFile(filePath);
    const data = await pdfParse(fileBuffer);
    return data.text.trim();
  }

  if (
    normalizedType.includes('word') ||
    normalizedType.includes('officedocument') ||
    normalizedType.includes('docx') ||
    filePath.toLowerCase().endsWith('.docx')
  ) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value.trim();
  }

  return '';
};
