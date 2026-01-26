import { Inject, Injectable } from '@nestjs/common';

import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
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
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: {
            type: 'object',
            properties: {
              totalContributionTime: {
                type: 'string',
                description:
                  'Tempo total de contribuição de serviço. Exemplo: 44 anos, 3 meses e 12 dias',
              },
              publicServiceContributionTime: {
                type: 'string',
                description:
                  'Tempo total de contribuição em serviço público. Exemplo: 30 anos, 2 meses e 5 dias',
              },
              positionTenureTime: {
                type: 'string',
                description:
                  'Tempo total no cargo. Exemplo: 10 anos, 6 meses e 15 dias',
              },
              insuredAge: {
                type: 'string',
                description:
                  'Idade atual do segurado. Exemplo: 44 anos, 3 meses e 12 dias',
              },
              insuredProfession: {
                type: 'string',
                description: 'Profissão do segurado',
              },
              totalCareerTime: {
                type: 'string',
                description:
                  'Tempo total de carreira. Exemplo: 50 anos, 1 mês e 20 dias',
              },
              publicServiceStartDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de ingresso no serviço público',
              },
              retirementOptions: {
                type: 'array',
                description: 'Regras de aposentadoria',
                items: {
                  type: 'object',
                  properties: {
                    retirementRuleName: {
                      type: 'string',
                      description: 'Nome da regra de aposentadoria',
                    },
                    expectedMonthlyBenefit: {
                      type: 'number',
                      description: 'Renda mensal inicial esperada',
                    },
                    isBestMonthlyBenefit: {
                      type: 'boolean',
                      description:
                        'Indica se a regra oferece a melhor renda mensal inicial',
                    },
                    hasHighestAdvantageValue: {
                      type: 'boolean',
                      description:
                        'Indica se a regra oferece o maior valor no cenário mais vantajoso',
                    },
                    retirementAnalysis: {
                      type: 'string',
                      description:
                        'Análise detalhada da aposentadoria em formato markdown',
                    },
                    isEligible: {
                      type: 'boolean',
                      description:
                        'Indica se o segurado é elegível para a regra',
                    },
                    eligibilityAvailableAt: {
                      type: 'string',
                      description:
                        'Data em que o segurado se tornará elegível para a regra, se aplicável',
                    },
                  },
                  required: [
                    'retirementRuleName',
                    'expectedMonthlyBenefit',
                    'isBestMonthlyBenefit',
                    'hasHighestAdvantageValue',
                    'retirementAnalysis',
                    'isEligible',
                  ],
                },
              },
            },
            required: [
              'totalContributionTime',
              'publicServiceContributionTime',
              'positionTenureTime',
              'insuredAge',
              'insuredProfession',
              'totalCareerTime',
              'publicServiceStartDate',
              'retirementOptions',
            ],
          },
        }),
      }),
    );
  }

  public async getSpecialActivityCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: {
            type: 'object',
            properties: {
              period: {
                type: 'object',
                description: 'Período de atividade especial',
                properties: {

                  label: {
                    type: 'string',
                    description: 'Rótulo descritivo do período',
                  },
                  start: {
                    type: 'string',
                    description: 'Data de início no formato YYYY-MM-DD',
                  },
                  end: {
                    type: 'string',
                    description: 'Data de término no formato YYYY-MM-DD',
                  },
                  recognized: {
                    type: 'boolean',
                    description:
                      'Indica se o período foi reconhecido como atividade especial',
                  },
                  companyName: {
                    type: 'string',
                    description: 'Nome da empresa/empregador',
                  },
                  companyCNPJ: {
                    type: 'string',
                    description: 'CNPJ da empresa',
                  },
                  role: {
                    type: 'string',
                    description: 'Cargo/função exercida',
                  },
                  employmentLinkStartDate: {
                    type: 'string',
                    description: 'Data de início do vínculo',
                  },
                  employmentLinkEndDate: {
                    type: 'string',
                    description: 'Data de término do vínculo',
                  },
                  employmentLinkSupportingDocument: {
                    type: 'string',
                    description: 'Documento comprobatório do vínculo',
                  },
                  employmentLinkPresentInCNIS: {
                    type: 'boolean',
                    description: 'Indica se o vínculo consta no CNIS',
                  },
                  employmentLinkEarningsInCNIS: {
                    type: 'boolean',
                    description:
                      'Indica se há remunerações registradas no CNIS',
                  },
                  harmfulAgentsHasAny: {
                    type: 'boolean',
                    description: 'Indica se há agentes nocivos identificados',
                  },
                  harmfulAgentsExposureFrequency: {
                    type: 'array',
                    description:
                      'Frequência e intensidade de exposição aos agentes',
                    items: {
                      type: 'object',
                      properties: {
                        agent: {
                          type: 'string',
                          description: 'Nome do agente nocivo',
                        },
                        intensity: {
                          type: 'string',
                          description: 'Intensidade da exposição',
                        },
                        characteristic: {
                          type: 'string',
                          description: 'Característica do agente',
                        },
                      },
                    },
                  },
                  harmfulAgentsInformationSource: {
                    type: 'array',
                    description: 'Fontes de informação sobre os agentes',
                    items: {
                      type: 'string',
                    },
                  },
                  harmfulAgentsIdentifiedAgents: {
                    type: 'array',
                    description: 'Lista de agentes identificados',
                    items: {
                      type: 'string',
                    },
                  },
                  harmfulAgentsEffectivePPE: {
                    type: 'boolean',
                    description:
                      'Indica se havia EPI (Equipamento de Proteção Individual) eficaz',
                  },
                  legalFrameworkOccupationalCategoryDecree: {
                    type: 'string',
                    description: 'Decreto aplicável à categoria profissional',
                  },
                  legalFrameworkOccupationalCategoryCode: {
                    type: 'string',
                    description: 'Código da categoria profissional',
                  },
                  legalFrameworkOccupationalCategoryDescription: {
                    type: 'string',
                    description: 'Descrição da categoria profissional',
                  },
                  legalFrameworkHarmfulAgentDecree: {
                    type: 'string',
                    description: 'Decreto aplicável ao agente nocivo',
                  },
                  legalFrameworkHarmfulAgentCode: {
                    type: 'string',
                    description: 'Código do agente nocivo',
                  },
                  legalFrameworkHarmfulAgentDescription: {
                    type: 'string',
                    description: 'Descrição do agente nocivo',
                  },
                  legalFrameworkCaseLawOrTechnicalStandardReference: {
                    type: 'string',
                    description: 'Referência da jurisprudência/norma',
                  },
                  legalFrameworkCaseLawOrTechnicalStandardCode: {
                    type: 'string',
                    description: 'Código da norma técnica',
                  },
                  legalFrameworkCaseLawOrTechnicalStandardDescription: {
                    type: 'string',
                    description: 'Descrição da norma técnica',
                  },
                  technicalConclusionSpecialTimeRecognized: {
                    type: 'boolean',
                    description: 'Indica se o tempo especial foi reconhecido',
                  },
                  technicalConclusionJustification: {
                    type: 'string',
                    description: 'Justificativa da conclusão técnica',
                  },
                  additionalNotes: {
                    type: 'string',
                    description: 'Observações adicionais relevantes',
                  },
                },
                required: [
                  'label',
                  'start',
                  'end',
                  'recognized',
                  'companyName',
                  'companyCNPJ',
                  'role',
                  'employmentLinkStartDate',
                  'employmentLinkEndDate',
                  'employmentLinkSupportingDocument',
                  'employmentLinkPresentInCNIS',
                  'employmentLinkEarningsInCNIS',
                  'harmfulAgentsHasAny',
                  'harmfulAgentsExposureFrequency',
                  'harmfulAgentsInformationSource',
                  'harmfulAgentsIdentifiedAgents',
                  'harmfulAgentsEffectivePPE',
                  'legalFrameworkOccupationalCategoryDecree',
                  'legalFrameworkOccupationalCategoryCode',
                  'legalFrameworkOccupationalCategoryDescription',
                  'legalFrameworkHarmfulAgentDecree',
                  'legalFrameworkHarmfulAgentCode',
                  'legalFrameworkHarmfulAgentDescription',
                  'legalFrameworkCaseLawOrTechnicalStandardReference',
                  'legalFrameworkCaseLawOrTechnicalStandardCode',
                  'legalFrameworkCaseLawOrTechnicalStandardDescription',
                  'technicalConclusionSpecialTimeRecognized',
                  'technicalConclusionJustification',
                  'additionalNotes',
                ],
              },
              analysisResult: {
                type: 'string',
                description: 'Análise completa em formato markdown',
              },
            },
            required: ['period', 'analysisResult'],
          },
        }),
      }),
    );
  }

  public async getJudicialCaseAnalysisCompleteAnalysis(
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

  public async getJudicialCaseAnalysisSimplifiedAnalysis(
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

  public async getAdministrativeProcedureInssAnalysisCompleteAnalysis(
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

  public async getAdministrativeProcedureInssAnalysisSimplifiedAnalysis(
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

  public async getMedicalAndSocialReportObjectionGeneratorAnalysisCompleteAnalysis(
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

  public async getMedicalAndSocialReportObjectionGeneratorAnalysisSimplifiedAnalysis(
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
}
