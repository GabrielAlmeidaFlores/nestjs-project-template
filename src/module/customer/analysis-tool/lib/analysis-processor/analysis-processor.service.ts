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
import { MiniAdvisorAnalysisTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/enum/mini-advisor-analysis-type.enum';

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
- A an�lise t�cnica deve se basear prioritariamente na an�lise j� processada do CNIS em formato JSON;
- Calcule somente os valores que n�o estiverem presentes na an�lise j� fornecida do CNIS, n�o realize calculos como valores sal�riais, use estritamente os fornecidos.
- N�o incluir tag <br> na resposta.
Para a Se��o 6 (C�LCULOS), siga rigorosamente as instru��es abaixo:
1. Para c�lculos ja efetuados, n�o calcule novamente, use os valores fornecidos na an�lise do CNIS.
2. Garanta precis�o absoluta nos c�lculos num�ricos e de datas que precisar fazer.
3. Formate todos os valores monet�rios no padr�o brasileiro: prefixo "R$ ", milhar com ponto e decimal com v�rgula (ex.: R$ 1.234,56).

An�lise processada do CNIS:
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
                  'Tempo total de contribui��o de servi�o. Exemplo: 44 anos, 3 meses e 12 dias',
              },
              publicServiceContributionTime: {
                type: 'string',
                description:
                  'Tempo total de contribui��o em servi�o p�blico. Exemplo: 30 anos, 2 meses e 5 dias',
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
                description: 'Profiss�o do segurado',
              },
              totalCareerTime: {
                type: 'string',
                description:
                  'Tempo total de carreira. Exemplo: 50 anos, 1 m�s e 20 dias',
              },
              publicServiceStartDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de ingresso no servi�o p�blico',
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
                        'Indica se a regra oferece o maior valor no cen�rio mais vantajoso',
                    },
                    retirementAnalysis: {
                      type: 'string',
                      description:
                        'An�lise detalhada da aposentadoria em formato markdown',
                    },
                    isEligible: {
                      type: 'boolean',
                      description:
                        'Indica se o segurado � eleg�vel para a regra',
                    },
                    eligibilityAvailableAt: {
                      type: 'string',
                      description:
                        'Data em que o segurado se tornar� eleg�vel para a regra, se aplic�vel',
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
                      'Tempo total de contribui��o. Exemplo: 29 anos e 3 meses',
                  },
                  publicServiceTime: {
                    type: 'string',
                    description:
                      'Tempo no servi�o p�blico. Exemplo: 25 anos e 1 m�s',
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
                      'Lista de per�odos de atividade especial analisados',
                    items: {
                      type: 'object',
                      properties: {
                        label: {
                          type: 'string',
                          description: 'R�tulo descritivo do per�odo',
                        },
                        start: {
                          type: 'string',
                          description: 'Data de in�cio no formato YYYY-MM-DD',
                        },
                        end: {
                          type: 'string',
                          description: 'Data de t�rmino no formato YYYY-MM-DD',
                        },
                        recognized: {
                          type: 'boolean',
                          description:
                            'Indica se o per�odo foi reconhecido como atividade especial',
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
                          description: 'Cargo/fun��o exercida',
                        },
                        employmentLinkStartDate: {
                          type: 'string',
                          description: 'Data de in�cio do v�nculo',
                        },
                        employmentLinkEndDate: {
                          type: 'string',
                          description: 'Data de t�rmino do v�nculo',
                        },
                        employmentLinkSupportingDocument: {
                          type: 'string',
                          description: 'Documento comprobat�rio do v�nculo',
                        },
                        employmentLinkPresentInCNIS: {
                          type: 'boolean',
                          description: 'Indica se o v�nculo consta no CNIS',
                        },
                        employmentLinkEarningsInCNIS: {
                          type: 'boolean',
                          description:
                            'Indica se h� remunera��es registradas no CNIS',
                        },
                        harmfulAgentsHasAny: {
                          type: 'boolean',
                          description:
                            'Indica se h� agentes nocivos identificados',
                        },
                        harmfulAgentsExposureFrequency: {
                          type: 'array',
                          description:
                            'Frequ�ncia e intensidade de exposi��o aos agentes',
                          items: {
                            type: 'object',
                            properties: {
                              agent: {
                                type: 'string',
                                description: 'Nome do agente nocivo',
                              },
                              intensity: {
                                type: 'string',
                                description: 'Intensidade da exposi��o',
                              },
                              characteristic: {
                                type: 'string',
                                description: 'Caracter�stica do agente',
                              },
                            },
                          },
                        },
                        harmfulAgentsInformationSource: {
                          type: 'array',
                          description: 'Fontes de informa��o sobre os agentes',
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
                            'Indica se havia EPI (Equipamento de Prote��o Individual) eficaz',
                        },
                        legalFrameworkOccupationalCategoryDecree: {
                          type: 'string',
                          description:
                            'Decreto aplic�vel � categoria profissional',
                        },
                        legalFrameworkOccupationalCategoryCode: {
                          type: 'string',
                          description: 'C�digo da categoria profissional',
                        },
                        legalFrameworkOccupationalCategoryDescription: {
                          type: 'string',
                          description: 'Descri��o da categoria profissional',
                        },
                        legalFrameworkHarmfulAgentDecree: {
                          type: 'string',
                          description: 'Decreto aplic�vel ao agente nocivo',
                        },
                        legalFrameworkHarmfulAgentCode: {
                          type: 'string',
                          description: 'C�digo do agente nocivo',
                        },
                        legalFrameworkHarmfulAgentDescription: {
                          type: 'string',
                          description: 'Descri��o do agente nocivo',
                        },
                        legalFrameworkCaseLawOrTechnicalStandardReference: {
                          type: 'string',
                          description: 'Refer�ncia da jurisprud�ncia/norma',
                        },
                        legalFrameworkCaseLawOrTechnicalStandardCode: {
                          type: 'string',
                          description: 'C�digo da norma t�cnica',
                        },
                        legalFrameworkCaseLawOrTechnicalStandardDescription: {
                          type: 'string',
                          description: 'Descri��o da norma t�cnica',
                        },
                        technicalConclusionSpecialTimeRecognized: {
                          type: 'boolean',
                          description:
                            'Indica se o tempo especial foi reconhecido',
                        },
                        technicalConclusionJustification: {
                          type: 'string',
                          description: 'Justificativa da conclus�o t�cnica',
                        },
                        additionalNotes: {
                          type: 'string',
                          description: 'Observa��es adicionais relevantes',
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
                    description: 'An�lise completa em formato markdown',
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
- A an�lise t�cnica deve se basear prioritariamente na an�lise j� processada do CNIS em formato JSON;
- Calcule somente os valores que n�o estiverem presentes na an�lise j� fornecida do CNIS, n�o realize calculos como valores sal�riais, use estritamente os fornecidos.
- N�o incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compat�vel com o schema solicitado.
- Para cada item de \`periods\`, use prioritariamente os dados estruturados j� enviados nos arquivos do prompt; n�o invente valores.
- O campo \`contributionAverage\` representa a m�dia das remunera��es do per�odo j� informada nos dados estruturados; quando esse valor estiver dispon�vel, reutilize exatamente esse valor e n�o retorne \`0\`.
- O campo \`contributionAverage\` n�o � uma lista de contribui��es e n�o deve ser calculado como soma zerada por aus�ncia de detalhamento mensal.
- Quando o valor de \`contributionAverage\` n�o estiver presente nos dados estruturados do per�odo, omita esse campo em vez de retornar \`0\`.
- O campo \`belowMinimumContributions\` deve conter somente as compet�ncias cujos valores ficaram abaixo do m�nimo.
- N�o liste em \`belowMinimumContributions\` contribui��es que n�o estejam abaixo do m�nimo.
- Quando n�o houver compet�ncias abaixo do m�nimo, retorne \`belowMinimumContributions: []\`.
- O campo \`competenceBelowTheMinimum\` deve ser \`true\` somente quando houver ao menos um item em \`belowMinimumContributions\`; caso contr�rio, deve ser \`false\`.
- O campo \`isPendency\` deve indicar se o per�odo possui qualquer pend�ncia relevante.
- O campo \`reasonPendency\` s� deve ser preenchido quando realmente existir pend�ncia no per�odo.
- O campo \`statusPCD\` s� deve ser preenchido nos per�odos em que houve defici�ncia reconhecida no per�odo; nos demais, omita o campo.

An�lise processada do CNIS:
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
- A an�lise t�cnica deve se basear prioritariamente na an�lise j� processada do CNIS em formato JSON;
- Calcule somente os valores que n�o estiverem presentes na an�lise j� fornecida do CNIS, n�o realize calculos como valores sal�riais, use estritamente os fornecidos.
- N�o incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compat�vel com o schema solicitado.

An�lise processada do CNIS:
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
- Retorne estritamente um objeto JSON compat�vel com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de reconhecimento e viabilidade.
- Cada item de \`timeAccelerators\` deve ser compat�vel com a cria��o de um per�odo de acelerador de tempo.
- Preencha \`technicalNote\`, \`startDate\`, \`endDate\` e \`institution\` quando essas informa��es estiverem dispon�veis nos documentos analisados.
- N�o incluir tag <br> na resposta.
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
                description: 'Lista de itens de convers�o de tempo especial',
                items: {
                  type: 'object',
                  properties: {
                    originJobTitleDescription: {
                      type: 'string',
                      description: 'Descri��o do cargo/fun��o de origem',
                    },
                    periodDateRangeText: {
                      type: 'string',
                      description:
                        'Texto descritivo do per�odo (ex: 01/2010 a 12/2015)',
                    },
                    harmfulExposureAgentsText: {
                      type: 'string',
                      description:
                        'Descri��o dos agentes nocivos identificados',
                    },
                    specialTimeDurationText: {
                      type: 'string',
                      description:
                        'Dura��o do tempo especial em formato textual',
                    },
                    convertedTimeDurationText: {
                      type: 'string',
                      description:
                        'Dura��o do tempo convertido em formato textual',
                    },
                    conversionFactorValue: {
                      type: 'number',
                      description: 'Fator de convers�o aplicado (ex: 1.4, 1.2)',
                    },
                    recognitionStatusEnum: {
                      type: 'string',
                      description:
                        'Status de reconhecimento do per�odo especial',
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
                description: 'Lista de regras previdenci�rias analisadas',
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
                      description: 'Indica se � a melhor op��o financeira',
                    },
                    ruleDetailedExplanationText: {
                      type: 'string',
                      description: 'Explica��o detalhada da regra',
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

  public async getMiniAdvisorCompleteAnalysis(
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
              chosenAnalysis: {
                type: 'string',
                enum: Object.values(MiniAdvisorAnalysisTypeEnum),
                description:
                  'Tipo de análise mais recomendada para o perfil do cliente com base nas informa��es recebidas',
              },
              benefitDescription: {
                type: 'string',
                description:
                  'Descrição do benefício previdenciário mais indicado',
                nullable: true,
              },
              attentionNote: {
                type: 'string',
                description:
                  'Observação de atenção ou alerta importante para o caso',
                nullable: true,
              },
            },
            required: ['chosenAnalysis'],
          },
        }),
      }),
    );
  }

  public async getMiniAdvisorSimplifiedAnalysis(
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

  public async getDisabilityRetirementPlanningGrantPppAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Retorne estritamente um objeto JSON compat�vel com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de categoria, grau de defici�ncia, motivo de pend�ncia e considera��o do per�odo.
- Cada item do array \`periods\` deve ser compat�vel com a cria��o de um per�odo na an�lise de concess�o de aposentadoria da pessoa com defici�ncia.
- Preencha \`endDate\`, \`pendencyReason\`, \`typeOfContribution\`, \`contributionAverage\`, \`disabilityStatus\` e \`periodConsideration\` somente quando essas informa��es estiverem dispon�veis nos documentos analisados.
- N�o incluir tag <br> na resposta.
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

  public async getTemporaryDisabilityBenefitsGrantFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS.
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
        responseConfig: asJson
          ? ResponseConfigInputModel.build({
              responseMimeType:
                GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
              jsonSchema:
                this.getTemporaryDisabilityBenefitsGrantFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getTemporaryDisabilityBenefitsGrantCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS.
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
            this.getTemporaryDisabilityBenefitsGrantCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getTemporaryDisabilityBenefitsGrantSimplifiedAnalysis(
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

  private getTemporaryDisabilityBenefitsGrantFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        gracePeriod: {
          type: 'object',
          properties: {
            isMet: {
              type: 'boolean',
              description: 'Indica se a carência foi cumprida',
            },
            contributionCount: {
              type: 'number',
              description: 'Quantidade de contribuições para carência',
            },
            items: {
              type: 'array',
              description: 'Itens de carência analisados',
              items: {
                type: 'object',
                properties: {
                  startDate: {
                    type: 'string',
                    description: 'Data de início no formato YYYY-MM-DD',
                  },
                  endDate: {
                    type: 'string',
                    description: 'Data de término no formato YYYY-MM-DD',
                  },
                  contributionCount: {
                    type: 'number',
                    description: 'Quantidade de contribuições no período',
                  },
                },
              },
            },
          },
        },
        finalAnalysis: {
          type: 'string',
          description: 'Análise final consolidada em formato markdown',
        },
      },
    };
  }

  private getTemporaryDisabilityBenefitsGrantCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        gracePeriod: {
          type: 'object',
          properties: {
            isMet: {
              type: 'boolean',
              description: 'Indica se a carência foi cumprida',
            },
            contributionCount: {
              type: 'number',
              description: 'Quantidade de contribuições para carência',
            },
          },
        },
        finalAnalysis: {
          type: 'string',
          description: 'Análise final consolidada em formato markdown',
        },
      },
    };
  }

  private getDisabilityRetirementPlanningCompleteAnalysisJsonSchema(): object {
    const disabilityAnalysisSchema = {
      type: 'object',
      description: 'An�lise da Defici�ncia com base nos documentos m�dicos',
      properties: {
        predominantDisabilityDegree: {
          type: 'string',
          description: 'Grau preponderante da defici�ncia. Ex: Grave: 75%',
        },
        lightDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com defici�ncia leve. Ex: 15',
        },
        moderateDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com defici�ncia moderada. Ex: 15',
        },
        severeDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com defici�ncia grave. Ex: 75',
        },
        documents: {
          type: 'array',
          description: 'Lista de documentos m�dicos analisados',
          items: {
            type: 'object',
            properties: {
              documentName: {
                type: 'string',
                description:
                  'Nome ou tipo do documento. Ex: Laudo M�dico - Ortopedia',
              },
              viability: {
                type: 'string',
                enum: [
                  'alta_viabilidade',
                  'media_viabilidade',
                  'baixa_viabilidade',
                ],
                description: 'N�vel de viabilidade do documento',
              },
              cid: {
                type: 'string',
                description:
                  'C�digo e descri��o do CID. Ex: M54.5 (Dor lombar baixa)',
              },
              degree: {
                type: 'string',
                description:
                  'Grau da defici�ncia indicado no documento. Ex: Moderado, N�o Especificado, Alto',
              },
              date: {
                type: 'string',
                format: 'date',
                description: 'Data do documento no formato YYYY-MM-DD',
              },
              crm: {
                type: 'string',
                description: 'CRM do m�dico respons�vel. Ex: 123456-7',
              },
              observations: {
                type: 'array',
                items: { type: 'string' },
                description: 'Observa��es sobre o documento',
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
          description: 'Lista de per�odos da linha do tempo do segurado',
          items: {
            type: 'object',
            properties: {
              startDate: {
                type: 'string',
                format: 'date',
                description: 'Data de in�cio do per�odo no formato YYYY-MM-DD',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'Data de fim do per�odo no formato YYYY-MM-DD',
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
                  'Tipo de atividade do per�odo: PCD_LEVE, PCD_MODERADA, PCD_GRAVE, ATIVIDADE_COMUM ou PERIODO_SEM_ATIVIDADE',
              },
              location: {
                type: 'string',
                description:
                  'Local do per�odo. Exemplo: Assentamento Nova Vida, munic�pio de Araraquara/SP',
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
                  'Indica se o segurado j� atingiu o direito (true) ou ainda est� aguardando (false)',
              },
              eligibilityAvailableAt: {
                type: 'string',
                description:
                  'Data do direito, se j� atingido. Formato YYYY-MM-DD',
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
                  'An�lise detalhada desta regra em formato markdown',
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
          description: 'Resultado geral da an�lise em formato markdown',
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
            'Tempo total de contribui��o. Exemplo: 35 anos, 10 meses e 14 dias',
        },
        positionTenureTime: {
          type: 'string',
          description:
            'Tempo no cargo atual. Exemplo: 10 anos, 6 meses e 15 dias',
        },
        publicServiceTime: {
          type: 'string',
          description:
            'Tempo no servi�o p�blico. Exemplo: 30 anos, 2 meses e 5 dias',
        },
        totalCareerTime: {
          type: 'string',
          description:
            'Tempo total de carreira. Exemplo: 42 anos, 1 m�s e 20 dias',
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
            'Data de ingresso no servi�o p�blico no formato YYYY-MM-DD',
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
      description: 'An�lise da defici�ncia com base nos documentos m�dicos',
      properties: {
        predominantDisabilityDegree: {
          type: 'string',
          description: 'Grau preponderante da defici�ncia. Ex: Grave: 75%',
        },
        lightDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com defici�ncia leve. Ex: 15',
        },
        moderateDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com defici�ncia moderada. Ex: 15',
        },
        severeDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com defici�ncia grave. Ex: 75',
        },
        documents: {
          type: 'array',
          description: 'Lista de documentos m�dicos analisados',
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
                description: 'N�vel de viabilidade do documento',
              },
              cid: {
                type: 'string',
                description: 'C�digo e descri��o do CID',
              },
              degree: {
                type: 'string',
                description: 'Grau da defici�ncia indicado no documento',
              },
              date: {
                type: 'string',
                format: 'date',
                description: 'Data do documento no formato YYYY-MM-DD',
              },
              crm: {
                type: 'string',
                description: 'CRM do m�dico respons�vel',
              },
              observations: {
                type: 'array',
                items: { type: 'string' },
                description: 'Observa��es sobre o documento',
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
            'Per�odos analisados a partir do CNIS e dos dados do fluxo',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Nome da institui��o ou v�nculo principal',
              },
              startDate: {
                type: 'string',
                format: 'date',
                description: 'Data de in�cio do per�odo no formato YYYY-MM-DD',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'Data de fim do per�odo no formato YYYY-MM-DD',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantCategoryEnum,
                ),
                description: 'Categoria previdenci�ria do v�nculo',
              },
              gracePeriod: {
                type: 'number',
                description: 'Quantidade de compet�ncias v�lidas no per�odo',
              },
              statusPCD: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
                ),
                description: 'Grau PCD considerado para o per�odo',
              },
              status: {
                type: 'boolean',
                description: 'Indica se o per�odo foi considerado v�lido',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se existe alguma pend�ncia no per�odo',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description: 'Indica se existem compet�ncias abaixo do m�nimo',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Valor m�dio das remunera��es consideradas naquele per�odo',
              },
              belowMinimumContributions: {
                type: 'array',
                description:
                  'Lista apenas das compet�ncias cujas contribui��es ficaram abaixo do m�nimo',
                items: {
                  type: 'object',
                  properties: {
                    contributionDate: {
                      type: 'string',
                      format: 'date',
                      description: 'Data da contribui��o no formato YYYY-MM-DD',
                    },
                    contributionValue: {
                      type: 'number',
                      description: 'Valor da contribui��o abaixo do m�nimo',
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
                description: 'Motivo da pend�ncia do per�odo, quando houver',
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
                  'Indica se o segurado j� atingiu o direito ou ainda est� aguardando',
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
                  'An�lise detalhada desta regra em formato markdown',
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
                description: 'Nome da op��o recomendada pelo sistema',
              },
              retirementRuleName: {
                type: 'string',
                description: 'Nome da regra de aposentadoria relacionada',
              },
              dib: {
                type: 'string',
                format: 'date',
                description:
                  'Data de in�cio do benef�cio no formato YYYY-MM-DD',
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
                description: 'T�tulo da sugest�o processual',
              },
              suggestionDescription: {
                type: 'string',
                description: 'Descri��o da sugest�o processual',
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
              description: 'Benef�cio analisado',
            },
            compatibility: {
              type: 'boolean',
              description: 'Indica a compatibilidade do benef�cio',
            },
            observations: {
              type: 'string',
              description: 'Observa��es sobre a compatibilidade',
            },
          },
          required: ['benefit', 'compatibility', 'observations'],
        },
        analysisResult: {
          type: 'string',
          description:
            'An�lise extensa e detalhada do caso, abrangendo o hist�rico previdenci�rio do segurado, as condi��es incapacitantes apresentadas, os reflexos dos per�odos contributivos, a aplicabilidade das regras de elegibilidade, as estrat�gias de reconhecimento de direitos e a conclus�o fundamentada sobre a viabilidade da concess�o da aposentadoria. O campo deve conter um texto longo, estruturado em par�grafos, em formato Markdown.',
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
            'Lista de per�odos de acelerador de tempo identificados nos documentos analisados',
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
                description: 'N�vel de viabilidade do per�odo analisado',
              },
              technicalNote: {
                type: 'string',
                description: 'Nota t�cnica resumindo os fundamentos do per�odo',
              },
              startDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de in�cio do per�odo no formato ISO 8601',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de fim do per�odo no formato ISO 8601',
              },
              institution: {
                type: 'string',
                description: 'Institui��o ou empregador relacionado ao per�odo',
              },
              affectsQualifyingPeriod: {
                type: 'boolean',
                description:
                  'Indica se o per�odo afeta car�ncia ou tempo qualific�vel',
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
            'Lista de per�odos identificados nos documentos PPP analisados',
          items: {
            type: 'object',
            properties: {
              startDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de in�cio do per�odo no formato ISO 8601',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de fim do per�odo no formato ISO 8601',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantCategoryEnum,
                ),
                description: 'Categoria do per�odo',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o per�odo possui pend�ncia',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description: 'Indica se a compet�ncia est� abaixo do m�nimo',
              },
              pendencyReason: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pend�ncia, se houver',
              },
              typeOfContribution: {
                type: 'string',
                description: 'Tipo de contribui��o, se aplic�vel',
              },
              status: {
                type: 'boolean',
                description: 'Status do per�odo (ativo/inativo)',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'M�dia de contribui��o como string decimal, se dispon�vel',
              },
              disabilityStatus: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
                ),
                description: 'Grau de defici�ncia no per�odo, se aplic�vel',
              },
              periodConsideration: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantPeriodConsiderationEnum,
                ),
                description: 'Considera��o do per�odo para o benef�cio',
              },
              bondOrigin: {
                type: 'string',
                description: 'Origem do v�nculo empregat�cio, se identificada',
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
          description: 'R�tulo descritivo do per�odo',
        },
        start: {
          type: 'string',
          description: 'Data de in�cio no formato YYYY-MM-DD',
        },
        end: {
          type: 'string',
          description: 'Data de t�rmino no formato YYYY-MM-DD',
        },
        recognized: {
          type: 'boolean',
          description: 'Indica se o per�odo foi reconhecido',
        },
        companyName: { type: 'string', description: 'Nome da empresa' },
        companyCNPJ: { type: 'string', description: 'CNPJ da empresa' },
        role: { type: 'string', description: 'Cargo/fun��o' },
        employmentLinkStartDate: {
          type: 'string',
          description: 'In�cio do v�nculo',
        },
        employmentLinkEndDate: {
          type: 'string',
          description: 'Fim do v�nculo',
        },
        employmentLinkSupportingDocument: {
          type: 'string',
          description: 'Documento comprobat�rio',
        },
        employmentLinkPresentInCNIS: {
          type: 'boolean',
          description: 'V�nculo consta no CNIS',
        },
        employmentLinkEarningsInCNIS: {
          type: 'boolean',
          description: 'Remunera��es no CNIS',
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
        label: { type: 'string', description: 'R�tulo do per�odo PCD' },
        start: { type: 'string', description: 'Data de in�cio YYYY-MM-DD' },
        end: { type: 'string', description: 'Data de t�rmino YYYY-MM-DD' },
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
          description: 'Tipo de defici�ncia (ex: F�sica)',
        },
        cidCodes: {
          type: 'array',
          items: { type: 'string' },
          description: 'CID(s) identificados',
        },
        cifClassification: {
          type: 'string',
          description: 'Classifica��o CIF',
        },
        disabilityDegree: {
          type: 'string',
          description: 'Grau da defici�ncia (Leve, Moderado, Grave)',
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
              description: 'N�mero do processo judicial',
            },
          },
          required: ['name', 'birthDate'],
        },
        rulesSummary: {
          type: 'object',
          description:
            'N�mero total de regras analisadas, eleg�veis e n�o eleg�veis',
          properties: {
            totalAnalyzed: {
              type: 'number',
              description: 'Total de regras analisadas',
            },
            eligibleCount: {
              type: 'number',
              description: 'Quantidade de regras eleg�veis',
            },
            nonEligibleCount: {
              type: 'number',
              description: 'Quantidade de regras n�o eleg�veis',
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
                description: 'Se o segurado � eleg�vel',
              },
              rightDate: {
                type: 'string',
                description:
                  'Data do direito no formato YYYY-MM-DD (quando eleg�vel)',
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
                description: 'Indica se possui o maior valor de a��o',
              },
              detailedRuleAnalysis: {
                type: 'string',
                description:
                  'An�lise detalhada da regra (requisitos, c�lculo RMI, valor da causa)',
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
                description: 'Data de in�cio YYYY-MM-DD',
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
                description: 'Classifica��o do per�odo',
              },
              location: { type: 'string', description: 'Local do per�odo' },
              duration: {
                type: 'string',
                description: 'Dura��o (ex: 4 anos)',
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
            'An�lise do tempo especial (per�odos com agentes nocivos)',
          items: specialTimePeriodSchema,
        },
        pcdTimeAnalysis: {
          type: 'array',
          description:
            'An�lise do tempo PCD (per�odos como pessoa com defici�ncia)',
          items: pcdPeriodSchema,
        },
        contributionTimeSummary: {
          type: 'object',
          description: 'Tempo de Servi�o/Contribui��o',
          properties: {
            totalContributionTime: {
              type: 'string',
              description:
                'Tempo total de contribui��o. Ex: 44 anos, 5 meses e 22 dias',
            },
            publicServiceContributionTime: {
              type: 'string',
              description: 'Tempo no servi�o p�blico',
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
                'Ingresso no servi�o p�blico (anterior/posterior a 16/12/1998 ou data)',
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
                'Tempo de contribui��o sem resolver pend�ncias. Ex: 10 anos 2 meses',
            },
            contributionTimeAfterResolvingOutstandingIssues: {
              type: 'string',
              description:
                'Tempo de contribui��o ap�s resolver pend�ncias. Ex: 22 anos 5 meses',
            },
            contributionTimeWithAccelerators: {
              type: 'string',
              description:
                'Tempo de contribui��o considerando aceleradores. Ex: 30 anos 8 meses',
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
            'Resumo de Regras Aplic�veis para Aposentadoria Urbana Comum (RPPS)',
        },
        finalAnalysis: {
          type: 'string',
          description: 'An�lise final consolidada',
        },
        completeAnalysisReport: {
          type: 'string',
          description:
            'Relat�rio completo da an�lise em Markdown, pronto para exporta��o em PDF/DOCX. Deve conter todas as se��es: Dados do cliente, Tempo de Servi�o/Contribui��o, An�lise de Regras de Aposentadoria, resumo e lista de regras (eleg�veis e n�o eleg�veis), Linha do tempo integrada, An�lise do tempo especial, An�lise do tempo PCD, Resumo de Regras Aplic�veis para Aposentadoria Urbana Comum (RPPS) e An�lise final. Formate com t�tulos (##), listas e tabelas em Markdown quando aplic�vel.',
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
