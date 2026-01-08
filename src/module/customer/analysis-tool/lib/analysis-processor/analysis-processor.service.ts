import { Inject, Injectable } from '@nestjs/common';
import z from 'zod';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';

@Injectable()
export class AnalysisProcessorService implements AnalysisProcessorGateway {
  protected readonly _type = AnalysisProcessorService.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(CnisProcessorGateway)
    private readonly cnisParserGateway: CnisProcessorGateway,
  ) {}

  public async parseCnisDocument(cnisDocument: Buffer): Promise<CnisModel> {
    return await this.cnisParserGateway.parseCnisDocument(cnisDocument);
  }

  public async validateCnisDocument(cnisDocument: Buffer): Promise<boolean> {
    return await this.cnisParserGateway.validateCnisDocument(cnisDocument);
  }

  public async getCnisCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON;
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS, não realize calculos como valores saláriais, use estritamente os fornecidos.
- Não incluir tag <br> na resposta.
Para a Seção 6 (CÁLCULOS), siga rigorosamente as instruções abaixo:
1. Para cálculos ja efetuados, não calcule novamente, use os valores fornecidos na análise do CNIS.
2. Garanta precisão absoluta nos cálculos numéricos e de datas que precisar fazer.
3. Formate todos os valores monetários no padrão brasileiro: prefixo "R$ ", milhar com ponto e decimal com vírgula (ex.: R$ 1.234,56).

Análise processada do CNIS:
  ${cnisAnalysisJson}
`;
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
      }),
    );
  }

  public async getCnisSimplifiedAnalysis(
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

  public async getLegalPleadingQuickDocumentAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateFlashLiteResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getLegalPleadingCompleteAnalysis(
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

  public async getLegalPleadingSimplifiedAnalysis(
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

  public async getRetirementPlanningRppsCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
        responseJsonSchema: z.object({
          totalContributionTime: z
            .string()
            .describe('Tempo total de contribuição de serviço'),

          publicServiceContributionTime: z
            .string()
            .describe('Tempo total de contribuição em serviço público'),

          positionTenureTime: z.string().describe('Tempo total no cargo'),

          insuredAge: z.string().describe('Idade atual do segurado'),

          insuredProfession: z.string().describe('Profissão do segurado'),

          totalCareerTime: z.string().describe('Tempo total de carreira'),

          publicServiceStartDate: z
            .date()
            .describe('Data de ingresso no serviço público'),

          retirementOptions: z
            .array(
              z.object({
                retirementRuleName: z
                  .string()
                  .describe('Nome da regra de aposentadoria'),

                expectedMonthlyBenefit: z
                  .number()
                  .describe('Renda mensal inicial esperada'),

                isBestMonthlyBenefit: z
                  .boolean()
                  .describe(
                    'Indica se a regra oferece a melhor renda mensal inicial',
                  ),

                hasHighestAdvantageValue: z
                  .boolean()
                  .describe(
                    'Indica se a regra oferece o maior valor no cenário mais vantajoso',
                  ),

                retirementAnalysis: z
                  .string()
                  .describe(
                    'Análise detalhada da aposentadoria em formato markdown',
                  ),

                isEligible: z
                  .boolean()
                  .describe('Indica se o segurado é elegível para a regra'),

                eligibilityAvailableAt: z
                  .string()
                  .describe(
                    'Data em que o segurado se tornará elegível para a regra, se aplicável',
                  )
                  .nullable(),
              }),
            )
            .describe('Regras de aposentadoria'),
        }),
      }),
    );
  }
}
