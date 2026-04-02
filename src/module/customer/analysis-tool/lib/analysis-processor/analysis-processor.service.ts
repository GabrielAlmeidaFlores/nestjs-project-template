import { Inject, Injectable } from '@nestjs/common';

import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import { DisabilityRetirementPlanningGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-consideration.enum';
import { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningGrantViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-viability.enum';

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

  public async getTeacherRetirementPlanningCompleteAnalysis(
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
                  timeline: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        startDate: {
                          type: 'string',
                          description: 'Data de inicio no formato YYYY-MM-DD',
                        },
                        endDate: {
                          type: 'string',
                          description: 'Data de fim no formato YYYY-MM-DD',
                        },
                        activityType: {
                          type: 'string',
                          enum: ['Atividade como professor', 'Atividade comum'],
                          description: 'Tipo de atividade exercida',
                        },
                        type: {
                          type: 'string',
                          description: 'Classificacao do periodo',
                        },
                        location: {
                          type: 'string',
                          description: 'Local do periodo',
                        },
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
                  retirementRules: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        ruleName: {
                          type: 'string',
                          description: 'Nome da regra de aposentadoria',
                        },
                        result: {
                          type: 'boolean',
                          description: 'Resultado da regra',
                        },
                        rightDate: {
                          type: 'string',
                          description: 'Data do direito no formato YYYY-MM-DD',
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
                          description: 'Indica se possui o maior valor de acao',
                        },
                        detailedRuleAnalysis: {
                          type: 'string',
                          description: 'Analise detalhada da regra',
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
                  finalAnalysis: {
                    type: 'string',
                    description: 'Analise final consolidada',
                  },
                  teacherTime: {
                    type: 'string',
                    description:
                      'Tempo total como professor. Exemplo: 29 anos e 3 meses',
                  },
                  commonTime: {
                    type: 'string',
                    description:
                      'Tempo total comum. Exemplo: 29 anos e 3 meses',
                  },
                  totalContributionTime: {
                    type: 'string',
                    description:
                      'Tempo total de contribuição. Exemplo: 29 anos e 3 meses',
                  },
                  publicServiceTime: {
                    type: 'string',
                    description:
                      'Tempo no serviço público. Exemplo: 25 anos e 1 mês',
                  },
                  positionTenureTime: {
                    type: 'string',
                    description: 'Tempo no cargo. Exemplo: 15 anos e 2 meses',
                  },
                },
                required: [
                  'timeline',
                  'retirementRules',
                  'finalAnalysis',
                  'teacherTime',
                  'commonTime',
                  'totalContributionTime',
                  'publicServiceTime',
                  'positionTenureTime',
                ],
              },
            })
          : null,
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

  public async getDisabilityRetirementPlanningCompleteAnalysis(
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
                this.getDisabilityRetirementPlanningCompleteAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getDisabilityRetirementPlanningSimplifiedAnalysis(
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

  public async getTeacherRetirementPlanningSimplifiedAnalysis(
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

  public async getDisabilityRetirementPlanningAdministrativeProcessAnalysis(
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

  public async getDisabilityRetirementPlanningGrantFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON;
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS, não realize calculos como valores saláriais, use estritamente os fornecidos.
- Não incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- Para cada item de \`periods\`, use prioritariamente os dados estruturados já enviados nos arquivos do prompt; não invente valores.
- O campo \`contributionAverage\` representa a média das remunerações do período já informada nos dados estruturados; quando esse valor estiver disponível, reutilize exatamente esse valor e não retorne \`0\`.
- O campo \`contributionAverage\` não é uma lista de contribuições e não deve ser calculado como soma zerada por ausência de detalhamento mensal.
- Quando o valor de \`contributionAverage\` não estiver presente nos dados estruturados do período, omita esse campo em vez de retornar \`0\`.
- O campo \`belowMinimumContributions\` deve conter somente as competências cujos valores ficaram abaixo do mínimo.
- Não liste em \`belowMinimumContributions\` contribuições que não estejam abaixo do mínimo.
- Quando não houver competências abaixo do mínimo, retorne \`belowMinimumContributions: []\`.
- O campo \`competenceBelowTheMinimum\` deve ser \`true\` somente quando houver ao menos um item em \`belowMinimumContributions\`; caso contrário, deve ser \`false\`.
- O campo \`isPendency\` deve indicar se o período possui qualquer pendência relevante.
- O campo \`reasonPendency\` só deve ser preenchido quando realmente existir pendência no período.
- O campo \`statusPCD\` só deve ser preenchido nos períodos em que houve deficiência reconhecida no período; nos demais, omita o campo.

Análise processada do CNIS:
  ${cnisAnalysisJson}
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: asJson
          ? ResponseConfigInputModel.build({
              responseMimeType:
                GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
              jsonSchema:
                this.getDisabilityRetirementPlanningGrantFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getDisabilityRetirementPlanningGrantResultAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON;
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS, não realize calculos como valores saláriais, use estritamente os fornecidos.
- Não incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.

Análise processada do CNIS:
  ${cnisAnalysisJson}
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getDisabilityRetirementPlanningGrantResultAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getDisabilityRetirementPlanningGrantTimeAcceleratorAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de reconhecimento e viabilidade.
- Cada item de \`timeAccelerators\` deve ser compatível com a criação de um período de acelerador de tempo.
- Preencha \`technicalNote\`, \`startDate\`, \`endDate\` e \`institution\` quando essas informações estiverem disponíveis nos documentos analisados.
- Não incluir tag <br> na resposta.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getDisabilityRetirementPlanningGrantTimeAcceleratorAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getTeacherRetirementPlanningAdministrativeProcessAnalysis(
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

  public async getDisabilityRetirementPlanningGrantPppAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de categoria, grau de deficiência, motivo de pendência e consideração do período.
- Cada item do array \`periods\` deve ser compatível com a criação de um período na análise de concessão de aposentadoria da pessoa com deficiência.
- Preencha \`endDate\`, \`pendencyReason\`, \`typeOfContribution\`, \`contributionAverage\`, \`disabilityStatus\` e \`periodConsideration\` somente quando essas informações estiverem disponíveis nos documentos analisados.
- Não incluir tag <br> na resposta.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getDisabilityRetirementPlanningGrantPppAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getDisabilityRetirementPlanningGrantSimplifiedAnalysis(
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

  private getDisabilityRetirementPlanningCompleteAnalysisJsonSchema(): object {
    const disabilityAnalysisSchema = {
      type: 'object',
      description: 'Análise da Deficiência com base nos documentos médicos',
      properties: {
        predominantDisabilityDegree: {
          type: 'string',
          description: 'Grau preponderante da deficiência. Ex: Grave: 75%',
        },
        lightDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiência leve. Ex: 15',
        },
        moderateDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiência moderada. Ex: 15',
        },
        severeDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiência grave. Ex: 75',
        },
        documents: {
          type: 'array',
          description: 'Lista de documentos médicos analisados',
          items: {
            type: 'object',
            properties: {
              documentName: {
                type: 'string',
                description:
                  'Nome ou tipo do documento. Ex: Laudo Médico - Ortopedia',
              },
              viability: {
                type: 'string',
                enum: [
                  'alta_viabilidade',
                  'media_viabilidade',
                  'baixa_viabilidade',
                ],
                description: 'Nível de viabilidade do documento',
              },
              cid: {
                type: 'string',
                description:
                  'Código e descrição do CID. Ex: M54.5 (Dor lombar baixa)',
              },
              degree: {
                type: 'string',
                description:
                  'Grau da deficiência indicado no documento. Ex: Moderado, Não Especificado, Alto',
              },
              date: {
                type: 'string',
                format: 'date',
                description: 'Data do documento no formato YYYY-MM-DD',
              },
              crm: {
                type: 'string',
                description: 'CRM do médico responsável. Ex: 123456-7',
              },
              observations: {
                type: 'array',
                items: { type: 'string' },
                description: 'Observações sobre o documento',
              },
            },
            required: [
              'documentName',
              'viability',
              'cid',
              'degree',
              'date',
              'crm',
              'observations',
            ],
          },
        },
      },
      required: [
        'predominantDisabilityDegree',
        'lightDisabilityPercentage',
        'moderateDisabilityPercentage',
        'severeDisabilityPercentage',
        'documents',
      ],
    };

    return {
      type: 'object',
      properties: {
        timeline: {
          type: 'array',
          description: 'Lista de períodos da linha do tempo do segurado',
          items: {
            type: 'object',
            properties: {
              startDate: {
                type: 'string',
                format: 'date',
                description: 'Data de início do período no formato YYYY-MM-DD',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'Data de fim do período no formato YYYY-MM-DD',
              },
              activityType: {
                type: 'string',
                enum: [
                  'pcd_leve',
                  'pcd_moderada',
                  'pcd_grave',
                  'atividade_comum',
                  'periodo_sem_atividade',
                ],
                description:
                  'Tipo de atividade do período: PCD_LEVE, PCD_MODERADA, PCD_GRAVE, ATIVIDADE_COMUM ou PERIODO_SEM_ATIVIDADE',
              },
              location: {
                type: 'string',
                description:
                  'Local do período. Exemplo: Assentamento Nova Vida, município de Araraquara/SP',
              },
            },
            required: ['startDate', 'endDate', 'activityType', 'location'],
          },
        },
        retirementOptionsSummary: {
          type: 'array',
          description: 'Resumo das regras de aposentadoria analisadas',
          items: {
            type: 'object',
            properties: {
              retirementRuleName: {
                type: 'string',
                description: 'Nome da regra de aposentadoria',
              },
              isEligible: {
                type: 'boolean',
                description:
                  'Indica se o segurado já atingiu o direito (true) ou ainda está aguardando (false)',
              },
              eligibilityAvailableAt: {
                type: 'string',
                description:
                  'Data do direito, se já atingido. Formato YYYY-MM-DD',
              },
              expectedMonthlyBenefit: {
                type: 'number',
                description: 'RMI prevista para esta regra',
              },
              isBestMonthlyBenefit: {
                type: 'boolean',
                description: 'Indica se esta regra oferece a melhor RMI',
              },
              hasHighestAdvantageValue: {
                type: 'boolean',
                description:
                  'Indica se esta regra oferece o maior valor de causa',
              },
              retirementAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada desta regra em formato markdown',
              },
            },
            required: [
              'retirementRuleName',
              'isEligible',
              'expectedMonthlyBenefit',
              'isBestMonthlyBenefit',
              'hasHighestAdvantageValue',
              'retirementAnalysis',
            ],
          },
        },
        analysisResult: {
          type: 'string',
          description: 'Resultado geral da análise em formato markdown',
        },
        disabilityTime: {
          type: 'string',
          description:
            'Tempo total como PCD. Exemplo: 23 anos, 7 meses e 4 dias',
        },
        commonTime: {
          type: 'string',
          description:
            'Tempo total em atividade comum. Exemplo: 12 anos, 3 meses e 10 dias',
        },
        totalContributionTime: {
          type: 'string',
          description:
            'Tempo total de contribuição. Exemplo: 35 anos, 10 meses e 14 dias',
        },
        positionTenureTime: {
          type: 'string',
          description:
            'Tempo no cargo atual. Exemplo: 10 anos, 6 meses e 15 dias',
        },
        publicServiceTime: {
          type: 'string',
          description:
            'Tempo no serviço público. Exemplo: 30 anos, 2 meses e 5 dias',
        },
        totalCareerTime: {
          type: 'string',
          description:
            'Tempo total de carreira. Exemplo: 42 anos, 1 mês e 20 dias',
        },
        insuredAge: {
          type: 'string',
          description:
            'Idade atual do segurado. Exemplo: 44 anos, 3 meses e 12 dias',
        },
        publicServiceStartDate: {
          type: 'string',
          format: 'date',
          description:
            'Data de ingresso no serviço público no formato YYYY-MM-DD',
        },
        disabilityAnalysis: disabilityAnalysisSchema,
      },
      required: [
        'timeline',
        'retirementOptionsSummary',
        'analysisResult',
        'disabilityTime',
        'commonTime',
        'totalContributionTime',
        'positionTenureTime',
        'publicServiceTime',
        'totalCareerTime',
        'insuredAge',
        'publicServiceStartDate',
        'disabilityAnalysis',
      ],
    };
  }

  private getDisabilityRetirementPlanningGrantFirstAnalysisJsonSchema(): object {
    const disabilityAnalysisSchema = {
      type: 'object',
      description: 'Análise da deficiência com base nos documentos médicos',
      properties: {
        predominantDisabilityDegree: {
          type: 'string',
          description: 'Grau preponderante da deficiência. Ex: Grave: 75%',
        },
        lightDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiência leve. Ex: 15',
        },
        moderateDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiência moderada. Ex: 15',
        },
        severeDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiência grave. Ex: 75',
        },
        documents: {
          type: 'array',
          description: 'Lista de documentos médicos analisados',
          items: {
            type: 'object',
            properties: {
              documentName: {
                type: 'string',
                description: 'Nome ou tipo do documento analisado',
              },
              viability: {
                type: 'string',
                enum: [
                  'alta_viabilidade',
                  'media_viabilidade',
                  'baixa_viabilidade',
                ],
                description: 'Nível de viabilidade do documento',
              },
              cid: {
                type: 'string',
                description: 'Código e descrição do CID',
              },
              degree: {
                type: 'string',
                description: 'Grau da deficiência indicado no documento',
              },
              date: {
                type: 'string',
                format: 'date',
                description: 'Data do documento no formato YYYY-MM-DD',
              },
              crm: {
                type: 'string',
                description: 'CRM do médico responsável',
              },
              observations: {
                type: 'array',
                items: { type: 'string' },
                description: 'Observações sobre o documento',
              },
            },
            required: [
              'documentName',
              'viability',
              'cid',
              'degree',
              'date',
              'crm',
              'observations',
            ],
          },
        },
      },
      required: [
        'predominantDisabilityDegree',
        'lightDisabilityPercentage',
        'moderateDisabilityPercentage',
        'severeDisabilityPercentage',
        'documents',
      ],
    };

    return {
      type: 'object',
      properties: {
        periods: {
          type: 'array',
          description:
            'Períodos analisados a partir do CNIS e dos dados do fluxo',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Nome da instituição ou vínculo principal',
              },
              startDate: {
                type: 'string',
                format: 'date',
                description: 'Data de início do período no formato YYYY-MM-DD',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'Data de fim do período no formato YYYY-MM-DD',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantCategoryEnum,
                ),
                description: 'Categoria previdenciária do vínculo',
              },
              gracePeriod: {
                type: 'number',
                description: 'Quantidade de competências válidas no período',
              },
              statusPCD: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
                ),
                description: 'Grau PCD considerado para o período',
              },
              status: {
                type: 'boolean',
                description: 'Indica se o período foi considerado válido',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se existe alguma pendência no período',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description: 'Indica se existem competências abaixo do mínimo',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Valor médio das remunerações consideradas naquele período',
              },
              belowMinimumContributions: {
                type: 'array',
                description:
                  'Lista apenas das competências cujas contribuições ficaram abaixo do mínimo',
                items: {
                  type: 'object',
                  properties: {
                    contributionDate: {
                      type: 'string',
                      format: 'date',
                      description: 'Data da contribuição no formato YYYY-MM-DD',
                    },
                    contributionValue: {
                      type: 'number',
                      description: 'Valor da contribuição abaixo do mínimo',
                    },
                  },
                  required: ['contributionDate', 'contributionValue'],
                },
              },
              reasonPendency: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pendência do período, quando houver',
              },
              earningsHistory: {
                type: 'array',
                description:
                  'Histórico de remunerações do período extraído do CNIS',
                items: {
                  type: 'object',
                  properties: {
                    competence: {
                      type: 'string',
                      format: 'date',
                      description: 'Competência no formato YYYY-MM-DD',
                    },
                    remuneration: {
                      type: 'string',
                      description: 'Valor ou descrição da remuneração',
                    },
                    indicators: {
                      type: 'string',
                      description: 'Indicadores da remuneração',
                    },
                    paymentDate: {
                      type: 'string',
                      format: 'date',
                      description: 'Data de pagamento no formato YYYY-MM-DD',
                    },
                    contribution: {
                      type: 'string',
                      description: 'Informações de contribuição',
                    },
                    contributionSalary: {
                      type: 'string',
                      description: 'Salário de contribuição',
                    },
                    analysis: {
                      type: 'string',
                      description: 'Análise da competência',
                    },
                    competenceBelowTheMinimum: {
                      type: 'boolean',
                      description:
                        'Indica se a competência está abaixo do mínimo',
                    },
                  },
                  required: [
                    'competence',
                    'remuneration',
                    'competenceBelowTheMinimum',
                  ],
                },
              },
            },
            required: [
              'name',
              'startDate',
              'endDate',
              'category',
              'gracePeriod',
              'status',
              'isPendency',
              'competenceBelowTheMinimum',
              'belowMinimumContributions',
              'earningsHistory',
            ],
          },
        },
        disabilityAnalysis: disabilityAnalysisSchema,
      },
      required: ['periods', 'disabilityAnalysis'],
    };
  }

  private getDisabilityRetirementPlanningGrantResultAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        retirementRules: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              retirementRuleName: {
                type: 'string',
                description: 'Nome da regra de aposentadoria',
              },
              isEligible: {
                type: 'boolean',
                description:
                  'Indica se o segurado já atingiu o direito ou ainda está aguardando',
              },
              eligibilityAvailableAt: {
                type: 'string',
                format: 'date',
                description: 'Data do direito no formato YYYY-MM-DD',
              },
              expectedMonthlyBenefit: {
                type: 'number',
                description: 'RMI prevista',
              },
              estimatedProcessValue: {
                type: 'number',
                description: 'Valor estimado da causa',
              },
              retirementAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada desta regra em formato markdown',
              },
            },
            required: [
              'retirementRuleName',
              'isEligible',
              'expectedMonthlyBenefit',
              'estimatedProcessValue',
              'retirementAnalysis',
            ],
          },
        },
        systemRecomendation: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              optionName: {
                type: 'string',
                description: 'Nome da opção recomendada pelo sistema',
              },
              retirementRuleName: {
                type: 'string',
                description: 'Nome da regra de aposentadoria relacionada',
              },
              dib: {
                type: 'string',
                format: 'date',
                description:
                  'Data de início do benefício no formato YYYY-MM-DD',
              },
              rmi: {
                type: 'number',
                description: 'Renda mensal inicial',
              },
              processValue: {
                type: 'number',
                description: 'Valor da causa',
              },
            },
            required: [
              'optionName',
              'retirementRuleName',
              'dib',
              'rmi',
              'processValue',
            ],
          },
        },
        processualStrategy: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              suggestionTitle: {
                type: 'string',
                description: 'Título da sugestão processual',
              },
              suggestionDescription: {
                type: 'string',
                description: 'Descrição da sugestão processual',
              },
              bulletPoints: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'Lista de itens processuais relevantes',
              },
              successRatePercentageInSimilarCases: {
                type: 'number',
                description: 'Taxa de sucesso em casos similares',
              },
            },
            required: ['suggestionTitle', 'suggestionDescription'],
          },
        },
        benefitCompatibility: {
          type: 'object',
          properties: {
            benefit: {
              type: 'string',
              description: 'Benefício analisado',
            },
            compatibility: {
              type: 'boolean',
              description: 'Indica a compatibilidade do benefício',
            },
            observations: {
              type: 'string',
              description: 'Observações sobre a compatibilidade',
            },
          },
          required: ['benefit', 'compatibility', 'observations'],
        },
        analysisResult: {
          type: 'string',
          description:
            'Análise extensa e detalhada do caso, abrangendo o histórico previdenciário do segurado, as condições incapacitantes apresentadas, os reflexos dos períodos contributivos, a aplicabilidade das regras de elegibilidade, as estratégias de reconhecimento de direitos e a conclusão fundamentada sobre a viabilidade da concessão da aposentadoria. O campo deve conter um texto longo, estruturado em parágrafos, em formato Markdown.',
        },
      },
      required: [
        'retirementRules',
        'systemRecomendation',
        'processualStrategy',
        'benefitCompatibility',
        'analysisResult',
      ],
    };
  }

  private getDisabilityRetirementPlanningGrantTimeAcceleratorAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        timeAccelerators: {
          type: 'array',
          description:
            'Lista de períodos de acelerador de tempo identificados nos documentos analisados',
          items: {
            type: 'object',
            properties: {
              recognitionInss: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum,
                ),
                description: 'Probabilidade de reconhecimento no INSS',
              },
              recognitionJudicial: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum,
                ),
                description: 'Probabilidade de reconhecimento judicial',
              },
              viability: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantViabilityEnum,
                ),
                description: 'Nível de viabilidade do período analisado',
              },
              technicalNote: {
                type: 'string',
                description: 'Nota técnica resumindo os fundamentos do período',
              },
              startDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de início do período no formato ISO 8601',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de fim do período no formato ISO 8601',
              },
              institution: {
                type: 'string',
                description: 'Instituição ou empregador relacionado ao período',
              },
              affectsQualifyingPeriod: {
                type: 'boolean',
                description:
                  'Indica se o período afeta carência ou tempo qualificável',
              },
            },
            required: [
              'recognitionInss',
              'recognitionJudicial',
              'viability',
              'technicalNote',
              'startDate',
              'endDate',
              'institution',
              'affectsQualifyingPeriod',
            ],
          },
        },
      },
      required: ['timeAccelerators'],
    };
  }

  private getDisabilityRetirementPlanningGrantPppAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        periods: {
          type: 'array',
          description:
            'Lista de períodos identificados nos documentos PPP analisados',
          items: {
            type: 'object',
            properties: {
              startDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de início do período no formato ISO 8601',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de fim do período no formato ISO 8601',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantCategoryEnum,
                ),
                description: 'Categoria do período',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o período possui pendência',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description: 'Indica se a competência está abaixo do mínimo',
              },
              pendencyReason: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pendência, se houver',
              },
              typeOfContribution: {
                type: 'string',
                description: 'Tipo de contribuição, se aplicável',
              },
              status: {
                type: 'boolean',
                description: 'Status do período (ativo/inativo)',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Média de contribuição como string decimal, se disponível',
              },
              disabilityStatus: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
                ),
                description: 'Grau de deficiência no período, se aplicável',
              },
              periodConsideration: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantPeriodConsiderationEnum,
                ),
                description: 'Consideração do período para o benefício',
              },
              bondOrigin: {
                type: 'string',
                description: 'Origem do vínculo empregatício, se identificada',
              },
            },
            required: [
              'startDate',
              'category',
              'isPendency',
              'competenceBelowTheMinimum',
              'status',
            ],
          },
        },
      },
      required: ['periods'],
    };
  }

  private getGeneralUrbanRetirementCompleteAnalysisJsonSchema(): object {
    const specialTimePeriodSchema = {
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
        'harmfulAgentsExposureFrequency',
        'harmfulAgentsInformationSource',
        'harmfulAgentsIdentifiedAgents',
        'harmfulAgentsEffectivePPE',
        'legalFrameworkOccupationalCategoryDecree',
        'legalFrameworkHarmfulAgentDecree',
        'legalFrameworkCaseLawOrTechnicalStandardReference',
        'technicalConclusionSpecialTimeRecognized',
        'technicalConclusionJustification',
        'additionalNotes',
      ],
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
        cifClassification: {
          type: 'string',
          description: 'Classificação CIF',
        },
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
        'disabilityType',
        'cidCodes',
        'cifClassification',
        'disabilityDegree',
        'legalFrameworkByDisabilityType',
        'legalFrameworkMainLaw',
        'legalFrameworkAssessmentMethodology',
        'technicalConclusionPcdTimeRecognized',
        'technicalConclusionJustification',
        'additionalNotes',
      ],
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
              type: {
                type: 'string',
                description: 'Classificação do período',
              },
              location: { type: 'string', description: 'Local do período' },
              duration: {
                type: 'string',
                description: 'Duração (ex: 4 anos)',
              },
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
            contributionTimeWithoutResolvingOutstandingIssues: {
              type: 'string',
              description:
                'Tempo de contribuição sem resolver pendências. Ex: 10 anos 2 meses',
            },
            contributionTimeAfterResolvingOutstandingIssues: {
              type: 'string',
              description:
                'Tempo de contribuição após resolver pendências. Ex: 22 anos 5 meses',
            },
            contributionTimeWithAccelerators: {
              type: 'string',
              description:
                'Tempo de contribuição considerando aceleradores. Ex: 30 anos 8 meses',
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
}
