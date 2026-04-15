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
import { GeneralUrbanRetirementDenialPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-category.enum';
import { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
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
                          enum: [
                            'atividade_professor',
                            'atividade_comum',
                            'periodo_sem_atividade',
                          ],
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

  public async getSpecialRetirementGrantFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON;
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS, não realize cálculos salariais além do que for necessário; use estritamente os fornecidos.
- Não incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- Para cada item de \`periods\`, use prioritariamente os dados estruturados já enviados nos arquivos do prompt; não invente valores.
- O campo \`agents\` NÃO vem do CNIS analisado; extraia e consolide agentes nocivos a partir dos documentos anexados (PPP, LTCAT, etc.) e devolva no formato estruturado.

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
                this.getSpecialRetirementGrantFirstAnalysisJsonSchema(),
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

  public async getSpecialRetirementGrantCompleteAnalysis(
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

  public async getSpecialRetirementGrantSimplifiedAnalysis(
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

  public async getSurvivorPensionAnalysisResult(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: this.getSurvivorPensionAnalysisResultJsonSchema(),
        }),
      }),
    );
  }

  public async getSurvivorPensionAnalysisRetirementRules(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getSurvivorPensionAnalysisRetirementRulesJsonSchema(),
        }),
      }),
    );
  }

  public async getSurvivorPensionAnalysisDependentPensionAnalyses(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getSurvivorPensionAnalysisDependentPensionAnalysesJsonSchema(),
        }),
      }),
    );
  }

  public async getSurvivorPensionAnalysisCompleteAnalysisText(
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

  public async getSurvivorPensionAnalysisSimplifiedAnalysisText(
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

  private getSurvivorPensionAnalysisResultJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        isInsuredStatusConfirmed: {
          type: 'boolean',
          description:
            'Indica se o falecido possuía qualidade de segurado na data do óbito.',
        },
        insuredStatusSummary: {
          type: 'string',
          description:
            'Resumo curto e direto sobre a qualidade de segurado do falecido. Deve ser texto simples, sem formatação markdown, sem asteriscos, sem hashtags, sem tabelas. Máximo de 255 caracteres.',
        },
        isRetirementRightConfirmed: {
          type: 'boolean',
          description:
            'Indica se o falecido havia cumprido requisitos para ao menos uma regra de aposentadoria.',
        },
        retirementRightSummary: {
          type: 'string',
          description:
            'Resumo curto e direto sobre o direito à aposentadoria do falecido no momento do óbito. Deve ser texto simples, sem formatação markdown, sem asteriscos, sem hashtags, sem tabelas. Máximo de 255 caracteres.',
        },
        completeAnalysis: {
          type: 'string',
          description:
            'Análise completa e detalhada em formato Markdown. Deve conter: (1) análise da qualidade de segurado e carência; (2) situação dos dependentes; (3) regras de aposentadoria verificadas; (4) parecer técnico conclusivo com recomendações. Use títulos (##), negrito (**), listas (-) e parágrafos para estruturar o texto.',
        },
      },
      required: [
        'isInsuredStatusConfirmed',
        'insuredStatusSummary',
        'isRetirementRightConfirmed',
        'retirementRightSummary',
        'completeAnalysis',
      ],
    };
  }

  private getSurvivorPensionAnalysisRetirementRulesJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        retirementRules: {
          type: 'array',
          description:
            'Lista das regras de aposentadoria analisadas para o falecido.',
          items: {
            type: 'object',
            properties: {
              ruleName: {
                type: 'string',
                description: 'Nome da regra de aposentadoria analisada.',
              },
              isRequirementMet: {
                type: 'boolean',
                description: 'Indica se os requisitos foram cumpridos.',
              },
              entitlementDate: {
                type: 'string',
                description:
                  'Data em que o requisito foi ou seria cumprido, no formato YYYY-MM-DD. Null se não aplicável.',
              },
              estimatedRmi: {
                type: 'number',
                description:
                  'Valor decimal da RMI estimada para essa regra. Null se não calculável.',
              },
              isBestRmi: {
                type: 'boolean',
                description:
                  'Indica se esta regra gera a melhor RMI entre todas as regras.',
              },
              isHighestClaimValue: {
                type: 'boolean',
                description:
                  'Indica se esta regra gera o maior valor de benefício considerando todas as variáveis.',
              },
              detailedAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada dos requisitos e resultado para esta regra específica. Retorne texto simples sem markdown, sem asteriscos, sem hashtags. Use \\n para separar cada linha. Estruture em três blocos separados por uma linha em branco (\\n\\n): (1) "📊 Requisitos analisados:" seguido de cada requisito em linha separada com "→ ✅" ou "→ ❌"; (2) "💰 Cálculo da RMI:" com cada item em linha separada (média salarial, coeficiente, RMI estimada); (3) "⚠️ Valor da causa:" com cada item em linha separada (DIB, DER, tempo de atraso, valor em R$). Omita blocos cujos dados não estejam disponíveis.',
              },
            },
            required: [
              'ruleName',
              'isRequirementMet',
              'isBestRmi',
              'isHighestClaimValue',
              'detailedAnalysis',
            ],
          },
        },
      },
      required: ['retirementRules'],
    };
  }

  private getSurvivorPensionAnalysisDependentPensionAnalysesJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        dependentPensionAnalyses: {
          type: 'array',
          description:
            'Lista das análises de pensão para cada dependente identificado.',
          items: {
            type: 'object',
            properties: {
              dependentName: {
                type: 'string',
                description: 'Nome completo do dependente.',
              },
              dependencyDegree: {
                type: 'string',
                description:
                  'Grau de dependência (ex: cônjuge, filho menor, pai/mãe).',
              },
              isDependencyVerified: {
                type: 'boolean',
                description:
                  'Indica se a dependência econômica ou legal foi verificada.',
              },
              pensionStartDate: {
                type: 'string',
                description:
                  'Data estimada de início da pensão no formato YYYY-MM-DD. Null se não aplicável.',
              },
              estimatedPensionDuration: {
                type: 'string',
                description:
                  'Duração estimada da pensão em formato curto e direto. Retorne apenas a duração, sem citar artigos de lei ou explicações jurídicas. Exemplos de formato esperado: "4 meses", "1 ano", "2 anos e 3 meses", "Até 21 anos", "4 meses ou até a cessação da condição", "Enquanto durar a invalidez". Máximo 50 caracteres.',
              },
            },
            required: [
              'dependentName',
              'dependencyDegree',
              'isDependencyVerified',
              'estimatedPensionDuration',
            ],
          },
        },
      },
      required: ['dependentPensionAnalyses'],
    };
  }

  private getTemporaryDisabilityBenefitsGrantFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        insuredStatus: {
          type: 'boolean',
          description:
            'Indica se o segurado possui qualidade de segurado na Data de Início da Incapacidade (DII)',
        },
        gracePeriodStatus: {
          type: 'boolean',
          description:
            'Indica se o segurado está em período de graça na Data de Início da Incapacidade (DII)',
        },
        gracePeriods: {
          type: 'array',
          description:
            'Lista de eventos que geraram ou sustentam o período de graça',
          items: {
            type: 'object',
            properties: {
              event: {
                type: 'string',
                description:
                  'Nome do evento que gerou ou sustenta o período de graça. Ex: Último vínculo empregatício, Desemprego involuntário, Afastamento por doença',
              },
              date: {
                type: 'string',
                description: 'Data do evento no formato DD/MM/AAAA',
              },
              observation: {
                type: 'string',
                description:
                  'Análise técnica sobre como esse evento impacta o período de graça',
              },
            },
            required: ['event', 'date', 'observation'],
          },
        },
        analysisConclusion: {
          type: 'string',
          description:
            'Conclusão técnica completa da análise, incluindo carência, qualidade de segurado, pontos de atenção e viabilidade preliminar do benefício',
        },
        graceExtensionDueToInvoluntaryUnemployment: {
          type: 'boolean',
          description:
            'Indica se há direito à extensão do período de graça em razão de desemprego involuntário (art. 15, §2º da Lei 8.213/91)',
        },
        requestToExtendGracePeriod: {
          type: 'boolean',
          description:
            'Indica se é recomendável requerer prorrogação do período de graça administrativamente',
        },
      },
      required: [
        'insuredStatus',
        'gracePeriodStatus',
        'gracePeriods',
        'analysisConclusion',
        'graceExtensionDueToInvoluntaryUnemployment',
        'requestToExtendGracePeriod',
      ],
    };
  }

  private getTemporaryDisabilityBenefitsGrantCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        isEligibleForTemporaryDisabilityBenefits: {
          type: 'boolean',
          description:
            'Indica se o segurado tem direito ao benefício por incapacidade temporária',
        },
        gracePeriodAnalysis: {
          type: 'object',
          description: 'Análise da carência previdenciária',
          properties: {
            totalContribution: {
              type: 'string',
              description:
                'Total de contribuições computadas para fins de carência. Ex: 36 contribuições',
            },
            minimumGracePeriodRequired: {
              type: 'string',
              description:
                'Carência mínima exigida para o benefício. Ex: 12 contribuições',
            },
            status: {
              type: 'boolean',
              description: 'Indica se a carência foi cumprida',
            },
          },
          required: [
            'totalContribution',
            'minimumGracePeriodRequired',
            'status',
          ],
        },
        insuredStatus: {
          type: 'object',
          description: 'Situação de segurado na Data de Início da Incapacidade',
          properties: {
            lastContributionDate: {
              type: 'string',
              description:
                'Data da última contribuição encontrada no CNIS no formato DD/MM/AAAA',
            },
            disabilityStartDate: {
              type: 'string',
              description:
                'Data de Início da Incapacidade (DII) informada no caso no formato DD/MM/AAAA',
            },
            gracePeriod: {
              type: 'boolean',
              description:
                'Indica se o segurado está em período de graça na DII',
            },
            status: {
              type: 'boolean',
              description:
                'Indica se o segurado possui qualidade de segurado na DII',
            },
          },
          required: [
            'lastContributionDate',
            'disabilityStartDate',
            'gracePeriod',
            'status',
          ],
        },
        disabilityAnalysis: {
          type: 'object',
          description:
            'Análise da incapacidade com base nos documentos médicos',
          properties: {
            informedCids: {
              type: 'array',
              description:
                'Lista dos CIDs informados no caso. Cada item deve conter o código CID seguido de hífen e descrição. Ex: ["M51.1 - Degeneração de disco intervertebral", "G43 - Enxaqueca"]',
              items: { type: 'string' },
            },
            preliminaryAnalysis: {
              type: 'string',
              description:
                'Análise preliminar da incapacidade com base nos documentos e CIDs, avaliando gravidade, impacto laboral e perspectivas de concessão',
            },
          },
          required: ['informedCids', 'preliminaryAnalysis'],
        },
        retirementRules: {
          type: 'array',
          description:
            'Lista das regras de aposentadoria que o segurado pode ter direito, caso seja elegível',
          items: {
            type: 'object',
            properties: {
              ruleName: {
                type: 'string',
                description:
                  'Nome da regra de aposentadoria. Ex: Aposentadoria por Idade Urbana',
              },
              fulfilled: {
                type: 'boolean',
                description: 'Indica se os requisitos da regra foram cumpridos',
              },
              retirementDate: {
                type: 'string',
                description:
                  'Data estimada de aposentadoria no formato DD/MM/AAAA, ou vazio se não aplicável',
              },
              expectedRmi: {
                type: 'number',
                description:
                  'RMI (Renda Mensal Inicial) estimada em reais para esta regra de aposentadoria. Calcule com base no histórico de contribuições do CNIS usando a média dos 80% maiores salários de contribuição corrigidos. Nunca use 0 — sempre estime um valor com base nos dados disponíveis.',
              },
              causeValue: {
                type: 'number',
                description:
                  'Valor de causa estimado em reais para fins de uma eventual ação judicial. Calcule como o produto do RMI estimado pelo número de meses de competência (prescrição quinquenal de 60 meses). Nunca use 0 — sempre estime com base nos dados disponíveis.',
              },
              detailedAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada dos requisitos e resultado para esta regra específica. Retorne texto simples sem markdown, sem asteriscos, sem hashtags. Use \\n para separar cada linha. Estruture em três blocos separados por uma linha em branco (\\n\\n): (1) "📊 Requisitos analisados:" seguido de cada requisito em linha separada com "→ ✅" ou "→ ❌"; (2) "💰 Cálculo da RMI:" com cada item em linha separada (média salarial, coeficiente, RMI estimada); (3) "⚠️ Valor da causa:" com cada item em linha separada (DIB, DER, tempo de atraso, valor em R$). Omita blocos cujos dados não estejam disponíveis.',
              },
            },
            required: [
              'ruleName',
              'fulfilled',
              'retirementDate',
              'expectedRmi',
              'causeValue',
              'detailedAnalysis',
            ],
          },
        },
        analysisResult: {
          type: 'string',
          description:
            'Parecer técnico conclusivo completo da análise, incluindo verificação de carência, qualidade de segurado, análise de incapacidade, regras de aposentadoria aplicáveis e recomendações técnicas. Retorne em formato Markdown (use ##, ###, **negrito**, listas com - e parágrafos)',
        },
      },
      required: [
        'isEligibleForTemporaryDisabilityBenefits',
        'gracePeriodAnalysis',
        'insuredStatus',
        'disabilityAnalysis',
        'retirementRules',
        'analysisResult',
      ],
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

  private getSpecialRetirementGrantFirstAnalysisJsonSchema(): object {
    const agentSchema = {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Tipo do agente nocivo. Ex: Ruído, Calor, Químicos',
        },
        intensity: {
          type: 'string',
          description: 'Intensidade/medição (quando houver). Ex: 87dB',
        },
        unit: { type: 'string', description: 'Unidade da medição. Ex: dB, °C' },
        habitual: {
          type: 'boolean',
          description: 'Exposição habitual.',
        },
        permanence: {
          type: 'boolean',
          description: 'Exposição permanente.',
        },
        source: {
          type: 'string',
          description: 'Fonte da informação. Ex: PPP, LTCAT',
        },
        epiEficaz: {
          type: 'boolean',
          description:
            'Indica se EPI foi considerado eficaz, quando aplicável.',
        },
      },
      required: ['type'],
    };

    const earningsSchema = {
      type: 'object',
      properties: {
        competence: {
          type: 'string',
          format: 'date',
          description: 'Competência no formato YYYY-MM-DD',
        },
        remuneration: { type: 'string', description: 'Remuneração' },
        indicators: { type: 'string', description: 'Indicadores CNIS' },
        paymentDate: {
          type: 'string',
          format: 'date',
          description: 'Data de pagamento no formato YYYY-MM-DD',
        },
        competenceBelowTheMinimum: {
          type: 'boolean',
          description: 'Indica competência abaixo do mínimo',
        },
      },
      required: [
        'competence',
        'remuneration',
        'indicators',
        'paymentDate',
        'competenceBelowTheMinimum',
      ],
    };

    return {
      type: 'object',
      properties: {
        summary: {
          type: 'object',
          properties: {
            specialTime: {
              type: 'string',
              description: 'Tempo especial. Ex: 23 anos e 4 meses',
            },
            commonTime: {
              type: 'string',
              description: 'Tempo comum. Ex: 12 anos e 3 meses',
            },
            specialGracePeriod: {
              type: 'number',
              description: 'Carência no tempo especial (contribuições)',
            },
            commonGracePeriod: {
              type: 'number',
              description: 'Carência no tempo comum (contribuições)',
            },
            totalTime: {
              type: 'string',
              description: 'Tempo total. Ex: 30 anos e 2 meses',
            },
            totalGracePeriod: {
              type: 'number',
              description: 'Carência total (contribuições)',
            },
          },
          required: [
            'specialTime',
            'commonTime',
            'specialGracePeriod',
            'commonGracePeriod',
            'totalTime',
            'totalGracePeriod',
          ],
        },
        periods: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              employmentRelationshipSource: {
                type: 'string',
                description: 'Origem do vínculo (empregador/vínculo).',
              },
              startDate: {
                type: 'string',
                format: 'date',
                description: 'Data de início do período (YYYY-MM-DD).',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'Data de fim do período (YYYY-MM-DD) ou null.',
              },
              category: {
                type: 'string',
                description: 'Categoria do vínculo.',
              },
              impact: {
                type: 'string',
                description: 'Impacto em tempo. Ex: 2 anos e 3 meses.',
              },
              gracePeriod: {
                type: 'number',
                description: 'Carência do período (contribuições).',
              },
              agents: {
                type: 'array',
                items: agentSchema,
                description: 'Agentes nocivos consolidados por IA.',
              },
              status: {
                type: 'string',
                description: 'Status (valid/pending/invalid).',
              },
              earningsHistory: {
                type: 'array',
                items: earningsSchema,
                description: 'Remunerações do período (CNIS).',
              },
              observations: {
                type: 'array',
                items: { type: 'string' },
                description: 'Observações do período (quando houver).',
              },
            },
            required: [
              'employmentRelationshipSource',
              'startDate',
              'endDate',
              'category',
              'impact',
              'gracePeriod',
              'agents',
              'status',
              'earningsHistory',
            ],
          },
        },
        technicalDiagnosis: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  periodStartDate: { type: 'string', format: 'date' },
                  periodEndDate: { type: 'string', format: 'date' },
                  recognized: { type: 'boolean' },
                  justification: { type: 'string' },
                  legalFramework: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  agents: { type: 'array', items: agentSchema },
                  epiEficaz: { type: 'boolean' },
                  observations: { type: 'array', items: { type: 'string' } },
                },
                required: [
                  'periodStartDate',
                  'periodEndDate',
                  'recognized',
                  'justification',
                  'legalFramework',
                  'agents',
                ],
              },
            },
          },
          required: ['items'],
        },
        integratedTimeline: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  startDate: { type: 'string', format: 'date' },
                  endDate: { type: 'string', format: 'date' },
                  kind: { type: 'string' },
                  label: { type: 'string' },
                },
                required: ['startDate', 'endDate', 'kind', 'label'],
              },
            },
          },
          required: ['items'],
        },
      },
      required: [
        'summary',
        'periods',
        'technicalDiagnosis',
        'integratedTimeline',
      ],
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

  public async getGeneralUrbanRetirementDenialInssDecisionAnalysis(
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

  public async getGeneralUrbanRetirementDenialTimeAcceleratorAnalysis(
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
            this.getGeneralUrbanRetirementDenialTimeAcceleratorAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getGeneralUrbanRetirementDenialFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON;
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS, não realize cálculos salariais além do que for necessário; use estritamente os fornecidos.
- Não incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- Para cada item de \`periods\`, use prioritariamente os dados estruturados já enviados nos arquivos do prompt; não invente valores.
- O campo \`contributionAverage\` representa a média das remunerações do período já informada nos dados estruturados; quando esse valor estiver disponível, reutilize exatamente esse valor.
- Quando o valor de \`contributionAverage\` não estiver presente nos dados estruturados do período, omita esse campo.
- O campo \`competenceBelowTheMinimum\` deve ser \`true\` somente quando houver competências abaixo do mínimo no histórico de remunerações.
- O campo \`isPendency\` deve indicar se o período possui qualquer pendência relevante.
- O campo \`pendencyReason\` só deve ser preenchido quando realmente existir pendência no período.

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
                this.getGeneralUrbanRetirementDenialFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getGeneralUrbanRetirementDenialPppAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de categoria, motivo de pendência e consideração do período.
- Cada item do array \`periods\` deve ser compatível com a criação de um período na análise de indeferimento de aposentadoria urbana comum.
- Preencha \`endDate\`, \`pendencyReason\`, \`typeOfContribution\`, \`contributionAverage\` e \`periodConsideration\` somente quando essas informações estiverem disponíveis nos documentos analisados.
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
            this.getGeneralUrbanRetirementDenialPppAnalysisJsonSchema(),
        }),
      }),
    );
  }

  private getGeneralUrbanRetirementDenialPppAnalysisJsonSchema(): object {
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
                  GeneralUrbanRetirementDenialPeriodCategoryEnum,
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
                  GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
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
              periodConsideration: {
                type: 'string',
                enum: Object.values(
                  GeneralUrbanRetirementDenialPeriodConsiderationEnum,
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

  private getGeneralUrbanRetirementDenialFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        clientData: {
          type: 'object',
          description: 'Dados do segurado extraídos do CNIS.',
          properties: {
            name: { type: 'string', description: 'Nome completo do segurado.' },
            cpf: {
              type: 'string',
              description: 'CPF do segurado. Null se não encontrado.',
            },
            nit: {
              type: 'string',
              description: 'NIT/PIS do segurado. Null se não encontrado.',
            },
            birthDate: {
              type: 'string',
              description:
                'Data de nascimento no formato YYYY-MM-DD. Null se não encontrada.',
            },
          },
          required: ['name', 'cpf', 'nit', 'birthDate'],
        },
        timeSummary: {
          type: 'object',
          description:
            'Resumo do tempo de contribuição e carência apurados por cenário.',
          properties: {
            contributionTime: {
              type: 'object',
              description: 'Tempo de contribuição em cada cenário.',
              properties: {
                withoutResolvingPendencies: {
                  type: 'string',
                  description:
                    'Tempo sem resolver pendências. Ex: 23 anos e 4 meses.',
                },
                resolvingPendencies: {
                  type: 'string',
                  description:
                    'Tempo resolvendo todas as pendências. Ex: 27 anos e 8 meses.',
                },
                withTimeAccelerators: {
                  type: 'string',
                  description:
                    'Tempo com aceleradores de tempo. Ex: 30 anos e 2 meses.',
                },
              },
              required: [
                'withoutResolvingPendencies',
                'resolvingPendencies',
                'withTimeAccelerators',
              ],
            },
            gracePeriod: {
              type: 'object',
              description:
                'Carência (número de contribuições) em cada cenário.',
              properties: {
                withoutResolvingPendencies: {
                  type: 'string',
                  description:
                    'Contribuições sem resolver pendências. Ex: 156 contribuições.',
                },
                resolvingPendencies: {
                  type: 'string',
                  description:
                    'Contribuições resolvendo todas as pendências. Ex: 172 contribuições.',
                },
                withTimeAccelerators: {
                  type: 'string',
                  description:
                    'Contribuições com aceleradores de tempo. Ex: 180 contribuições.',
                },
              },
              required: [
                'withoutResolvingPendencies',
                'resolvingPendencies',
                'withTimeAccelerators',
              ],
            },
          },
          required: ['contributionTime', 'gracePeriod'],
        },
        periods: {
          type: 'array',
          description: 'Lista de períodos de contribuição analisados.',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Nome do vínculo ou empregador.',
              },
              startDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de início do período no formato YYYY-MM-DD.',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description:
                  'Data de fim do período no formato YYYY-MM-DD. Null se ainda em aberto.',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantCategoryEnum,
                ),
                description: 'Categoria do per�odo',
              },
              workType: {
                type: 'string',
                enum: ['URBAN', 'RURAL'],
                description: 'Tipo de trabalho do período.',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o período possui pendência.',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description:
                  'Indica se há competências com valor abaixo do mínimo.',
              },
              pendencyReason: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pend�ncia, se houver',
              },
              impact: {
                type: 'string',
                description: 'Impacto em tempo. Ex: 2 anos e 3 meses.',
              },
              periodConsideration: {
                type: 'string',
                enum: ['SIM', 'NAO', 'PROVISORIO'],
                description: 'Indicação de consideração do período.',
              },
              contributionAverage: {
                type: 'number',
                description:
                  'Média de contribuição do período. Omitir quando não disponível.',
              },
              earningsHistory: {
                type: 'array',
                description: 'Histórico de remunerações do período.',
                items: {
                  type: 'object',
                  properties: {
                    competence: {
                      type: 'string',
                      description: 'Competência no formato YYYY-MM-DD.',
                    },
                    value: {
                      type: 'string',
                      description: 'Valor da remuneração como string.',
                    },
                  },
                  required: ['competence', 'value'],
                },
              },
            },
            required: [
              'name',
              'startDate',
              'endDate',
              'workType',
              'isPendency',
              'competenceBelowTheMinimum',
              'earningsHistory',
            ],
          },
        },
      },
      required: ['clientData', 'timeSummary', 'periods'],
    };
  }

  private getGeneralUrbanRetirementDenialTimeAcceleratorAnalysisJsonSchema(): object {
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
                enum: ['PROVAVEL', 'IMPROVAVEL'],
                description: 'Probabilidade de reconhecimento no INSS',
              },
              recognitionJudicial: {
                type: 'string',
                enum: ['FAVORAVEL', 'DESFAVORAVEL', 'NAO'],
                description: 'Probabilidade de reconhecimento judicial',
              },
              viability: {
                type: 'string',
                enum: ['ALTA', 'MEDIA', 'BAIXA'],
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

  public async getGeneralUrbanRetirementDenialResultAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- O campo \`completeAnalysisDownload\` deve conter HTML completo e bem formatado com toda a análise detalhada, pronto para conversão em PDF.
- O campo \`analysisResult\` deve conter um texto explicativo completo sobre o resultado da análise e as perspectivas processuais do caso.
- Não incluir tag <br> na resposta no campo \`analysisResult\`.

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
            this.getGeneralUrbanRetirementDenialResultAnalysisJsonSchema(),
        }),
      }),
    );
  }

  private getGeneralUrbanRetirementDenialResultAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        clientData: {
          type: 'object',
          description: 'Dados do segurado extraídos do CNIS.',
          properties: {
            name: {
              type: 'string',
              description: 'Nome completo do segurado.',
            },
            federalDocument: {
              type: 'string',
              description: 'CPF do segurado no formato XXX.XXX.XXX-XX.',
            },
            lastAffiliationDate: {
              type: 'string',
              format: 'date',
              description:
                'Data da última filiação no formato YYYY-MM-DD. Null se não encontrada.',
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description:
                'Data de nascimento no formato YYYY-MM-DD. Null se não encontrada.',
            },
            gender: {
              type: 'string',
              description: 'Sexo do segurado. Ex: Masculino ou Feminino.',
            },
          },
          required: ['name', 'federalDocument', 'gender'],
        },
        retirementRules: {
          type: 'array',
          description:
            'Resumo de regras aplicáveis para aposentadoria urbana comum (RGPS).',
          items: {
            type: 'object',
            properties: {
              retirementRuleName: {
                type: 'string',
                description: 'Nome da regra de aposentadoria.',
              },
              isEligible: {
                type: 'boolean',
                description: 'Indica se o segurado atingiu o direito.',
              },
              eligibilityAvailableAt: {
                type: 'string',
                format: 'date',
                description:
                  'Data do direito no formato YYYY-MM-DD. Null se não atingido ou não calculável.',
              },
              expectedMonthlyBenefit: {
                type: 'number',
                description: 'RMI prevista em reais.',
              },
              isBestRmi: {
                type: 'boolean',
                description: 'Indica se esta regra possui a melhor RMI.',
              },
              isHighestCauseValue: {
                type: 'boolean',
                description:
                  'Indica se esta regra possui o maior valor de causa.',
              },
              retirementAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada desta regra de aposentadoria, incluindo requisitos, cálculo da RMI e valor da causa.',
              },
            },
            required: [
              'retirementRuleName',
              'isEligible',
              'expectedMonthlyBenefit',
              'isBestRmi',
              'isHighestCauseValue',
              'retirementAnalysis',
            ],
          },
        },
        analysisResult: {
          type: 'string',
          description:
            'Texto explicativo completo sobre o resultado da análise, perspectivas processuais e recomendações para o caso de indeferimento.',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'Conteúdo HTML completo e bem formatado com toda a análise detalhada, pronto para conversão em PDF.',
        },
      },
      required: [
        'clientData',
        'retirementRules',
        'analysisResult',
        'completeAnalysisDownload',
      ],
    };
  }
}
