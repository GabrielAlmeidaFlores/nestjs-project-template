import { Inject, Injectable } from '@nestjs/common';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { DocumentGeneratorProcessorGateway } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.gateway';

@Injectable()
export class DocumentGeneratorProcessorService
  implements DocumentGeneratorProcessorGateway
{
  protected readonly _type = DocumentGeneratorProcessorService.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
  ) {}

  public async getInitialPetitionGeneratorCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getInitialPetitionGeneratorSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getAdministrativeRequestGeneratorCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getAdministrativeRequestGeneratorSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getFullOpinionGeneratorCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getFullOpinionGeneratorSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }
}
