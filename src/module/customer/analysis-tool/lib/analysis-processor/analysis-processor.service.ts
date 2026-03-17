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
    asJson = true,
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
        responseConfig: asJson
          ? ResponseConfigInputModel.build({
              responseMimeType:
                GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
              jsonSchema: {
                type: 'object',
                properties: {
                  periods: {
                    type: 'array',
                    description:
                      'Lista de períodos de atividade especial analisados',
                    items: {
                      type: 'object',
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
                          description:
                            'Indica se há agentes nocivos identificados',
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
                          description:
                            'Decreto aplicável à categoria profissional',
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
                          description:
                            'Indica se o tempo especial foi reconhecido',
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
                  },
                  analysisResult: {
                    type: 'string',
                    description: 'Análise completa em formato markdown',
                  },
                },
                required: ['periods', 'analysisResult'],
              },
            })
          : null,
      }),
    );
  }

  public async getSpecialActivitySimplifiedAnalysis(
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

  public async getMedicalQuestionGeneratorCompleteAnalysis(
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

  public async getMedicalQuestionGeneratorSimplifiedAnalysis(
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

  public async getAudienceQuestionGeneratorCompleteAnalysis(
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

  public async getAudienceQuestionGeneratorSimplifiedAnalysis(
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

  public async getSpeechGeneratorCompleteAnalysis(
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

  public async getDisabilityAssessmentForBpcAnalysisCompleteAnalysis(
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

  public async getSpeechGeneratorSimplifiedAnalysis(
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

  public async getDisabilityAssessmentForBpcAnalysisSimplifiedAnalysis(
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

  public async getPerCapitaIncomeForBpcCompleteAnalysis(
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

  public async getPerCapitaIncomeForBpcSimplifiedAnalysis(
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

  public async getInsuranceQualityAnalysisCompleteAnalysis(
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

  public async getInsuranceQualityAnalysisSimplifiedAnalysis(
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

  public async getGeneralUrbanRetirementAdministrativeRequestDeniedAnalysis(
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

  public async getGeneralUrbanRetirementBenefitAwardLetterAnalysis(
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

  public async getGeneralUrbanRetirementSimplifiedAnalysis(
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

  public async getGeneralUrbanRetirementCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
        responseConfig: asJson
          ? ResponseConfigInputModel.build({
              responseMimeType:
                GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
              jsonSchema:
                this.getGeneralUrbanRetirementCompleteAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  private getGeneralUrbanRetirementCompleteAnalysisJsonSchema(): object {
    const specialTimePeriodSchema = {
      type: 'object',
      properties: {
        label: { type: 'string', description: 'Rótulo descritivo do período' },
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
          description: 'Indica se o período foi reconhecido',
        },
        companyName: { type: 'string', description: 'Nome da empresa' },
        companyCNPJ: { type: 'string', description: 'CNPJ da empresa' },
        role: { type: 'string', description: 'Cargo/função' },
        employmentLinkStartDate: {
          type: 'string',
          description: 'Início do vínculo',
        },
        employmentLinkEndDate: {
          type: 'string',
          description: 'Fim do vínculo',
        },
        employmentLinkSupportingDocument: {
          type: 'string',
          description: 'Documento comprobatório',
        },
        employmentLinkPresentInCNIS: {
          type: 'boolean',
          description: 'Vínculo consta no CNIS',
        },
        employmentLinkEarningsInCNIS: {
          type: 'boolean',
          description: 'Remunerações no CNIS',
        },
        harmfulAgentsExposureFrequency: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              agent: { type: 'string' },
              intensity: { type: 'string' },
              characteristic: { type: 'string' },
            },
          },
        },
        harmfulAgentsInformationSource: {
          type: 'array',
          items: { type: 'string' },
        },
        harmfulAgentsIdentifiedAgents: {
          type: 'array',
          items: { type: 'string' },
        },
        harmfulAgentsEffectivePPE: {
          type: 'boolean',
          description: 'EPI eficaz',
        },
        legalFrameworkOccupationalCategoryDecree: { type: 'string' },
        legalFrameworkOccupationalCategoryCode: { type: 'string' },
        legalFrameworkHarmfulAgentDecree: { type: 'string' },
        legalFrameworkHarmfulAgentCode: { type: 'string' },
        legalFrameworkCaseLawOrTechnicalStandardReference: { type: 'string' },
        legalFrameworkCaseLawOrTechnicalStandardCode: { type: 'string' },
        technicalConclusionSpecialTimeRecognized: { type: 'boolean' },
        technicalConclusionJustification: { type: 'string' },
        additionalNotes: { type: 'string' },
      },
      required: ['label', 'start', 'end', 'recognized'],
    };

    const pcdPeriodSchema = {
      type: 'object',
      properties: {
        label: { type: 'string', description: 'Rótulo do período PCD' },
        start: { type: 'string', description: 'Data de início YYYY-MM-DD' },
        end: { type: 'string', description: 'Data de término YYYY-MM-DD' },
        recognized: {
          type: 'boolean',
          description: 'Tempo como PCD reconhecido',
        },
        companyName: { type: 'string' },
        companyCNPJ: { type: 'string' },
        role: { type: 'string' },
        employmentLinkStartDate: { type: 'string' },
        employmentLinkEndDate: { type: 'string' },
        employmentLinkSupportingDocument: { type: 'string' },
        employmentLinkPresentInCNIS: { type: 'boolean' },
        employmentLinkEarningsInCNIS: { type: 'boolean' },
        disabilityType: {
          type: 'string',
          description: 'Tipo de deficiência (ex: Física)',
        },
        cidCodes: {
          type: 'array',
          items: { type: 'string' },
          description: 'CID(s) identificados',
        },
        cifClassification: { type: 'string', description: 'Classificação CIF' },
        disabilityDegree: {
          type: 'string',
          description: 'Grau da deficiência (Leve, Moderado, Grave)',
        },
        legalFrameworkByDisabilityType: { type: 'string' },
        legalFrameworkMainLaw: { type: 'string' },
        legalFrameworkAssessmentMethodology: { type: 'string' },
        technicalConclusionPcdTimeRecognized: { type: 'boolean' },
        technicalConclusionJustification: { type: 'string' },
        additionalNotes: { type: 'string' },
      },
      required: ['label', 'start', 'end', 'recognized'],
    };

    return {
      type: 'object',
      properties: {
        clientData: {
          type: 'object',
          description: 'Dados do cliente',
          properties: {
            name: { type: 'string', description: 'Nome completo' },
            cpfCnpj: { type: 'string', description: 'CPF ou CNPJ' },
            birthDate: {
              type: 'string',
              description: 'Data de nascimento YYYY-MM-DD',
            },
            gender: { type: 'string', description: 'Sexo' },
            email: { type: 'string', description: 'E-mail' },
            phone: { type: 'string', description: 'Telefone' },
            currentPosition: { type: 'string', description: 'Cargo atual' },
            ni: { type: 'string', description: 'NI' },
            lawsuitNumber: {
              type: 'string',
              description: 'Número do processo judicial',
            },
          },
          required: ['name', 'birthDate'],
        },
        rulesSummary: {
          type: 'object',
          description:
            'Número total de regras analisadas, elegíveis e não elegíveis',
          properties: {
            totalAnalyzed: {
              type: 'number',
              description: 'Total de regras analisadas',
            },
            eligibleCount: {
              type: 'number',
              description: 'Quantidade de regras elegíveis',
            },
            nonEligibleCount: {
              type: 'number',
              description: 'Quantidade de regras não elegíveis',
            },
          },
          required: ['totalAnalyzed', 'eligibleCount', 'nonEligibleCount'],
        },
        retirementRules: {
          type: 'array',
          description: 'Lista das regras de aposentadoria analisadas',
          items: {
            type: 'object',
            properties: {
              ruleName: {
                type: 'string',
                description: 'Nome da regra de aposentadoria',
              },
              regime: {
                type: 'string',
                description: 'Regime (ex: RPPS Federal)',
              },
              result: {
                type: 'boolean',
                description: 'Se o segurado é elegível',
              },
              rightDate: {
                type: 'string',
                description:
                  'Data do direito no formato YYYY-MM-DD (quando elegível)',
              },
              estimatedRMI: {
                type: 'number',
                description: 'Renda mensal inicial estimada',
              },
              bestRMI: {
                type: 'boolean',
                description: 'Indica se possui a melhor RMI',
              },
              highestLawsuitValue: {
                type: 'boolean',
                description: 'Indica se possui o maior valor de ação',
              },
              detailedRuleAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada da regra (requisitos, cálculo RMI, valor da causa)',
              },
            },
            required: [
              'ruleName',
              'result',
              'bestRMI',
              'highestLawsuitValue',
              'detailedRuleAnalysis',
            ],
          },
        },
        timeline: {
          type: 'array',
          description: 'Linha do tempo integrada de atividades e lacunas',
          items: {
            type: 'object',
            properties: {
              startDate: {
                type: 'string',
                description: 'Data de início YYYY-MM-DD',
              },
              endDate: {
                type: 'string',
                description: 'Data de fim YYYY-MM-DD',
              },
              activityType: {
                type: 'string',
                enum: [
                  'Atividade como PCD (Grave)',
                  'Atividade como PCD (Leve)',
                  'Atividade como PCD (Moderada)',
                  'Atividade comum',
                  'Lacuna',
                ],
                description: 'Tipo de atividade ou lacuna',
              },
              type: { type: 'string', description: 'Classificação do período' },
              location: { type: 'string', description: 'Local do período' },
              duration: { type: 'string', description: 'Duração (ex: 4 anos)' },
            },
            required: [
              'startDate',
              'endDate',
              'activityType',
              'type',
              'location',
            ],
          },
        },
        specialTimeAnalysis: {
          type: 'array',
          description:
            'Análise do tempo especial (períodos com agentes nocivos)',
          items: specialTimePeriodSchema,
        },
        pcdTimeAnalysis: {
          type: 'array',
          description:
            'Análise do tempo PCD (períodos como pessoa com deficiência)',
          items: pcdPeriodSchema,
        },
        contributionTimeSummary: {
          type: 'object',
          description: 'Tempo de Serviço/Contribuição',
          properties: {
            totalContributionTime: {
              type: 'string',
              description:
                'Tempo total de contribuição. Ex: 44 anos, 5 meses e 22 dias',
            },
            publicServiceContributionTime: {
              type: 'string',
              description: 'Tempo no serviço público',
            },
            positionTenureTime: {
              type: 'string',
              description: 'Tempo no cargo',
            },
            currentAge: {
              type: 'string',
              description: 'Idade atual. Ex: 41 anos, 7 meses e 23 dias',
            },
            totalCareerTime: {
              type: 'string',
              description: 'Tempo de carreira',
            },
            publicServiceStartDate: {
              type: 'string',
              description:
                'Ingresso no serviço público (anterior/posterior a 16/12/1998 ou data)',
            },
            pcdTime: {
              type: 'string',
              description: 'Tempo como PCD. Ex: 23 anos 7 meses',
            },
            commonTime: {
              type: 'string',
              description: 'Tempo comum. Ex: 12 anos 3 meses',
            },
          },
          required: [
            'totalContributionTime',
            'publicServiceContributionTime',
            'positionTenureTime',
            'currentAge',
            'totalCareerTime',
          ],
        },
        rppsSummary: {
          type: 'string',
          description:
            'Resumo de Regras Aplicáveis para Aposentadoria Urbana Comum (RPPS)',
        },
        finalAnalysis: {
          type: 'string',
          description: 'Análise final consolidada',
        },
        completeAnalysisReport: {
          type: 'string',
          description:
            'Relatório completo da análise em Markdown, pronto para exportação em PDF/DOCX. Deve conter todas as seções: Dados do cliente, Tempo de Serviço/Contribuição, Análise de Regras de Aposentadoria, resumo e lista de regras (elegíveis e não elegíveis), Linha do tempo integrada, Análise do tempo especial, Análise do tempo PCD, Resumo de Regras Aplicáveis para Aposentadoria Urbana Comum (RPPS) e Análise final. Formate com títulos (##), listas e tabelas em Markdown quando aplicável.',
        },
      },
      required: [
        'clientData',
        'rulesSummary',
        'retirementRules',
        'timeline',
        'specialTimeAnalysis',
        'pcdTimeAnalysis',
        'contributionTimeSummary',
        'rppsSummary',
        'finalAnalysis',
        'completeAnalysisReport',
      ],
    };
  }

  public async getSpecialCategoryRetirementConversionAnalysis(
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
              items: {
                type: 'array',
                description: 'Lista de itens de conversão de tempo especial',
                items: {
                  type: 'object',
                  properties: {
                    originJobTitleDescription: {
                      type: 'string',
                      description: 'Descrição do cargo/função de origem',
                    },
                    periodDateRangeText: {
                      type: 'string',
                      description:
                        'Texto descritivo do período (ex: 01/2010 a 12/2015)',
                    },
                    harmfulExposureAgentsText: {
                      type: 'string',
                      description:
                        'Descrição dos agentes nocivos identificados',
                    },
                    specialTimeDurationText: {
                      type: 'string',
                      description:
                        'Duração do tempo especial em formato textual',
                    },
                    convertedTimeDurationText: {
                      type: 'string',
                      description:
                        'Duração do tempo convertido em formato textual',
                    },
                    conversionFactorValue: {
                      type: 'number',
                      description: 'Fator de conversão aplicado (ex: 1.4, 1.2)',
                    },
                    recognitionStatusEnum: {
                      type: 'string',
                      description:
                        'Status de reconhecimento do período especial',
                    },
                  },
                },
              },
            },
          },
        }),
      }),
    );
  }

  public async getSpecialCategoryRetirementRulesAnalysis(
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
              items: {
                type: 'array',
                description: 'Lista de regras previdenciárias analisadas',
                items: {
                  type: 'object',
                  properties: {
                    retirementModalityName: {
                      type: 'string',
                      description: 'Nome da modalidade de aposentadoria',
                    },
                    isRequirementMet: {
                      type: 'boolean',
                      description: 'Indica se os requisitos foram cumpridos',
                    },
                    projectedRetirementDate: {
                      type: 'string',
                      description:
                        'Data projetada de aposentadoria (YYYY-MM-DD)',
                      nullable: true,
                    },
                    estimatedRmiAmount: {
                      type: 'number',
                      description: 'Valor estimado da RMI',
                      nullable: true,
                    },
                    isBestFinancialOption: {
                      type: 'boolean',
                      description: 'Indica se é a melhor opção financeira',
                    },
                    ruleDetailedExplanationText: {
                      type: 'string',
                      description: 'Explicação detalhada da regra',
                      nullable: true,
                    },
                  },
                },
              },
            },
          },
        }),
      }),
    );
  }

  public async getSpecialCategoryRetirementAdministrativeProcedureAnalysis(
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
