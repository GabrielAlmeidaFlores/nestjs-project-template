// import fs from 'fs';
// import path from 'path';

import { GenerateContentParameters, GoogleGenAI, Part } from '@google/genai';
import { Injectable } from '@nestjs/common';
import * as fileType from 'file-type';
import jsPDF from 'jspdf';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { GenerativeIaApplicationVariable } from '@shared/system/constant/application-variable/source/generative-ia.application-variable';

@Injectable()
export class GeminiService implements GenerativeIaGateway {
  protected readonly _type = GeminiService.name;

  private readonly googleGenerativeAI: GoogleGenAI;

  public constructor() {
    this.googleGenerativeAI = new GoogleGenAI({
      apiKey: GenerativeIaApplicationVariable.GENERATIVE_IA_GEMINI_API_KEY,
    });
  }
  public async generateFlashResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-2.5-flash',
    );
  }

  public async generateHighQualityResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-2.5-pro',
    );
  }

  private async generateResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
    model: string,
  ): Promise<string | null> {
    const promptPart: Part[] = [];

    if (props.prompt !== undefined) {
      promptPart.push({ text: props.prompt });
    }

    if (props.promptFiles !== undefined) {
      const promptFileParts = await this.buildPartWithFileContent(
        props.promptFiles,
      );
      promptPart.push(...promptFileParts);
    }

    const contentConfig: GenerateContentParameters = {
      model,
      contents: {
        role: 'user',
      },
      config: {
        temperature: 0.3,
        maxOutputTokens: 500_000,
      },
    };

    if (promptPart.length > 0) {
      (contentConfig.contents as { parts: Part[] }).parts = promptPart;
    }

    const result =
      await this.googleGenerativeAI.models.generateContent(contentConfig);

    return result.text ?? null;
  }

  private async buildPartWithFileContent(
    contentList: Buffer[],
  ): Promise<Part[]> {
    const partList: Part[] = [];

    for (let content of contentList) {
      let fileData = await fileType.fileTypeFromBuffer(content);

      if (fileData === undefined) {
        const textContext = content.toString('utf-8');
        content = this.generatePdfFromText(textContext);
        fileData = await fileType.fileTypeFromBuffer(content);
      }

      if (fileData === undefined) {
        continue;
      }

      partList.push({
        inlineData: {
          mimeType: fileData.mime,
          data: content.toString('base64'),
        },
      });
    }

    return partList;
  }

  private generatePdfFromText(text: string): Buffer {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 7;
    let y = margin;

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - margin * 2;
    const textLines = doc.splitTextToSize(text, maxWidth) as string[];

    for (const line of textLines) {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }

    const pdfArrayBuffer = doc.output('arraybuffer');
    const pdfBuffer = Buffer.from(pdfArrayBuffer);

    // const tmpDir = path.join(process.cwd(), '.bin');
    // if (!fs.existsSync(tmpDir)) {
    //   fs.mkdirSync(tmpDir, { recursive: true });
    // }

    // const fileName = `generated-doc-${Date.now()}.pdf`;
    // const filePath = path.join(tmpDir, fileName);
    // fs.writeFileSync(filePath, pdfBuffer);

    // console.warn(`PDF document saved to: ${filePath}`);

    return pdfBuffer;
  }
}
