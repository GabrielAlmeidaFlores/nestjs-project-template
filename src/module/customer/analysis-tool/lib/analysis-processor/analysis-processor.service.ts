import { Inject, Injectable } from '@nestjs/common';

import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { DeathBenefitGrantCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-category.enum';
import { DeathBenefitGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-pendency-reason.enum';
import { DeathBenefitGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-inss.enum';
import { DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-judicial.enum';
import { DeathBenefitGrantTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-viability.enum';
import { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-category.enum';
import { DeathBenefitRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-pendency-reason.enum';
import { DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-inss.enum';
import { DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-judicial.enum';
import { DeathBenefitRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-viability.enum';
import { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import { DisabilityRetirementPlanningGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-consideration.enum';
import { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningGrantViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-viability.enum';
import { DisabilityRetirementPlanningRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-category.enum';
import { DisabilityRetirementPlanningRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-consideration.enum';
import { DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pcd-status.enum';
import { DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pendency-reason.enum';
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
- A anï¿½lise tï¿½cnica deve se basear prioritariamente na anï¿½lise jï¿½ processada do CNIS em formato JSON;
- Calcule somente os valores que nï¿½o estiverem presentes na anï¿½lise jï¿½ fornecida do CNIS, nï¿½o realize calculos como valores salï¿½riais, use estritamente os fornecidos.
- Nï¿½o incluir tag <br> na resposta.
Para a Seï¿½ï¿½o 6 (Cï¿½LCULOS), siga rigorosamente as instruï¿½ï¿½es abaixo:
1. Para cï¿½lculos ja efetuados, nï¿½o calcule novamente, use os valores fornecidos na anï¿½lise do CNIS.
2. Garanta precisï¿½o absoluta nos cï¿½lculos numï¿½ricos e de datas que precisar fazer.
3. Formate todos os valores monetï¿½rios no padrï¿½o brasileiro: prefixo "R$ ", milhar com ponto e decimal com vï¿½rgula (ex.: R$ 1.234,56).

Anï¿½lise processada do CNIS:
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
                  'Tempo total de contribuiï¿½ï¿½o de serviï¿½o. Exemplo: 44 anos, 3 meses e 12 dias',
              },
              publicServiceContributionTime: {
                type: 'string',
                description:
                  'Tempo total de contribuiï¿½ï¿½o em serviï¿½o pï¿½blico. Exemplo: 30 anos, 2 meses e 5 dias',
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
                description: 'Profissï¿½o do segurado',
              },
              totalCareerTime: {
                type: 'string',
                description:
                  'Tempo total de carreira. Exemplo: 50 anos, 1 mï¿½s e 20 dias',
              },
              publicServiceStartDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de ingresso no serviï¿½o pï¿½blico',
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
                        'Indica se a regra oferece o maior valor no cenï¿½rio mais vantajoso',
                    },
                    retirementAnalysis: {
                      type: 'string',
                      description:
                        'Anï¿½lise detalhada da aposentadoria em formato markdown',
                    },
                    isEligible: {
                      type: 'boolean',
                      description:
                        'Indica se o segurado ï¿½ elegï¿½vel para a regra',
                    },
                    eligibilityAvailableAt: {
                      type: 'string',
                      description:
                        'Data em que o segurado se tornarï¿½ elegï¿½vel para a regra, se aplicï¿½vel',
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
                      'Tempo total de contribuiï¿½ï¿½o. Exemplo: 29 anos e 3 meses',
                  },
                  publicServiceTime: {
                    type: 'string',
                    description:
                      'Tempo no serviï¿½o pï¿½blico. Exemplo: 25 anos e 1 mï¿½s',
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
                      'Lista de perï¿½odos de atividade especial analisados',
                    items: {
                      type: 'object',
                      properties: {
                        label: {
                          type: 'string',
                          description: 'Rï¿½tulo descritivo do perï¿½odo',
                        },
                        start: {
                          type: 'string',
                          description: 'Data de inï¿½cio no formato YYYY-MM-DD',
                        },
                        end: {
                          type: 'string',
                          description:
                            'Data de tï¿½rmino no formato YYYY-MM-DD',
                        },
                        recognized: {
                          type: 'boolean',
                          description:
                            'Indica se o perï¿½odo foi reconhecido como atividade especial',
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
                          description: 'Cargo/funï¿½ï¿½o exercida',
                        },
                        employmentLinkStartDate: {
                          type: 'string',
                          description: 'Data de inï¿½cio do vï¿½nculo',
                        },
                        employmentLinkEndDate: {
                          type: 'string',
                          description: 'Data de tï¿½rmino do vï¿½nculo',
                        },
                        employmentLinkSupportingDocument: {
                          type: 'string',
                          description: 'Documento comprobatï¿½rio do vï¿½nculo',
                        },
                        employmentLinkPresentInCNIS: {
                          type: 'boolean',
                          description: 'Indica se o vï¿½nculo consta no CNIS',
                        },
                        employmentLinkEarningsInCNIS: {
                          type: 'boolean',
                          description:
                            'Indica se há remunerações registradas no CNIS',
                        },
                        harmfulAgentsHasAny: {
                          type: 'boolean',
                          description:
                            'Indica se hï¿½ agentes nocivos identificados',
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
                            'Indica se havia EPI (Equipamento de Proteï¿½ï¿½o Individual) eficaz',
                        },
                        legalFrameworkOccupationalCategoryDecree: {
                          type: 'string',
                          description:
                            'Decreto aplicï¿½vel ï¿½ categoria profissional',
                        },
                        legalFrameworkOccupationalCategoryCode: {
                          type: 'string',
                          description: 'Cï¿½digo da categoria profissional',
                        },
                        legalFrameworkOccupationalCategoryDescription: {
                          type: 'string',
                          description:
                            'Descriï¿½ï¿½o da categoria profissional',
                        },
                        legalFrameworkHarmfulAgentDecree: {
                          type: 'string',
                          description: 'Decreto aplicï¿½vel ao agente nocivo',
                        },
                        legalFrameworkHarmfulAgentCode: {
                          type: 'string',
                          description: 'Cï¿½digo do agente nocivo',
                        },
                        legalFrameworkHarmfulAgentDescription: {
                          type: 'string',
                          description: 'Descriï¿½ï¿½o do agente nocivo',
                        },
                        legalFrameworkCaseLawOrTechnicalStandardReference: {
                          type: 'string',
                          description: 'Referï¿½ncia da jurisprudï¿½ncia/norma',
                        },
                        legalFrameworkCaseLawOrTechnicalStandardCode: {
                          type: 'string',
                          description: 'Cï¿½digo da norma tï¿½cnica',
                        },
                        legalFrameworkCaseLawOrTechnicalStandardDescription: {
                          type: 'string',
                          description: 'Descriï¿½ï¿½o da norma tï¿½cnica',
                        },
                        technicalConclusionSpecialTimeRecognized: {
                          type: 'boolean',
                          description:
                            'Indica se o tempo especial foi reconhecido',
                        },
                        technicalConclusionJustification: {
                          type: 'string',
                          description: 'Justificativa da conclusï¿½o tï¿½cnica',
                        },
                        additionalNotes: {
                          type: 'string',
                          description: 'Observaï¿½ï¿½es adicionais relevantes',
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
                    description: 'Anï¿½lise completa em formato markdown',
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
- A anï¿½lise tï¿½cnica deve se basear prioritariamente na anï¿½lise jï¿½ processada do CNIS em formato JSON;
- Calcule somente os valores que nï¿½o estiverem presentes na anï¿½lise jï¿½ fornecida do CNIS, nï¿½o realize calculos como valores salï¿½riais, use estritamente os fornecidos.
- Nï¿½o incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatï¿½vel com o schema solicitado.
- Para cada item de \`periods\`, use prioritariamente os dados estruturados jï¿½ enviados nos arquivos do prompt; nï¿½o invente valores.
- O campo \`contributionAverage\` representa a mï¿½dia das remuneraï¿½ï¿½es do perï¿½odo jï¿½ informada nos dados estruturados; quando esse valor estiver disponï¿½vel, reutilize exatamente esse valor e nï¿½o retorne \`0\`.
- O campo \`contributionAverage\` nï¿½o ï¿½ uma lista de contribuiï¿½ï¿½es e nï¿½o deve ser calculado como soma zerada por ausï¿½ncia de detalhamento mensal.
- Quando o valor de \`contributionAverage\` nï¿½o estiver presente nos dados estruturados do perï¿½odo, omita esse campo em vez de retornar \`0\`.
- O campo \`belowMinimumContributions\` deve conter somente as competï¿½ncias cujos valores ficaram abaixo do mï¿½nimo.
- Nï¿½o liste em \`belowMinimumContributions\` contribuiï¿½ï¿½es que nï¿½o estejam abaixo do mï¿½nimo.
- Quando nï¿½o houver competï¿½ncias abaixo do mï¿½nimo, retorne \`belowMinimumContributions: []\`.
- O campo \`competenceBelowTheMinimum\` deve ser \`true\` somente quando houver ao menos um item em \`belowMinimumContributions\`; caso contrï¿½rio, deve ser \`false\`.
- O campo \`isPendency\` deve indicar se o perï¿½odo possui qualquer pendï¿½ncia relevante.
- O campo \`reasonPendency\` sï¿½ deve ser preenchido quando realmente existir pendï¿½ncia no perï¿½odo.
- O campo \`statusPCD\` sï¿½ deve ser preenchido nos perï¿½odos em que houve deficiï¿½ncia reconhecida no perï¿½odo; nos demais, omita o campo.

Anï¿½lise processada do CNIS:
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
- A anÃ¡lise tÃ©cnica deve se basear prioritariamente na anÃ¡lise jÃ¡ processada do CNIS em formato JSON;
- Calcule somente os valores que nÃ£o estiverem presentes na anÃ¡lise jÃ¡ fornecida do CNIS, nÃ£o realize cÃ¡lculos salariais alÃ©m do que for necessÃ¡rio; use estritamente os fornecidos.
- NÃ£o incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatÃ­vel com o schema solicitado.
- Para cada item de \`periods\`, use prioritariamente os dados estruturados jÃ¡ enviados nos arquivos do prompt; nÃ£o invente valores.
- O campo \`agents\` NÃƒO vem do CNIS analisado; extraia e consolide agentes nocivos a partir dos documentos anexados (PPP, LTCAT, etc.) e devolva no formato estruturado.

AnÃ¡lise processada do CNIS:
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
- A anï¿½lise tï¿½cnica deve se basear prioritariamente na anï¿½lise jï¿½ processada do CNIS em formato JSON;
- Calcule somente os valores que nï¿½o estiverem presentes na anï¿½lise jï¿½ fornecida do CNIS, nï¿½o realize calculos como valores salï¿½riais, use estritamente os fornecidos.
- Nï¿½o incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatï¿½vel com o schema solicitado.

Anï¿½lise processada do CNIS:
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
- Retorne estritamente um objeto JSON compatï¿½vel com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de reconhecimento e viabilidade.
- Cada item de \`timeAccelerators\` deve ser compatï¿½vel com a criaï¿½ï¿½o de um perï¿½odo de acelerador de tempo.
- Preencha \`technicalNote\`, \`startDate\`, \`endDate\` e \`institution\` quando essas informaï¿½ï¿½es estiverem disponï¿½veis nos documentos analisados.
- Nï¿½o incluir tag <br> na resposta.
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
                description: 'Lista de itens de conversï¿½o de tempo especial',
                items: {
                  type: 'object',
                  properties: {
                    originJobTitleDescription: {
                      type: 'string',
                      description:
                        'Descriï¿½ï¿½o do cargo/funï¿½ï¿½o de origem',
                    },
                    periodDateRangeText: {
                      type: 'string',
                      description:
                        'Texto descritivo do perï¿½odo (ex: 01/2010 a 12/2015)',
                    },
                    harmfulExposureAgentsText: {
                      type: 'string',
                      description:
                        'Descriï¿½ï¿½o dos agentes nocivos identificados',
                    },
                    specialTimeDurationText: {
                      type: 'string',
                      description:
                        'Duraï¿½ï¿½o do tempo especial em formato textual',
                    },
                    convertedTimeDurationText: {
                      type: 'string',
                      description:
                        'Duraï¿½ï¿½o do tempo convertido em formato textual',
                    },
                    conversionFactorValue: {
                      type: 'number',
                      description:
                        'Fator de conversï¿½o aplicado (ex: 1.4, 1.2)',
                    },
                    recognitionStatusEnum: {
                      type: 'string',
                      description:
                        'Status de reconhecimento do perï¿½odo especial',
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
                description: 'Lista de regras previdenciï¿½rias analisadas',
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
                      description:
                        'Indica se ï¿½ a melhor opï¿½ï¿½o financeira',
                    },
                    ruleDetailedExplanationText: {
                      type: 'string',
                      description: 'Explicaï¿½ï¿½o detalhada da regra',
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
                  'Tipo de anÃ¡lise mais recomendada para o perfil do cliente com base nas informaï¿½ï¿½es recebidas',
              },
              benefitDescription: {
                type: 'string',
                description:
                  'DescriÃ§Ã£o do benefÃ­cio previdenciÃ¡rio mais indicado',
                nullable: true,
              },
              attentionNote: {
                type: 'string',
                description:
                  'ObservaÃ§Ã£o de atenÃ§Ã£o ou alerta importante para o caso',
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
- Retorne estritamente um objeto JSON compatï¿½vel com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de categoria, grau de deficiï¿½ncia, motivo de pendï¿½ncia e consideraï¿½ï¿½o do perï¿½odo.
- Cada item do array \`periods\` deve ser compatï¿½vel com a criaï¿½ï¿½o de um perï¿½odo na anï¿½lise de concessï¿½o de aposentadoria da pessoa com deficiï¿½ncia.
- Preencha \`endDate\`, \`pendencyReason\`, \`typeOfContribution\`, \`contributionAverage\`, \`disabilityStatus\` e \`periodConsideration\` somente quando essas informaï¿½ï¿½es estiverem disponï¿½veis nos documentos analisados.
- Nï¿½o incluir tag <br> na resposta.
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

  public async getDeathBenefitGrantTimeAcceleratorAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Retorne estritamente um objeto JSON compatÃ­vel com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de reconhecimento e viabilidade.
- Cada item de \`timeAccelerators\` deve ser compatÃ­vel com a criaÃ§Ã£o de um perÃ­odo de acelerador de tempo.
- Preencha \`technicalNote\`, \`startDate\`, \`endDate\` e \`institution\` quando essas informaÃ§Ãµes estiverem disponÃ­veis nos documentos analisados.
- NÃ£o incluir tag <br> na resposta.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getDeathBenefitGrantTimeAcceleratorAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getDeathBenefitGrantFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A anÃ¡lise tÃ©cnica deve se basear prioritariamente na anÃ¡lise jÃ¡ processada do CNIS em formato JSON;
- Calcule somente os valores que nÃ£o estiverem presentes na anÃ¡lise jÃ¡ fornecida do CNIS, nÃ£o realize calculos como valores salariais, use estritamente os fornecidos.
- NÃ£o incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatÃ­vel com o schema solicitado.
- Para cada item de \`periods\`, use prioritariamente os dados estruturados jÃ¡ enviados nos arquivos do prompt; nÃ£o invente valores.
- O campo \`contributionAverage\` representa a mÃ©dia das remuneraÃ§Ãµes do perÃ­odo jÃ¡ informada nos dados estruturados; quando esse valor estiver disponÃ­vel, reutilize exatamente esse valor e nÃ£o retorne \`0\`.
- O campo \`contributionAverage\` nÃ£o Ã© uma lista de contribuiÃ§Ãµes e nÃ£o deve ser calculado como soma zerada por ausÃªncia de detalhamento mensal.
- Quando o valor de \`contributionAverage\` nÃ£o estiver presente nos dados estruturados do perÃ­odo, omita esse campo em vez de retornar \`0\`.
- O campo \`belowMinimumContributions\` deve conter somente as competÃªncias cujos valores ficaram abaixo do mÃ­nimo.
- NÃ£o liste em \`belowMinimumContributions\` contribuiÃ§Ãµes que nÃ£o estejam abaixo do mÃ­nimo.
- Quando nÃ£o houver competÃªncias abaixo do mÃ­nimo, retorne \`belowMinimumContributions: []\`.
- O campo \`competenceBelowTheMinimum\` deve ser \`true\` somente quando houver ao menos um item em \`belowMinimumContributions\`; caso contrÃ¡rio, deve ser \`false\`.
- O campo \`isPendency\` deve indicar se o perÃ­odo possui qualquer pendÃªncia relevante.
- O campo \`reasonPendency\` sÃ³ deve ser preenchido quando realmente existir pendÃªncia no perÃ­odo.
- Analise a qualidade de segurado do instituidor falecido com base nos perÃ­odos e data do Ã³bito.
- Analise o direito Ã  aposentadoria programada do instituidor falecido antes do Ã³bito.
- Analise o direito Ã  aposentadoria por incapacidade permanente do instituidor falecido.
- Analise a comprovaÃ§Ã£o da qualidade de dependente de cada dependente com base nos documentos anexados.
- Para cada regra de aposentadoria aplicÃ¡vel ao instituidor falecido, retorne o resumo com resultado, data do direito, RMI prevista, e a anÃ¡lise detalhada.
AnÃ¡lise processada do CNIS:
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
              jsonSchema: this.getDeathBenefitGrantFirstAnalysisJsonSchema(),
            })
          : null,
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
- A anÃ¡lise tÃ©cnica deve se basear prioritariamente na anÃ¡lise jÃ¡ processada do CNIS em formato JSON.
- Calcule somente os valores que nÃ£o estiverem presentes na anÃ¡lise jÃ¡ fornecida do CNIS.
- NÃ£o incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatÃ­vel com o schema solicitado.

AnÃ¡lise processada do CNIS:
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

  public async getDeathBenefitGrantResultAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A anÃ¡lise tÃ©cnica deve se basear prioritariamente na anÃ¡lise jÃ¡ processada do CNIS em formato JSON.
- Calcule somente os valores que nÃ£o estiverem presentes na anÃ¡lise jÃ¡ fornecida do CNIS; nÃ£o realize cÃ¡lculos como valores salariais, use estritamente os fornecidos.
- NÃ£o incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatÃ­vel com o schema solicitado.

AnÃ¡lise processada do CNIS:
  ${cnisAnalysisJson}
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: this.getDeathBenefitGrantResultAnalysisJsonSchema(),
        }),
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
- A anÃ¡lise tÃ©cnica deve se basear prioritariamente na anÃ¡lise jÃ¡ processada do CNIS em formato JSON.
- Calcule somente os valores que nÃ£o estiverem presentes na anÃ¡lise jÃ¡ fornecida do CNIS.
- NÃ£o incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatÃ­vel com o schema solicitado.

AnÃ¡lise processada do CNIS:
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

  public async getDeathBenefitGrantSimplifiedAnalysis(
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

  public async getDeathBenefitRejectionInssDecisionAnalysis(
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

  public async getDeathBenefitRejectionTimeAcceleratorAnalysis(
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
            this.getDeathBenefitRejectionTimeAcceleratorAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getDeathBenefitRejectionFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON;
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS, não realize calculos como valores salariais, use estritamente os fornecidos.
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
- Analise a qualidade de segurado do instituidor falecido com base nos períodos e data do óbito.
- Analise o direito à aposentadoria programada do instituidor falecido antes do óbito.
- Analise o direito à aposentadoria por incapacidade permanente do instituidor falecido.
- Analise a comprovação da qualidade de dependente de cada dependente com base nos documentos anexados.
- Para cada regra de aposentadoria aplicável ao instituidor falecido, retorne o resumo com resultado, data do direito, RMI prevista, e a análise detalhada.
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
                this.getDeathBenefitRejectionFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getDeathBenefitRejectionResultAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS; não realize cálculos como valores salariais, use estritamente os fornecidos.
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
          jsonSchema: this.getDeathBenefitRejectionResultAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getDeathBenefitRejectionSimplifiedAnalysis(
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
- Retorne estritamente um objeto JSON compatÃ­vel com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de reconhecimento e viabilidade.
- Cada item de \`timeAccelerators\` deve ser compatÃ­vel com a criaÃ§Ã£o de um perÃ­odo de acelerador de tempo.
- Preencha \`technicalNote\`, \`startDate\`, \`endDate\` e \`institution\` quando essas informaÃ§Ãµes estiverem disponÃ­veis nos documentos analisados.
- NÃ£o incluir tag <br> na resposta.
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
- A anÃ¡lise tÃ©cnica deve se basear prioritariamente na anÃ¡lise jÃ¡ processada do CNIS em formato JSON;
- Calcule somente os valores que nÃ£o estiverem presentes na anÃ¡lise jÃ¡ fornecida do CNIS, nÃ£o realize cÃ¡lculos salariais alÃ©m do que for necessÃ¡rio; use estritamente os fornecidos.
- NÃ£o incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatÃ­vel com o schema solicitado.
- Para cada item de \`periods\`, use prioritariamente os dados estruturados jÃ¡ enviados nos arquivos do prompt; nÃ£o invente valores.
- O campo \`contributionAverage\` representa a mÃ©dia das remuneraÃ§Ãµes do perÃ­odo jÃ¡ informada nos dados estruturados; quando esse valor estiver disponÃ­vel, reutilize exatamente esse valor.
- Quando o valor de \`contributionAverage\` nÃ£o estiver presente nos dados estruturados do perÃ­odo, omita esse campo.
- O campo \`competenceBelowTheMinimum\` deve ser \`true\` somente quando houver competÃªncias abaixo do mÃ­nimo no histÃ³rico de remuneraÃ§Ãµes.
- O campo \`isPendency\` deve indicar se o perÃ­odo possui qualquer pendÃªncia relevante.
- O campo \`pendencyReason\` sÃ³ deve ser preenchido quando realmente existir pendÃªncia no perÃ­odo.
- O campo \`earningsHistory\` de cada perÃ­odo deve conter APENAS as competÃªncias com pendÃªncia, classificadas por \`pendencyType\`:\n  - \`COMPETENCE_BELOW_MINIMUM\`: remuneraÃ§Ã£o abaixo do salÃ¡rio mÃ­nimo vigente na competÃªncia;\n  - \`NO_EXIT_DATE\`: competÃªncias registradas apÃ³s a data em que o perÃ­odo deveria ter encerrado (perÃ­odo sem data de saÃ­da no CNIS);\n  - \`LATE_CONTRIBUTION\`: contribuiÃ§Ã£o recolhida fora do prazo — preencher \`collectedAt\` com a data real do recolhimento.\n  NÃ£o inclua competÃªncias sem pendÃªncia. Retorne array vazio quando nÃ£o houver nenhuma.

AnÃ¡lise processada do CNIS:
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
- Retorne estritamente um objeto JSON compatÃ­vel com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de categoria, motivo de pendÃªncia e consideraÃ§Ã£o do perÃ­odo.
- Cada item do array \`periods\` deve ser compatÃ­vel com a criaÃ§Ã£o de um perÃ­odo na anÃ¡lise de indeferimento de aposentadoria urbana comum.
- Preencha \`endDate\`, \`pendencyReason\`, \`typeOfContribution\`, \`contributionAverage\` e \`periodConsideration\` somente quando essas informaÃ§Ãµes estiverem disponÃ­veis nos documentos analisados.
- NÃ£o incluir tag <br> na resposta.
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

  public async getGeneralUrbanRetirementDenialResultAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A anÃ¡lise tÃ©cnica deve se basear prioritariamente na anÃ¡lise jÃ¡ processada do CNIS em formato JSON.
- Retorne estritamente um objeto JSON compatÃ­vel com o schema solicitado.
- O campo \`completeAnalysisDownload\` deve conter HTML completo e bem formatado com toda a anÃ¡lise detalhada, pronto para conversÃ£o em PDF.
- O campo \`analysisResult\` deve conter um texto explicativo completo sobre o resultado da anÃ¡lise e as perspectivas processuais do caso.
- NÃ£o incluir tag <br> na resposta no campo \`analysisResult\`.

AnÃ¡lise processada do CNIS:
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

  public async getGeneralUrbanRetirementDenialSimplifiedAnalysis(
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

  public async getDisabilityRetirementPlanningRejectionInssDecisionAnalysis(
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

  public async getDisabilityRetirementPlanningRejectionTimeAcceleratorAnalysis(
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
            this.getDisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getDisabilityRetirementPlanningRejectionFirstAnalysis(
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
- O campo \`earningsHistory\` de cada período deve conter APENAS as competências com pendência, classificadas por \`pendencyType\`:\n  - \`COMPETENCE_BELOW_MINIMUM\`: remuneração abaixo do salário mínimo vigente na competência;\n  - \`NO_EXIT_DATE\`: competências registradas após a data em que o período deveria ter encerrado (período sem data de saída no CNIS);\n  - \`LATE_CONTRIBUTION\`: contribuição recolhida fora do prazo — preencher \`collectedAt\` com a data real do recolhimento.\n  Não inclua competências sem pendência. Retorne array vazio quando não houver nenhuma.

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
                this.getDisabilityRetirementPlanningRejectionFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getDisabilityRetirementPlanningRejectionPppAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- Use exclusivamente os valores de enum fornecidos no schema para os campos de categoria, motivo de pendência e consideração do período.
- Cada item do array \`periods\` deve ser compatível com a criação de um período na análise de indeferimento de aposentadoria da pessoa com deficiência.
- Preencha \`endDate\`, \`pendencyReason\`, \`typeOfContribution\`, \`contributionAverage\`, \`periodConsideration\` e \`pcdStatus\` somente quando essas informações estiverem disponíveis nos documentos analisados.
- O campo \`pcdStatus\` indica o grau de deficiência do segurado no período (LEVE, MODERADO ou GRAVE), se identificado no PPP.
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
            this.getDisabilityRetirementPlanningRejectionPppAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getDisabilityRetirementPlanningRejectionResultAnalysis(
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
            this.getDisabilityRetirementPlanningRejectionResultAnalysisJsonSchema(),
        }),
      }),
    );
  }
  public async getBpcElderlyAnalysisCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente nos dados fornecidots
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- O campo \`completeAnalysisDownload\` deve conter HTML completo e bem formatado com toda a análise detalhada, pronto para conversão em PDF.
- Os demais campos deve ser respeitarem as descrições e orientações do schema, utilizando os dados fornecidos e evitando a inclusão de informações não suportadas pelos arquivos anexados.  
`;
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: this.getBpcElderlyAnalysisCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getDisabilityRetirementPlanningRejectionSimplifiedAnalysis(
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

  public async getBpcElderlyAnalysisSimplifiedAnalysis(
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

  public async getAccidentAssistanceTerminatedCompleteAnalysis(
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
            this.getAccidentAssistanceTerminatedCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getAccidentAssistanceTerminatedSimplifiedAnalysis(
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

  public async getAccidentAssistanceTerminatedDecisionDetails(
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
            this.getAccidentAssistanceTerminatedDecisionDetailsJsonSchema(),
        }),
      }),
    );
  }

  public async getAccidentAssistanceTerminatedFirstAnalysis(
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
            this.getAccidentAssistanceTerminatedFirstAnalysisJsonSchema(),
        }),
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
            'Indica se o falecido possuÃ­a qualidade de segurado na data do Ã³bito.',
        },
        insuredStatusSummary: {
          type: 'string',
          description:
            'Resumo curto e direto sobre a qualidade de segurado do falecido. Deve ser texto simples, sem formataÃ§Ã£o markdown, sem asteriscos, sem hashtags, sem tabelas. MÃ¡ximo de 255 caracteres.',
        },
        isRetirementRightConfirmed: {
          type: 'boolean',
          description:
            'Indica se o falecido havia cumprido requisitos para ao menos uma regra de aposentadoria.',
        },
        retirementRightSummary: {
          type: 'string',
          description:
            'Resumo curto e direto sobre o direito Ã  aposentadoria do falecido no momento do Ã³bito. Deve ser texto simples, sem formataÃ§Ã£o markdown, sem asteriscos, sem hashtags, sem tabelas. MÃ¡ximo de 255 caracteres.',
        },
        completeAnalysis: {
          type: 'string',
          description:
            'AnÃ¡lise completa e detalhada em formato Markdown. Deve conter: (1) anÃ¡lise da qualidade de segurado e carÃªncia; (2) situaÃ§Ã£o dos dependentes; (3) regras de aposentadoria verificadas; (4) parecer tÃ©cnico conclusivo com recomendaÃ§Ãµes. Use tÃ­tulos (##), negrito (**), listas (-) e parÃ¡grafos para estruturar o texto.',
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
                  'Data em que o requisito foi ou seria cumprido, no formato YYYY-MM-DD. Null se nÃ£o aplicÃ¡vel.',
              },
              estimatedRmi: {
                type: 'number',
                description:
                  'Valor decimal da RMI estimada para essa regra. Null se nÃ£o calculÃ¡vel.',
              },
              isBestRmi: {
                type: 'boolean',
                description:
                  'Indica se esta regra gera a melhor RMI entre todas as regras.',
              },
              isHighestClaimValue: {
                type: 'boolean',
                description:
                  'Indica se esta regra gera o maior valor de benefÃ­cio considerando todas as variÃ¡veis.',
              },
              detailedAnalysis: {
                type: 'string',
                description:
                  'AnÃ¡lise detalhada dos requisitos e resultado para esta regra especÃ­fica. Retorne texto simples sem markdown, sem asteriscos, sem hashtags. Use \\n para separar cada linha. Estruture em trÃªs blocos separados por uma linha em branco (\\n\\n): (1) "ðŸ“Š Requisitos analisados:" seguido de cada requisito em linha separada com "â†’ âœ…" ou "â†’ âŒ"; (2) "ðŸ’° CÃ¡lculo da RMI:" com cada item em linha separada (mÃ©dia salarial, coeficiente, RMI estimada); (3) "âš ï¸ Valor da causa:" com cada item em linha separada (DIB, DER, tempo de atraso, valor em R$). Omita blocos cujos dados nÃ£o estejam disponÃ­veis.',
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
            'Lista das anÃ¡lises de pensÃ£o para cada dependente identificado.',
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
                  'Grau de dependÃªncia (ex: cÃ´njuge, filho menor, pai/mÃ£e).',
              },
              isDependencyVerified: {
                type: 'boolean',
                description:
                  'Indica se a dependÃªncia econÃ´mica ou legal foi verificada.',
              },
              pensionStartDate: {
                type: 'string',
                description:
                  'Data estimada de inÃ­cio da pensÃ£o no formato YYYY-MM-DD. Null se nÃ£o aplicÃ¡vel.',
              },
              estimatedPensionDuration: {
                type: 'string',
                description:
                  'DuraÃ§Ã£o estimada da pensÃ£o em formato curto e direto. Retorne apenas a duraÃ§Ã£o, sem citar artigos de lei ou explicaÃ§Ãµes jurÃ­dicas. Exemplos de formato esperado: "4 meses", "1 ano", "2 anos e 3 meses", "AtÃ© 21 anos", "4 meses ou atÃ© a cessaÃ§Ã£o da condiÃ§Ã£o", "Enquanto durar a invalidez". MÃ¡ximo 50 caracteres.',
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
            'Indica se o segurado possui qualidade de segurado na Data de InÃ­cio da Incapacidade (DII)',
        },
        gracePeriodStatus: {
          type: 'boolean',
          description:
            'Indica se o segurado estÃ¡ em perÃ­odo de graÃ§a na Data de InÃ­cio da Incapacidade (DII)',
        },
        gracePeriods: {
          type: 'array',
          description:
            'Lista de eventos que geraram ou sustentam o perÃ­odo de graÃ§a',
          items: {
            type: 'object',
            properties: {
              event: {
                type: 'string',
                description:
                  'Nome do evento que gerou ou sustenta o perÃ­odo de graÃ§a. Ex: Ãšltimo vÃ­nculo empregatÃ­cio, Desemprego involuntÃ¡rio, Afastamento por doenÃ§a',
              },
              date: {
                type: 'string',
                description: 'Data do evento no formato DD/MM/AAAA',
              },
              observation: {
                type: 'string',
                description:
                  'AnÃ¡lise tÃ©cnica sobre como esse evento impacta o perÃ­odo de graÃ§a',
              },
            },
            required: ['event', 'date', 'observation'],
          },
        },
        analysisConclusion: {
          type: 'string',
          description:
            'ConclusÃ£o tÃ©cnica completa da anÃ¡lise, incluindo carÃªncia, qualidade de segurado, pontos de atenÃ§Ã£o e viabilidade preliminar do benefÃ­cio',
        },
        graceExtensionDueToInvoluntaryUnemployment: {
          type: 'boolean',
          description:
            'Indica se hÃ¡ direito Ã  extensÃ£o do perÃ­odo de graÃ§a em razÃ£o de desemprego involuntÃ¡rio (art. 15, Â§2Âº da Lei 8.213/91)',
        },
        requestToExtendGracePeriod: {
          type: 'boolean',
          description:
            'Indica se Ã© recomendÃ¡vel requerer prorrogaÃ§Ã£o do perÃ­odo de graÃ§a administrativamente',
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
            'Indica se o segurado tem direito ao benefÃ­cio por incapacidade temporÃ¡ria',
        },
        gracePeriodAnalysis: {
          type: 'object',
          description: 'AnÃ¡lise da carÃªncia previdenciÃ¡ria',
          properties: {
            totalContribution: {
              type: 'string',
              description:
                'Total de contribuiÃ§Ãµes computadas para fins de carÃªncia. Ex: 36 contribuiÃ§Ãµes',
            },
            minimumGracePeriodRequired: {
              type: 'string',
              description:
                'CarÃªncia mÃ­nima exigida para o benefÃ­cio. Ex: 12 contribuiÃ§Ãµes',
            },
            status: {
              type: 'boolean',
              description: 'Indica se a carÃªncia foi cumprida',
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
          description:
            'SituaÃ§Ã£o de segurado na Data de InÃ­cio da Incapacidade',
          properties: {
            lastContributionDate: {
              type: 'string',
              description:
                'Data da Ãºltima contribuiÃ§Ã£o encontrada no CNIS no formato DD/MM/AAAA',
            },
            disabilityStartDate: {
              type: 'string',
              description:
                'Data de InÃ­cio da Incapacidade (DII) informada no caso no formato DD/MM/AAAA',
            },
            gracePeriod: {
              type: 'boolean',
              description:
                'Indica se o segurado estÃ¡ em perÃ­odo de graÃ§a na DII',
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
            'AnÃ¡lise da incapacidade com base nos documentos mÃ©dicos',
          properties: {
            informedCids: {
              type: 'array',
              description:
                'Lista dos CIDs informados no caso. Cada item deve conter o cÃ³digo CID seguido de hÃ­fen e descriÃ§Ã£o. Ex: ["M51.1 - DegeneraÃ§Ã£o de disco intervertebral", "G43 - Enxaqueca"]',
              items: { type: 'string' },
            },
            preliminaryAnalysis: {
              type: 'string',
              description:
                'AnÃ¡lise preliminar da incapacidade com base nos documentos e CIDs, avaliando gravidade, impacto laboral e perspectivas de concessÃ£o',
            },
          },
          required: ['informedCids', 'preliminaryAnalysis'],
        },
        retirementRules: {
          type: 'array',
          description:
            'Lista das regras de aposentadoria que o segurado pode ter direito, caso seja elegÃ­vel',
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
                  'Data estimada de aposentadoria no formato DD/MM/AAAA, ou vazio se nÃ£o aplicÃ¡vel',
              },
              expectedRmi: {
                type: 'number',
                description:
                  'RMI (Renda Mensal Inicial) estimada em reais para esta regra de aposentadoria. Calcule com base no histÃ³rico de contribuiÃ§Ãµes do CNIS usando a mÃ©dia dos 80% maiores salÃ¡rios de contribuiÃ§Ã£o corrigidos. Nunca use 0 â€” sempre estime um valor com base nos dados disponÃ­veis.',
              },
              causeValue: {
                type: 'number',
                description:
                  'Valor de causa estimado em reais para fins de uma eventual aÃ§Ã£o judicial. Calcule como o produto do RMI estimado pelo nÃºmero de meses de competÃªncia (prescriÃ§Ã£o quinquenal de 60 meses). Nunca use 0 â€” sempre estime com base nos dados disponÃ­veis.',
              },
              detailedAnalysis: {
                type: 'string',
                description:
                  'AnÃ¡lise detalhada dos requisitos e resultado para esta regra especÃ­fica. Retorne texto simples sem markdown, sem asteriscos, sem hashtags. Use \\n para separar cada linha. Estruture em trÃªs blocos separados por uma linha em branco (\\n\\n): (1) "ðŸ“Š Requisitos analisados:" seguido de cada requisito em linha separada com "â†’ âœ…" ou "â†’ âŒ"; (2) "ðŸ’° CÃ¡lculo da RMI:" com cada item em linha separada (mÃ©dia salarial, coeficiente, RMI estimada); (3) "âš ï¸ Valor da causa:" com cada item em linha separada (DIB, DER, tempo de atraso, valor em R$). Omita blocos cujos dados nÃ£o estejam disponÃ­veis.',
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
            'Parecer tÃ©cnico conclusivo completo da anÃ¡lise, incluindo verificaÃ§Ã£o de carÃªncia, qualidade de segurado, anÃ¡lise de incapacidade, regras de aposentadoria aplicÃ¡veis e recomendaÃ§Ãµes tÃ©cnicas. Retorne em formato Markdown (use ##, ###, **negrito**, listas com - e parÃ¡grafos)',
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
      description:
        'Anï¿½lise da Deficiï¿½ncia com base nos documentos mï¿½dicos',
      properties: {
        predominantDisabilityDegree: {
          type: 'string',
          description: 'Grau preponderante da deficiï¿½ncia. Ex: Grave: 75%',
        },
        lightDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiï¿½ncia leve. Ex: 15',
        },
        moderateDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiï¿½ncia moderada. Ex: 15',
        },
        severeDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiï¿½ncia grave. Ex: 75',
        },
        documents: {
          type: 'array',
          description: 'Lista de documentos mï¿½dicos analisados',
          items: {
            type: 'object',
            properties: {
              documentName: {
                type: 'string',
                description:
                  'Nome ou tipo do documento. Ex: Laudo Mï¿½dico - Ortopedia',
              },
              viability: {
                type: 'string',
                enum: [
                  'alta_viabilidade',
                  'media_viabilidade',
                  'baixa_viabilidade',
                ],
                description: 'Nï¿½vel de viabilidade do documento',
              },
              cid: {
                type: 'string',
                description:
                  'Cï¿½digo e descriï¿½ï¿½o do CID. Ex: M54.5 (Dor lombar baixa)',
              },
              degree: {
                type: 'string',
                description:
                  'Grau da deficiï¿½ncia indicado no documento. Ex: Moderado, Nï¿½o Especificado, Alto',
              },
              date: {
                type: 'string',
                format: 'date',
                description: 'Data do documento no formato YYYY-MM-DD',
              },
              crm: {
                type: 'string',
                description: 'CRM do mï¿½dico responsï¿½vel. Ex: 123456-7',
              },
              observations: {
                type: 'array',
                items: { type: 'string' },
                description: 'Observaï¿½ï¿½es sobre o documento',
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
          description: 'Lista de perï¿½odos da linha do tempo do segurado',
          items: {
            type: 'object',
            properties: {
              startDate: {
                type: 'string',
                format: 'date',
                description:
                  'Data de inï¿½cio do perï¿½odo no formato YYYY-MM-DD',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'Data de fim do perï¿½odo no formato YYYY-MM-DD',
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
                  'Tipo de atividade do perï¿½odo: PCD_LEVE, PCD_MODERADA, PCD_GRAVE, ATIVIDADE_COMUM ou PERIODO_SEM_ATIVIDADE',
              },
              location: {
                type: 'string',
                description:
                  'Local do perï¿½odo. Exemplo: Assentamento Nova Vida, municï¿½pio de Araraquara/SP',
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
                  'Indica se o segurado jï¿½ atingiu o direito (true) ou ainda estï¿½ aguardando (false)',
              },
              eligibilityAvailableAt: {
                type: 'string',
                description:
                  'Data do direito, se jï¿½ atingido. Formato YYYY-MM-DD',
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
                  'Anï¿½lise detalhada desta regra em formato markdown',
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
          description: 'Resultado geral da anï¿½lise em formato markdown',
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
            'Tempo total de contribuiï¿½ï¿½o. Exemplo: 35 anos, 10 meses e 14 dias',
        },
        positionTenureTime: {
          type: 'string',
          description:
            'Tempo no cargo atual. Exemplo: 10 anos, 6 meses e 15 dias',
        },
        publicServiceTime: {
          type: 'string',
          description:
            'Tempo no serviï¿½o pï¿½blico. Exemplo: 30 anos, 2 meses e 5 dias',
        },
        totalCareerTime: {
          type: 'string',
          description:
            'Tempo total de carreira. Exemplo: 42 anos, 1 mï¿½s e 20 dias',
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
            'Data de ingresso no serviï¿½o pï¿½blico no formato YYYY-MM-DD',
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
      description:
        'Anï¿½lise da deficiï¿½ncia com base nos documentos mï¿½dicos',
      properties: {
        predominantDisabilityDegree: {
          type: 'string',
          description: 'Grau preponderante da deficiï¿½ncia. Ex: Grave: 75%',
        },
        lightDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiï¿½ncia leve. Ex: 15',
        },
        moderateDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiï¿½ncia moderada. Ex: 15',
        },
        severeDisabilityPercentage: {
          type: 'number',
          description: 'Percentual de tempo com deficiï¿½ncia grave. Ex: 75',
        },
        documents: {
          type: 'array',
          description: 'Lista de documentos mï¿½dicos analisados',
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
                description: 'Nï¿½vel de viabilidade do documento',
              },
              cid: {
                type: 'string',
                description: 'Cï¿½digo e descriï¿½ï¿½o do CID',
              },
              degree: {
                type: 'string',
                description: 'Grau da deficiï¿½ncia indicado no documento',
              },
              date: {
                type: 'string',
                format: 'date',
                description: 'Data do documento no formato YYYY-MM-DD',
              },
              crm: {
                type: 'string',
                description: 'CRM do mï¿½dico responsï¿½vel',
              },
              observations: {
                type: 'array',
                items: { type: 'string' },
                description: 'Observaï¿½ï¿½es sobre o documento',
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
            'Perï¿½odos analisados a partir do CNIS e dos dados do fluxo',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Nome da instituiï¿½ï¿½o ou vï¿½nculo principal',
              },
              startDate: {
                type: 'string',
                format: 'date',
                description:
                  'Data de inï¿½cio do perï¿½odo no formato YYYY-MM-DD',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'Data de fim do perï¿½odo no formato YYYY-MM-DD',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantCategoryEnum,
                ),
                description: 'Categoria previdenciï¿½ria do vï¿½nculo',
              },
              gracePeriod: {
                type: 'number',
                description:
                  'Quantidade de competï¿½ncias vï¿½lidas no perï¿½odo',
              },
              statusPCD: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
                ),
                description: 'Grau PCD considerado para o perï¿½odo',
              },
              status: {
                type: 'boolean',
                description: 'Indica se o perï¿½odo foi considerado vï¿½lido',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se existe alguma pendï¿½ncia no perï¿½odo',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description:
                  'Indica se existem competï¿½ncias abaixo do mï¿½nimo',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Valor mï¿½dio das remuneraï¿½ï¿½es consideradas naquele perï¿½odo',
              },
              belowMinimumContributions: {
                type: 'array',
                description:
                  'Lista apenas das competï¿½ncias cujas contribuiï¿½ï¿½es ficaram abaixo do mï¿½nimo',
                items: {
                  type: 'object',
                  properties: {
                    contributionDate: {
                      type: 'string',
                      format: 'date',
                      description:
                        'Data da contribuiï¿½ï¿½o no formato YYYY-MM-DD',
                    },
                    contributionValue: {
                      type: 'number',
                      description:
                        'Valor da contribuiï¿½ï¿½o abaixo do mï¿½nimo',
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
                description:
                  'Motivo da pendï¿½ncia do perï¿½odo, quando houver',
              },
              earningsHistory: {
                type: 'array',
                description:
                  'HistÃ³rico de remuneraÃ§Ãµes do perÃ­odo extraÃ­do do CNIS',
                items: {
                  type: 'object',
                  properties: {
                    competence: {
                      type: 'string',
                      format: 'date',
                      description: 'CompetÃªncia no formato YYYY-MM-DD',
                    },
                    remuneration: {
                      type: 'string',
                      description: 'Valor ou descriÃ§Ã£o da remuneraÃ§Ã£o',
                    },
                    indicators: {
                      type: 'string',
                      description: 'Indicadores da remuneraÃ§Ã£o',
                    },
                    paymentDate: {
                      type: 'string',
                      format: 'date',
                      description: 'Data de pagamento no formato YYYY-MM-DD',
                    },
                    contribution: {
                      type: 'string',
                      description: 'InformaÃ§Ãµes de contribuiÃ§Ã£o',
                    },
                    contributionSalary: {
                      type: 'string',
                      description: 'SalÃ¡rio de contribuiÃ§Ã£o',
                    },
                    analysis: {
                      type: 'string',
                      description: 'AnÃ¡lise da competÃªncia',
                    },
                    competenceBelowTheMinimum: {
                      type: 'boolean',
                      description:
                        'Indica se a competÃªncia estÃ¡ abaixo do mÃ­nimo',
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
          description: 'Tipo do agente nocivo. Ex: RuÃ­do, Calor, QuÃ­micos',
        },
        intensity: {
          type: 'string',
          description: 'Intensidade/mediÃ§Ã£o (quando houver). Ex: 87dB',
        },
        unit: {
          type: 'string',
          description: 'Unidade da mediÃ§Ã£o. Ex: dB, Â°C',
        },
        habitual: {
          type: 'boolean',
          description: 'ExposiÃ§Ã£o habitual.',
        },
        permanence: {
          type: 'boolean',
          description: 'ExposiÃ§Ã£o permanente.',
        },
        source: {
          type: 'string',
          description: 'Fonte da informaÃ§Ã£o. Ex: PPP, LTCAT',
        },
        epiEficaz: {
          type: 'boolean',
          description:
            'Indica se EPI foi considerado eficaz, quando aplicÃ¡vel.',
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
          description: 'CompetÃªncia no formato YYYY-MM-DD',
        },
        remuneration: { type: 'string', description: 'RemuneraÃ§Ã£o' },
        indicators: { type: 'string', description: 'Indicadores CNIS' },
        paymentDate: {
          type: 'string',
          format: 'date',
          description: 'Data de pagamento no formato YYYY-MM-DD',
        },
        competenceBelowTheMinimum: {
          type: 'boolean',
          description: 'Indica competÃªncia abaixo do mÃ­nimo',
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
              description: 'CarÃªncia no tempo especial (contribuiÃ§Ãµes)',
            },
            commonGracePeriod: {
              type: 'number',
              description: 'CarÃªncia no tempo comum (contribuiÃ§Ãµes)',
            },
            totalTime: {
              type: 'string',
              description: 'Tempo total. Ex: 30 anos e 2 meses',
            },
            totalGracePeriod: {
              type: 'number',
              description: 'CarÃªncia total (contribuiÃ§Ãµes)',
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
                description: 'Origem do vÃ­nculo (empregador/vÃ­nculo).',
              },
              startDate: {
                type: 'string',
                format: 'date',
                description: 'Data de inÃ­cio do perÃ­odo (YYYY-MM-DD).',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'Data de fim do perÃ­odo (YYYY-MM-DD) ou null.',
              },
              category: {
                type: 'string',
                description: 'Categoria do vÃ­nculo.',
              },
              impact: {
                type: 'string',
                description: 'Impacto em tempo. Ex: 2 anos e 3 meses.',
              },
              gracePeriod: {
                type: 'number',
                description: 'CarÃªncia do perÃ­odo (contribuiÃ§Ãµes).',
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
                description: 'RemuneraÃ§Ãµes do perÃ­odo (CNIS).',
              },
              observations: {
                type: 'array',
                items: { type: 'string' },
                description: 'ObservaÃ§Ãµes do perÃ­odo (quando houver).',
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
                  'Indica se o segurado jï¿½ atingiu o direito ou ainda estï¿½ aguardando',
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
                  'Anï¿½lise detalhada desta regra em formato markdown',
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
                description: 'Nome da opï¿½ï¿½o recomendada pelo sistema',
              },
              retirementRuleName: {
                type: 'string',
                description: 'Nome da regra de aposentadoria relacionada',
              },
              dib: {
                type: 'string',
                format: 'date',
                description:
                  'Data de inï¿½cio do benefï¿½cio no formato YYYY-MM-DD',
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
                description: 'Tï¿½tulo da sugestï¿½o processual',
              },
              suggestionDescription: {
                type: 'string',
                description: 'Descriï¿½ï¿½o da sugestï¿½o processual',
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
              description: 'Benefï¿½cio analisado',
            },
            compatibility: {
              type: 'boolean',
              description: 'Indica a compatibilidade do benefï¿½cio',
            },
            observations: {
              type: 'string',
              description: 'Observaï¿½ï¿½es sobre a compatibilidade',
            },
          },
          required: ['benefit', 'compatibility', 'observations'],
        },
        analysisResult: {
          type: 'string',
          description:
            'Anï¿½lise extensa e detalhada do caso, abrangendo o histï¿½rico previdenciï¿½rio do segurado, as condiï¿½ï¿½es incapacitantes apresentadas, os reflexos dos perï¿½odos contributivos, a aplicabilidade das regras de elegibilidade, as estratï¿½gias de reconhecimento de direitos e a conclusï¿½o fundamentada sobre a viabilidade da concessï¿½o da aposentadoria. O campo deve conter um texto longo, estruturado em parï¿½grafos, em formato Markdown.',
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
            'Lista de perï¿½odos de acelerador de tempo identificados nos documentos analisados',
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
                description: 'Nï¿½vel de viabilidade do perï¿½odo analisado',
              },
              technicalNote: {
                type: 'string',
                description:
                  'Nota tï¿½cnica resumindo os fundamentos do perï¿½odo',
              },
              startDate: {
                type: 'string',
                format: 'date-time',
                description:
                  'Data de inï¿½cio do perï¿½odo no formato ISO 8601',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de fim do perï¿½odo no formato ISO 8601',
              },
              institution: {
                type: 'string',
                description:
                  'Instituiï¿½ï¿½o ou empregador relacionado ao perï¿½odo',
              },
              affectsQualifyingPeriod: {
                type: 'boolean',
                description:
                  'Indica se o perï¿½odo afeta carï¿½ncia ou tempo qualificï¿½vel',
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
            'Lista de perï¿½odos identificados nos documentos PPP analisados',
          items: {
            type: 'object',
            properties: {
              startDate: {
                type: 'string',
                format: 'date-time',
                description:
                  'Data de inï¿½cio do perï¿½odo no formato ISO 8601',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de fim do perï¿½odo no formato ISO 8601',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantCategoryEnum,
                ),
                description: 'Categoria do perï¿½odo',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o perï¿½odo possui pendï¿½ncia',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description:
                  'Indica se a competï¿½ncia estï¿½ abaixo do mï¿½nimo',
              },
              pendencyReason: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pendï¿½ncia, se houver',
              },
              typeOfContribution: {
                type: 'string',
                description: 'Tipo de contribuiï¿½ï¿½o, se aplicï¿½vel',
              },
              status: {
                type: 'boolean',
                description: 'Status do perï¿½odo (ativo/inativo)',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Mï¿½dia de contribuiï¿½ï¿½o como string decimal, se disponï¿½vel',
              },
              disabilityStatus: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
                ),
                description:
                  'Grau de deficiï¿½ncia no perï¿½odo, se aplicï¿½vel',
              },
              periodConsideration: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningGrantPeriodConsiderationEnum,
                ),
                description: 'Consideraï¿½ï¿½o do perï¿½odo para o benefï¿½cio',
              },
              bondOrigin: {
                type: 'string',
                description:
                  'Origem do vï¿½nculo empregatï¿½cio, se identificada',
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
          description: 'Rï¿½tulo descritivo do perï¿½odo',
        },
        start: {
          type: 'string',
          description: 'Data de inï¿½cio no formato YYYY-MM-DD',
        },
        end: {
          type: 'string',
          description: 'Data de tï¿½rmino no formato YYYY-MM-DD',
        },
        recognized: {
          type: 'boolean',
          description: 'Indica se o perï¿½odo foi reconhecido',
        },
        companyName: { type: 'string', description: 'Nome da empresa' },
        companyCNPJ: { type: 'string', description: 'CNPJ da empresa' },
        role: { type: 'string', description: 'Cargo/funï¿½ï¿½o' },
        employmentLinkStartDate: {
          type: 'string',
          description: 'Inï¿½cio do vï¿½nculo',
        },
        employmentLinkEndDate: {
          type: 'string',
          description: 'Fim do vï¿½nculo',
        },
        employmentLinkSupportingDocument: {
          type: 'string',
          description: 'Documento comprobatï¿½rio',
        },
        employmentLinkPresentInCNIS: {
          type: 'boolean',
          description: 'Vï¿½nculo consta no CNIS',
        },
        employmentLinkEarningsInCNIS: {
          type: 'boolean',
          description: 'Remuneraï¿½ï¿½es no CNIS',
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
        label: { type: 'string', description: 'Rï¿½tulo do perï¿½odo PCD' },
        start: { type: 'string', description: 'Data de inï¿½cio YYYY-MM-DD' },
        end: { type: 'string', description: 'Data de tï¿½rmino YYYY-MM-DD' },
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
          description: 'Tipo de deficiï¿½ncia (ex: Fï¿½sica)',
        },
        cidCodes: {
          type: 'array',
          items: { type: 'string' },
          description: 'CID(s) identificados',
        },
        cifClassification: {
          type: 'string',
          description: 'Classificaï¿½ï¿½o CIF',
        },
        disabilityDegree: {
          type: 'string',
          description: 'Grau da deficiï¿½ncia (Leve, Moderado, Grave)',
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
              description: 'Nï¿½mero do processo judicial',
            },
          },
          required: ['name', 'birthDate'],
        },
        rulesSummary: {
          type: 'object',
          description:
            'Nï¿½mero total de regras analisadas, elegï¿½veis e nï¿½o elegï¿½veis',
          properties: {
            totalAnalyzed: {
              type: 'number',
              description: 'Total de regras analisadas',
            },
            eligibleCount: {
              type: 'number',
              description: 'Quantidade de regras elegï¿½veis',
            },
            nonEligibleCount: {
              type: 'number',
              description: 'Quantidade de regras nï¿½o elegï¿½veis',
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
                description: 'Se o segurado ï¿½ elegï¿½vel',
              },
              rightDate: {
                type: 'string',
                description:
                  'Data do direito no formato YYYY-MM-DD (quando elegï¿½vel)',
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
                description: 'Indica se possui o maior valor de aï¿½ï¿½o',
              },
              detailedRuleAnalysis: {
                type: 'string',
                description:
                  'Anï¿½lise detalhada da regra (requisitos, cï¿½lculo RMI, valor da causa)',
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
                description: 'Data de inï¿½cio YYYY-MM-DD',
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
                description: 'Classificaï¿½ï¿½o do perï¿½odo',
              },
              location: { type: 'string', description: 'Local do perï¿½odo' },
              duration: {
                type: 'string',
                description: 'Duraï¿½ï¿½o (ex: 4 anos)',
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
            'Anï¿½lise do tempo especial (perï¿½odos com agentes nocivos)',
          items: specialTimePeriodSchema,
        },
        pcdTimeAnalysis: {
          type: 'array',
          description:
            'Anï¿½lise do tempo PCD (perï¿½odos como pessoa com deficiï¿½ncia)',
          items: pcdPeriodSchema,
        },
        contributionTimeSummary: {
          type: 'object',
          description: 'Tempo de Serviï¿½o/Contribuiï¿½ï¿½o',
          properties: {
            totalContributionTime: {
              type: 'string',
              description:
                'Tempo total de contribuiï¿½ï¿½o. Ex: 44 anos, 5 meses e 22 dias',
            },
            publicServiceContributionTime: {
              type: 'string',
              description: 'Tempo no serviï¿½o pï¿½blico',
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
                'Ingresso no serviï¿½o pï¿½blico (anterior/posterior a 16/12/1998 ou data)',
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
                'Tempo de contribuiï¿½ï¿½o sem resolver pendï¿½ncias. Ex: 10 anos 2 meses',
            },
            contributionTimeAfterResolvingOutstandingIssues: {
              type: 'string',
              description:
                'Tempo de contribuiï¿½ï¿½o apï¿½s resolver pendï¿½ncias. Ex: 22 anos 5 meses',
            },
            contributionTimeWithAccelerators: {
              type: 'string',
              description:
                'Tempo de contribuiï¿½ï¿½o considerando aceleradores. Ex: 30 anos 8 meses',
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
            'Resumo de Regras Aplicï¿½veis para Aposentadoria Urbana Comum (RPPS)',
        },
        finalAnalysis: {
          type: 'string',
          description: 'Anï¿½lise final consolidada',
        },
        completeAnalysisReport: {
          type: 'string',
          description:
            'Relatï¿½rio completo da anï¿½lise em Markdown, pronto para exportaï¿½ï¿½o em PDF/DOCX. Deve conter todas as seï¿½ï¿½es: Dados do cliente, Tempo de Serviï¿½o/Contribuiï¿½ï¿½o, Anï¿½lise de Regras de Aposentadoria, resumo e lista de regras (elegï¿½veis e nï¿½o elegï¿½veis), Linha do tempo integrada, Anï¿½lise do tempo especial, Anï¿½lise do tempo PCD, Resumo de Regras Aplicï¿½veis para Aposentadoria Urbana Comum (RPPS) e Anï¿½lise final. Formate com tï¿½tulos (##), listas e tabelas em Markdown quando aplicï¿½vel.',
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

  private getGeneralUrbanRetirementDenialPppAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        periods: {
          type: 'array',
          description:
            'Lista de perÃ­odos identificados nos documentos PPP analisados',
          items: {
            type: 'object',
            properties: {
              bondOrigin: {
                type: 'string',
                description:
                  'Origem do vÃ­nculo empregatÃ­cio, se identificada',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  GeneralUrbanRetirementDenialPeriodCategoryEnum,
                ),
                description: 'Categoria do perÃ­odo',
              },
              activityDescription: {
                type: 'string',
                description:
                  'DescriÃ§Ã£o da atividade exercida no perÃ­odo, se aplicÃ¡vel',
              },
              startDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de inÃ­cio do perÃ­odo no formato ISO 8601',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de fim do perÃ­odo no formato ISO 8601',
              },
              workType: {
                type: 'string',
                enum: ['URBAN', 'RURAL'],
                description: 'Tipo de trabalho do perÃ­odo',
              },
              impactMonths: {
                type: 'number',
                description:
                  'NÃºmero de meses de impacto do perÃ­odo. Omitir quando nÃ£o disponÃ­vel.',
              },
              graceMonths: {
                type: 'number',
                description:
                  'NÃºmero de meses de carÃªncia do perÃ­odo. Omitir quando nÃ£o disponÃ­vel.',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o perÃ­odo possui pendÃªncia',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description: 'Indica se a competÃªncia estÃ¡ abaixo do mÃ­nimo',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'MÃ©dia de contribuiÃ§Ã£o como string decimal, se disponÃ­vel',
              },
              pendencyReason: {
                type: 'string',
                enum: Object.values(
                  GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pendÃªncia, se houver',
              },
              periodConsideration: {
                type: 'string',
                enum: Object.values(
                  GeneralUrbanRetirementDenialPeriodConsiderationEnum,
                ),
                description: 'ConsideraÃ§Ã£o do perÃ­odo para o benefÃ­cio',
              },
              wantsToComplementViaMeuINSS: {
                type: 'boolean',
                description:
                  'Indica se o segurado deseja complementar o perÃ­odo via Meu INSS.',
              },
              status: {
                type: 'boolean',
                description: 'Status do perÃ­odo (ativo/inativo)',
              },
            },
            required: [
              'startDate',
              'workType',
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
          description: 'Dados do segurado extraÃ­dos do CNIS.',
          properties: {
            name: { type: 'string', description: 'Nome completo do segurado.' },
            cpf: {
              type: 'string',
              description: 'CPF do segurado. Null se nÃ£o encontrado.',
            },
            nit: {
              type: 'string',
              description: 'NIT/PIS do segurado. Null se nÃ£o encontrado.',
            },
            birthDate: {
              type: 'string',
              description:
                'Data de nascimento no formato YYYY-MM-DD. Null se nÃ£o encontrada.',
            },
          },
          required: ['name', 'cpf', 'nit', 'birthDate'],
        },
        timeSummary: {
          type: 'object',
          description:
            'Resumo do tempo de contribuiÃ§Ã£o e carÃªncia apurados por cenÃ¡rio.',
          properties: {
            contributionTime: {
              type: 'object',
              description: 'Tempo de contribuiÃ§Ã£o em cada cenÃ¡rio.',
              properties: {
                withoutResolvingPendencies: {
                  type: 'string',
                  description:
                    'Tempo sem resolver pendÃªncias. Ex: 23 anos e 4 meses.',
                },
                resolvingPendencies: {
                  type: 'string',
                  description:
                    'Tempo resolvendo todas as pendÃªncias. Ex: 27 anos e 8 meses.',
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
                'CarÃªncia (nÃºmero de contribuiÃ§Ãµes) em cada cenÃ¡rio.',
              properties: {
                withoutResolvingPendencies: {
                  type: 'string',
                  description:
                    'ContribuiÃ§Ãµes sem resolver pendÃªncias. Ex: 156 contribuiÃ§Ãµes.',
                },
                resolvingPendencies: {
                  type: 'string',
                  description:
                    'ContribuiÃ§Ãµes resolvendo todas as pendÃªncias. Ex: 172 contribuiÃ§Ãµes.',
                },
                withTimeAccelerators: {
                  type: 'string',
                  description:
                    'ContribuiÃ§Ãµes com aceleradores de tempo. Ex: 180 contribuiÃ§Ãµes.',
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
          GeneralUrbanRetirementDenialPeriodCategoryEnum,
          items: {
            type: 'object',
            properties: {
              bondOrigin: {
                type: 'string',
                description: 'Nome do vÃ­nculo ou empregador.',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  GeneralUrbanRetirementDenialPeriodCategoryEnum,
                ),
                description: 'Categoria do perÃ­odo.',
              },
              activityDescription: {
                type: 'string',
                description: 'DescriÃ§Ã£o da atividade exercida no perÃ­odo.',
              },
              startDate: {
                type: 'string',
                GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
                description:
                  'Data de inÃ­cio do perÃ­odo no formato YYYY-MM-DD.',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description:
                  'Data de fim do perÃ­odo no formato YYYY-MM-DD. Null se ainda em aberto.',
              },
              workType: {
                type: 'string',
                enum: ['URBAN', 'RURAL'],
                description: 'Tipo de trabalho do perÃ­odo.',
              },
              impactMonths: {
                type: 'number',
                description:
                  'NÃºmero de meses de impacto do perÃ­odo. Omitir quando nÃ£o disponÃ­vel.',
              },
              graceMonths: {
                type: 'number',
                description:
                  'NÃºmero de meses de carÃªncia do perÃ­odo. Omitir quando nÃ£o disponÃ­vel.',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o perÃ­odo possui pendÃªncia.',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description:
                  'Indica se hÃ¡ competÃªncias com valor abaixo do mÃ­nimo.',
              },
              pendencyReason: {
                type: 'string',
                enum: Object.values(
                  GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pendÃªncia, se houver.',
              },
              periodConsideration: {
                type: 'string',
                enum: Object.values(
                  GeneralUrbanRetirementDenialPeriodConsiderationEnum,
                ),
                description: 'IndicaÃ§Ã£o de consideraÃ§Ã£o do perÃ­odo.',
              },
              wantsToComplementViaMeuINSS: {
                type: 'boolean',
                description:
                  'Indica se o segurado deseja complementar o perÃ­odo via Meu INSS.',
              },
              status: {
                type: 'boolean',
                description:
                  'Status do perÃ­odo (favorÃ¡vel/desfavorÃ¡vel para o segurado).',
              },
              contributionAverage: {
                type: 'number',
                description:
                  'MÃ©dia de contribuiÃ§Ã£o do perÃ­odo. Omitir quando nÃ£o disponÃ­vel.',
              },
              earningsHistory: {
                type: 'array',
                description:
                  'Lista APENAS das competÃªncias com pendÃªncia identificada no perÃ­odo. Inclua: competÃªncias abaixo do mÃ­nimo (COMPETENCE_BELOW_MINIMUM), competÃªncias apï¿½s data de saÃ­da ausente (NO_EXIT_DATE) e contribuiÃ§Ãµes recolhidas em atraso (LATE_CONTRIBUTION). NÃ£o inclua competÃªncias normais. Retorne array vazio quando nÃ£o houver nenhuma pendÃªncia.',
                items: {
                  type: 'object',
                  properties: {
                    competence: {
                      type: 'string',
                      description: 'CompetÃªncia no formato YYYY-MM-DD.',
                    },
                    value: {
                      type: 'string',
                      description: 'Valor da remuneraÃ§Ã£o como string.',
                    },
                    pendencyType: {
                      type: 'string',
                      enum: Object.values(
                        GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
                      ),
                      description:
                        'Tipo de pendÃªncia: COMPETENCE_BELOW_MINIMUM (contribuiÃ§Ã£o abaixo do mÃ­nimo), NO_EXIT_DATE (perÃ­odo sem data de saÃ­da), LATE_CONTRIBUTION (contribuiÃ§Ã£o recolhida em atraso).',
                    },
                    collectedAt: {
                      type: 'string',
                      description:
                        'Data em que a contribuiÃ§Ã£o foi efetivamente recolhida, no formato YYYY-MM-DD. Preencher apenas quando pendencyType for LATE_CONTRIBUTION.',
                    },
                  },
                  required: ['competence', 'value', 'pendencyType'],
                },
              },
            },
            required: [
              'startDate',
              'workType',
              'isPendency',
              'competenceBelowTheMinimum',
              'status',
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
            'Lista de perÃ­odos de acelerador de tempo identificados nos documentos analisados',
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
                description: 'NÃ­vel de viabilidade do perÃ­odo analisado',
              },
              technicalNote: {
                type: 'string',
                description:
                  'Nota tÃ©cnica resumindo os fundamentos do perÃ­odo',
              },
              startDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de inÃ­cio do perÃ­odo no formato ISO 8601',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de fim do perÃ­odo no formato ISO 8601',
              },
              institution: {
                type: 'string',
                description:
                  'InstituiÃ§Ã£o ou empregador relacionado ao perÃ­odo',
              },
              affectsQualifyingPeriod: {
                type: 'boolean',
                description:
                  'Indica se o perÃ­odo afeta carÃªncia ou tempo qualificÃ¡vel',
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

  private getGeneralUrbanRetirementDenialResultAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        clientData: {
          type: 'object',
          description: 'Dados do segurado extraÃ­dos do CNIS.',
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
                'Data da Ãºltima filiaÃ§Ã£o no formato YYYY-MM-DD. Null se nÃ£o encontrada.',
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description:
                'Data de nascimento no formato YYYY-MM-DD. Null se nÃ£o encontrada.',
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
            'Resumo de regras aplicÃ¡veis para aposentadoria urbana comum (RGPS).',
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
                  'Data do direito no formato YYYY-MM-DD. Null se nÃ£o atingido ou nÃ£o calculÃ¡vel.',
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
                  'AnÃ¡lise detalhada desta regra de aposentadoria, incluindo requisitos, cÃ¡lculo da RMI e valor da causa.',
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
            'Texto explicativo completo sobre o resultado da anÃ¡lise, perspectivas processuais e recomendaÃ§Ãµes para o caso de indeferimento.',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'ConteÃºdo HTML completo e bem formatado com toda a anÃ¡lise detalhada, pronto para conversÃ£o em PDF.',
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

  private getDeathBenefitGrantFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        insuredQualityAnalysis: {
          type: 'object',
          description:
            'AnÃ¡lise da qualidade de segurado do instituidor falecido na data do Ã³bito',
          properties: {
            isConfirmed: {
              type: 'boolean',
              description:
                'Indica se a qualidade de segurado foi confirmada na data do Ã³bito',
            },
            description: {
              type: 'string',
              description:
                'DescriÃ§Ã£o detalhada da anÃ¡lise da qualidade de segurado',
            },
          },
          required: ['isConfirmed', 'description'],
        },
        scheduledRetirementRightAnalysis: {
          type: 'object',
          description:
            'AnÃ¡lise do direito Ã  aposentadoria programada do instituidor falecido',
          properties: {
            isConfirmed: {
              type: 'boolean',
              description:
                'Indica se o direito Ã  aposentadoria programada foi confirmado antes do Ã³bito',
            },
            description: {
              type: 'string',
              description:
                'DescriÃ§Ã£o detalhada da anÃ¡lise do direito Ã  aposentadoria programada',
            },
          },
          required: ['isConfirmed', 'description'],
        },
        disabilityRetirementRightAnalysis: {
          type: 'object',
          description:
            'AnÃ¡lise do direito Ã  aposentadoria por incapacidade permanente do instituidor falecido',
          properties: {
            isConfirmed: {
              type: 'boolean',
              description:
                'Indica se o direito Ã  aposentadoria por incapacidade foi confirmado',
            },
            description: {
              type: 'string',
              description:
                'DescriÃ§Ã£o detalhada da anÃ¡lise do direito Ã  aposentadoria por incapacidade',
            },
          },
          required: ['isConfirmed', 'description'],
        },
        dependentQualityAnalysis: {
          type: 'array',
          description:
            'AnÃ¡lise da comprovaÃ§Ã£o da qualidade de dependente para cada dependente',
          items: {
            type: 'object',
            properties: {
              dependentName: {
                type: 'string',
                description: 'Nome do dependente',
              },
              dependencyDegree: {
                type: 'string',
                description:
                  'Grau da dependÃªncia (ex: Conjuge, companheiro, separado de fato com alimentos, divorciado com alimentos, filho menor de 21 anos, filho invÃ¡lido, etc.)',
              },
              isQualityConfirmed: {
                type: 'boolean',
                description:
                  'Indica se a qualidade de dependente foi comprovada',
              },
              pensionStartDate: {
                type: 'string',
                description:
                  'Data de inÃ­cio estimada da pensÃ£o no formato YYYY-MM-DD',
              },
              estimatedPensionDuration: {
                type: 'string',
                description:
                  'DuraÃ§Ã£o estimada da pensÃ£o com base nos documentos anexados',
              },
            },
            required: [
              'dependentName',
              'dependencyDegree',
              'isQualityConfirmed',
              'pensionStartDate',
              'estimatedPensionDuration',
            ],
          },
        },
        retirementRuleSummaries: {
          type: 'array',
          description:
            'Resumo das regras de aposentadorias aplicÃ¡veis ao instituidor falecido',
          items: {
            type: 'object',
            properties: {
              retirementRule: {
                type: 'string',
                description: 'Nome da regra de aposentadoria',
              },
              result: {
                type: 'string',
                description: 'Resultado da regra (ex: Atingido, NÃ£o atingido)',
              },
              rightDate: {
                type: 'string',
                description:
                  'Data do direito no formato YYYY-MM-DD, ou null se nÃ£o atingido',
              },
              estimatedRmi: {
                type: 'string',
                description:
                  'RMI prevista no formato monetÃ¡rio (ex: R$ 3.218,45)',
              },
              isBestRmi: {
                type: 'boolean',
                description: 'Indica se Ã© a melhor RMI entre todas as regras',
              },
              isHighestCauseValue: {
                type: 'boolean',
                description:
                  'Indica se Ã© o maior valor de causa entre todas as regras',
              },
              detailedAnalysisDescription: {
                type: 'string',
                description:
                  'DescriÃ§Ã£o detalhada da anÃ¡lise da regra, incluindo requisitos analisados, cÃ¡lculo da RMI e valor da causa',
              },
            },
            required: [
              'retirementRule',
              'result',
              'rightDate',
              'estimatedRmi',
              'isBestRmi',
              'isHighestCauseValue',
              'detailedAnalysisDescription',
            ],
          },
        },
        periods: {
          type: 'array',
          description:
            'PerÃ­odos analisados a partir do CNIS e dos dados do fluxo (Raio-X do CNIS)',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Nome da instituiÃ§Ã£o ou vÃ­nculo principal',
              },
              startDate: {
                type: 'string',
                format: 'date',
                description:
                  'Data de inÃ­cio do perÃ­odo no formato YYYY-MM-DD',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'Data de fim do perÃ­odo no formato YYYY-MM-DD',
              },
              category: {
                type: 'string',
                enum: Object.values(DeathBenefitGrantCategoryEnum),
                description: 'Categoria previdenciÃ¡ria do vÃ­nculo',
              },
              gracePeriod: {
                type: 'number',
                description: 'Quantidade de competÃªncias vÃ¡lidas no perÃ­odo',
              },
              status: {
                type: 'boolean',
                description: 'Indica se o perÃ­odo foi considerado vÃ¡lido',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se existe alguma pendÃªncia no perÃ­odo',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description:
                  'Indica se existem competÃªncias abaixo do mÃ­nimo',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Valor mÃ©dio das remuneraÃ§Ãµes consideradas naquele perÃ­odo',
              },
              belowMinimumContributions: {
                type: 'array',
                description:
                  'Lista apenas das competÃªncias cujas contribuiÃ§Ãµes ficaram abaixo do mÃ­nimo',
                items: {
                  type: 'object',
                  properties: {
                    contributionDate: {
                      type: 'string',
                      format: 'date',
                      description:
                        'Data da contribuiÃ§Ã£o no formato YYYY-MM-DD',
                    },
                    contributionValue: {
                      type: 'number',
                      description: 'Valor da contribuiÃ§Ã£o abaixo do mÃ­nimo',
                    },
                  },
                  required: ['contributionDate', 'contributionValue'],
                },
              },
              reasonPendency: {
                type: 'string',
                enum: Object.values(DeathBenefitGrantPeriodPendencyReasonEnum),
                description: 'Motivo da pendÃªncia do perÃ­odo, quando houver',
              },
              bondOrigin: {
                type: 'string',
                description: 'Origem do vÃ­nculo empregatÃ­cio',
              },
              impact: {
                type: 'string',
                description: 'Impacto do perÃ­odo na anÃ¡lise previdenciÃ¡ria',
              },
              complementViaMyInss: {
                type: 'boolean',
                description:
                  'Indica se deseja fazer a complementaÃ§Ã£o via Meu INSS',
              },
              earningsHistory: {
                type: 'array',
                description:
                  'HistÃ³rico de remuneraÃ§Ãµes do perÃ­odo extraÃ­do do CNIS',
                items: {
                  type: 'object',
                  properties: {
                    competence: {
                      type: 'string',
                      format: 'date',
                      description: 'CompetÃªncia no formato YYYY-MM-DD',
                    },
                    remuneration: {
                      type: 'string',
                      description: 'Valor ou descriÃ§Ã£o da remuneraÃ§Ã£o',
                    },
                    indicators: {
                      type: 'string',
                      description: 'Indicadores da remuneraÃ§Ã£o',
                    },
                    paymentDate: {
                      type: 'string',
                      format: 'date',
                      description: 'Data de pagamento no formato YYYY-MM-DD',
                    },
                    contribution: {
                      type: 'string',
                      description: 'InformaÃ§Ãµes de contribuiÃ§Ã£o',
                    },
                    contributionSalary: {
                      type: 'string',
                      description: 'SalÃ¡rio de contribuiÃ§Ã£o',
                    },
                    analysis: {
                      type: 'string',
                      description: 'AnÃ¡lise da competÃªncia',
                    },
                    competenceBelowTheMinimum: {
                      type: 'boolean',
                      description:
                        'Indica se a competÃªncia estÃ¡ abaixo do mÃ­nimo',
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
      },
      required: [
        'insuredQualityAnalysis',
        'scheduledRetirementRightAnalysis',
        'disabilityRetirementRightAnalysis',
        'dependentQualityAnalysis',
        'retirementRuleSummaries',
        'periods',
      ],
    };
  }

  private getDeathBenefitGrantTimeAcceleratorAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        timeAccelerators: {
          type: 'array',
          description:
            'Lista de perÃ­odos de acelerador de tempo identificados nos documentos analisados',
          items: {
            type: 'object',
            properties: {
              recognitionInss: {
                type: 'string',
                enum: Object.values(
                  DeathBenefitGrantTimeAcceleratorRecognitionInssEnum,
                ),
                description: 'Probabilidade de reconhecimento no INSS',
              },
              recognitionJudicial: {
                type: 'string',
                enum: Object.values(
                  DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum,
                ),
                description: 'Probabilidade de reconhecimento judicial',
              },
              viability: {
                type: 'string',
                enum: Object.values(
                  DeathBenefitGrantTimeAcceleratorViabilityEnum,
                ),
                description: 'NÃ­vel de viabilidade do perÃ­odo analisado',
              },
              technicalNote: {
                type: 'string',
                description:
                  'Nota tÃ©cnica resumindo os fundamentos do perÃ­odo',
              },
              startDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de inÃ­cio do perÃ­odo no formato ISO 8601',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de fim do perÃ­odo no formato ISO 8601',
              },
              institution: {
                type: 'string',
                description:
                  'InstituiÃ§Ã£o ou empregador relacionado ao perÃ­odo',
              },
              affectsQualifyingPeriod: {
                type: 'boolean',
                description:
                  'Indica se o perÃ­odo afeta carÃªncia ou tempo qualificÃ¡vel',
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

  private getDeathBenefitGrantResultAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        eligibilityStatus: {
          type: 'string',
          enum: ['ELIGIBLE', 'PARTIALLY_ELIGIBLE', 'NOT_ELIGIBLE'],
          description:
            'Status de elegibilidade para pensÃ£o por morte: ELIGIBLE (elegÃ­vel), PARTIALLY_ELIGIBLE (parcialmente elegÃ­vel), NOT_ELIGIBLE (nÃ£o elegÃ­vel)',
        },
        insuredQualityStatus: {
          type: 'string',
          enum: ['PROVEN', 'NOT_PROVEN'],
          description:
            'Status da qualidade de segurado do instituidor falecido: PROVEN (comprovada), NOT_PROVEN (nÃ£o comprovada)',
        },
        dependentQualityStatus: {
          type: 'string',
          enum: ['PROVEN', 'PARTIALLY_PROVEN', 'NOT_PROVEN'],
          description:
            'Status geral da qualidade de dependente: PROVEN (comprovada), PARTIALLY_PROVEN (parcialmente comprovada), NOT_PROVEN (nÃ£o comprovada)',
        },
        applicableRules: {
          type: 'array',
          description:
            'Resumo de regras aplicÃ¡veis para pensÃ£o por morte (RGPS)',
          items: {
            type: 'object',
            properties: {
              ruleName: {
                type: 'string',
                description: 'Nome da regra de pensÃ£o por morte',
              },
              result: {
                type: 'string',
                description: 'Resultado da aplicaÃ§Ã£o da regra',
              },
              rightDate: {
                type: 'string',
                format: 'date',
                description: 'Data do direito no formato YYYY-MM-DD',
              },
              estimatedRmi: {
                type: 'string',
                description:
                  'RMI prevista em formato textual (ex: R$ 3.218,45)',
              },
              quotaQuantity: {
                type: 'number',
                description: 'Quantidade de cotas',
              },
              quotaValue: {
                type: 'string',
                description:
                  'Valor da cota em formato textual (ex: R$ 2.000,00)',
              },
              detailedAnalysis: {
                type: 'string',
                description: 'AnÃ¡lise detalhada da regra em formato markdown',
              },
            },
            required: ['ruleName', 'result', 'detailedAnalysis'],
          },
        },
        dependentAnalysis: {
          type: 'array',
          description: 'Resultado da anÃ¡lise dos dependentes',
          items: {
            type: 'object',
            properties: {
              dependentName: {
                type: 'string',
                description: 'Nome do dependente',
              },
              dependencyDegree: {
                type: 'string',
                description: 'Grau de dependÃªncia (ex: CÃ´njuge, Filho Menor)',
              },
              dependentQualityStatus: {
                type: 'string',
                enum: ['PROVEN', 'PARTIALLY_PROVEN', 'NOT_PROVEN'],
                description:
                  'Status da qualidade de dependente: PROVEN (comprovada), PARTIALLY_PROVEN (parcialmente comprovada), NOT_PROVEN (nÃ£o comprovada)',
              },
              quotaValue: {
                type: 'string',
                description: 'Valor da cota do dependente em formato textual',
              },
              pensionStartDate: {
                type: 'string',
                format: 'date',
                description: 'Data de inÃ­cio da pensÃ£o no formato YYYY-MM-DD',
              },
              estimatedPensionDuration: {
                type: 'string',
                description:
                  'DuraÃ§Ã£o estimada da pensÃ£o (ex: VitalÃ­cio, 4 anos)',
              },
            },
            required: [
              'dependentName',
              'dependencyDegree',
              'dependentQualityStatus',
              'estimatedPensionDuration',
            ],
          },
        },
        analysisDescription: {
          type: 'string',
          description:
            'DescriÃ§Ã£o completa e detalhada do resultado da anÃ¡lise de pensÃ£o por morte em formato Markdown. Deve conter o histÃ³rico previdenciÃ¡rio do instituidor, anÃ¡lise da qualidade de segurado, anÃ¡lise dos dependentes, aplicaÃ§Ã£o das regras de pensÃ£o e conclusÃ£o fundamentada.',
        },
      },
      required: [
        'eligibilityStatus',
        'insuredQualityStatus',
        'dependentQualityStatus',
        'applicableRules',
        'dependentAnalysis',
        'analysisDescription',
      ],
    };
  }

  private getDeathBenefitRejectionFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        insuredQualityAnalysis: {
          type: 'object',
          description:
            'Análise da qualidade de segurado do instituidor falecido na data do óbito',
          properties: {
            isConfirmed: {
              type: 'boolean',
              description:
                'Indica se a qualidade de segurado foi confirmada na data do óbito',
            },
            description: {
              type: 'string',
              description:
                'Descrição detalhada da análise da qualidade de segurado',
            },
          },
          required: ['isConfirmed', 'description'],
        },
        scheduledRetirementRightAnalysis: {
          type: 'object',
          description:
            'Análise do direito à aposentadoria programada do instituidor falecido',
          properties: {
            isConfirmed: {
              type: 'boolean',
              description:
                'Indica se o direito à aposentadoria programada foi confirmado antes do óbito',
            },
            description: {
              type: 'string',
              description:
                'Descrição detalhada da análise do direito à aposentadoria programada',
            },
          },
          required: ['isConfirmed', 'description'],
        },
        disabilityRetirementRightAnalysis: {
          type: 'object',
          description:
            'Análise do direito à aposentadoria por incapacidade permanente do instituidor falecido',
          properties: {
            isConfirmed: {
              type: 'boolean',
              description:
                'Indica se o direito à aposentadoria por incapacidade foi confirmado',
            },
            description: {
              type: 'string',
              description:
                'Descrição detalhada da análise do direito à aposentadoria por incapacidade',
            },
          },
          required: ['isConfirmed', 'description'],
        },
        dependentQualityAnalysis: {
          type: 'array',
          description:
            'Análise da comprovação da qualidade de dependente para cada dependente',
          items: {
            type: 'object',
            properties: {
              dependentName: {
                type: 'string',
                description: 'Nome do dependente',
              },
              dependencyDegree: {
                type: 'string',
                description:
                  'Grau da dependência (ex: Conjuge, companheiro, separado de fato com alimentos, divorciado com alimentos, filho menor de 21 anos, filho inválido, etc.)',
              },
              isQualityConfirmed: {
                type: 'boolean',
                description:
                  'Indica se a qualidade de dependente foi comprovada',
              },
              pensionStartDate: {
                type: 'string',
                description:
                  'Data de início estimada da pensão no formato YYYY-MM-DD',
              },
              estimatedPensionDuration: {
                type: 'string',
                description:
                  'Duração estimada da pensão com base nos documentos anexados',
              },
            },
            required: [
              'dependentName',
              'dependencyDegree',
              'isQualityConfirmed',
              'pensionStartDate',
              'estimatedPensionDuration',
            ],
          },
        },
        retirementRuleSummaries: {
          type: 'array',
          description:
            'Resumo das regras de aposentadorias aplicáveis ao instituidor falecido',
          items: {
            type: 'object',
            properties: {
              retirementRule: {
                type: 'string',
                description: 'Nome da regra de aposentadoria',
              },
              result: {
                type: 'string',
                description: 'Resultado da regra (ex: Atingido, Não atingido)',
              },
              rightDate: {
                type: 'string',
                description:
                  'Data do direito no formato YYYY-MM-DD, ou null se não atingido',
              },
              estimatedRmi: {
                type: 'string',
                description:
                  'RMI prevista no formato monetário (ex: R$ 3.218,45)',
              },
              isBestRmi: {
                type: 'boolean',
                description: 'Indica se é a melhor RMI entre todas as regras',
              },
              isHighestCauseValue: {
                type: 'boolean',
                description:
                  'Indica se é o maior valor de causa entre todas as regras',
              },
              detailedAnalysisDescription: {
                type: 'string',
                description:
                  'Descrição detalhada da análise da regra, incluindo requisitos analisados, cálculo da RMI e valor da causa',
              },
            },
            required: [
              'retirementRule',
              'result',
              'rightDate',
              'estimatedRmi',
              'isBestRmi',
              'isHighestCauseValue',
              'detailedAnalysisDescription',
            ],
          },
        },
        periods: {
          type: 'array',
          description:
            'Períodos analisados a partir do CNIS e dos dados do fluxo (Raio-X do CNIS)',
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
                enum: Object.values(DeathBenefitRejectionCategoryEnum),
                description: 'Categoria previdenciária do vínculo',
              },
              gracePeriod: {
                type: 'number',
                description: 'Quantidade de competências válidas no período',
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
                  DeathBenefitRejectionPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pendência do período, quando houver',
              },
              bondOrigin: {
                type: 'string',
                description: 'Origem do vínculo empregatício',
              },
              impact: {
                type: 'string',
                description: 'Impacto do período na análise previdenciária',
              },
              complementViaMyInss: {
                type: 'boolean',
                description:
                  'Indica se deseja fazer a complementação via Meu INSS',
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
      },
      required: [
        'insuredQualityAnalysis',
        'scheduledRetirementRightAnalysis',
        'disabilityRetirementRightAnalysis',
        'dependentQualityAnalysis',
        'retirementRuleSummaries',
        'periods',
      ],
    };
  }

  private getDeathBenefitRejectionTimeAcceleratorAnalysisJsonSchema(): object {
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
                  DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum,
                ),
                description: 'Probabilidade de reconhecimento no INSS',
              },
              recognitionJudicial: {
                type: 'string',
                enum: Object.values(
                  DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum,
                ),
                description: 'Probabilidade de reconhecimento judicial',
              },
              viability: {
                type: 'string',
                enum: Object.values(
                  DeathBenefitRejectionTimeAcceleratorViabilityEnum,
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

  private getDeathBenefitRejectionResultAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        eligibilityStatus: {
          type: 'string',
          enum: ['ELIGIBLE', 'PARTIALLY_ELIGIBLE', 'NOT_ELIGIBLE'],
          description:
            'Status de elegibilidade para pensão por morte: ELIGIBLE (elegível), PARTIALLY_ELIGIBLE (parcialmente elegível), NOT_ELIGIBLE (não elegível)',
        },
        insuredQualityStatus: {
          type: 'string',
          enum: ['PROVEN', 'NOT_PROVEN'],
          description:
            'Status da qualidade de segurado do instituidor falecido: PROVEN (comprovada), NOT_PROVEN (não comprovada)',
        },
        dependentQualityStatus: {
          type: 'string',
          enum: ['PROVEN', 'PARTIALLY_PROVEN', 'NOT_PROVEN'],
          description:
            'Status geral da qualidade de dependente: PROVEN (comprovada), PARTIALLY_PROVEN (parcialmente comprovada), NOT_PROVEN (não comprovada)',
        },
        applicableRules: {
          type: 'array',
          description:
            'Resumo de regras aplicáveis para pensão por morte (RGPS)',
          items: {
            type: 'object',
            properties: {
              ruleName: {
                type: 'string',
                description: 'Nome da regra de pensão por morte',
              },
              result: {
                type: 'string',
                description: 'Resultado da aplicação da regra',
              },
              rightDate: {
                type: 'string',
                format: 'date',
                description: 'Data do direito no formato YYYY-MM-DD',
              },
              estimatedRmi: {
                type: 'string',
                description:
                  'RMI prevista em formato textual (ex: R$ 3.218,45)',
              },
              quotaQuantity: {
                type: 'number',
                description: 'Quantidade de cotas',
              },
              quotaValue: {
                type: 'string',
                description:
                  'Valor da cota em formato textual (ex: R$ 2.000,00)',
              },
              detailedAnalysis: {
                type: 'string',
                description: 'Análise detalhada da regra em formato markdown',
              },
            },
            required: ['ruleName', 'result', 'detailedAnalysis'],
          },
        },
        dependentAnalysis: {
          type: 'array',
          description: 'Resultado da análise dos dependentes',
          items: {
            type: 'object',
            properties: {
              dependentName: {
                type: 'string',
                description: 'Nome do dependente',
              },
              dependencyDegree: {
                type: 'string',
                description: 'Grau de dependência (ex: Cônjuge, Filho Menor)',
              },
              dependentQualityStatus: {
                type: 'string',
                enum: ['PROVEN', 'PARTIALLY_PROVEN', 'NOT_PROVEN'],
                description:
                  'Status da qualidade de dependente: PROVEN (comprovada), PARTIALLY_PROVEN (parcialmente comprovada), NOT_PROVEN (não comprovada)',
              },
              quotaValue: {
                type: 'string',
                description: 'Valor da cota do dependente em formato textual',
              },
              pensionStartDate: {
                type: 'string',
                format: 'date',
                description: 'Data de início da pensão no formato YYYY-MM-DD',
              },
              estimatedPensionDuration: {
                type: 'string',
                description:
                  'Duração estimada da pensão (ex: Vitalício, 4 anos)',
              },
            },
            required: [
              'dependentName',
              'dependencyDegree',
              'dependentQualityStatus',
              'estimatedPensionDuration',
            ],
          },
        },
        analysisDescription: {
          type: 'string',
          description:
            'Descrição completa e detalhada do resultado da análise de pensão por morte em formato Markdown. Deve conter o histórico previdenciário do instituidor, análise da qualidade de segurado, análise dos dependentes, aplicação das regras de pensão e conclusão fundamentada.',
        },
      },
      required: [
        'eligibilityStatus',
        'insuredQualityStatus',
        'dependentQualityStatus',
        'applicableRules',
        'dependentAnalysis',
        'analysisDescription',
      ],
    };
  }

  private getDisabilityRetirementPlanningRejectionPppAnalysisJsonSchema(): object {
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
              bondOrigin: {
                type: 'string',
                description: 'Origem do vínculo empregatício, se identificada',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningRejectionPeriodCategoryEnum,
                ),
                description: 'Categoria do período',
              },
              activityDescription: {
                type: 'string',
                description:
                  'Descrição da atividade exercida no período, se aplicável',
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
              workType: {
                type: 'string',
                enum: ['URBAN', 'RURAL'],
                description: 'Tipo de trabalho do período',
              },
              impactMonths: {
                type: 'number',
                description:
                  'Número de meses de impacto do período. Omitir quando não disponível.',
              },
              graceMonths: {
                type: 'number',
                description:
                  'Número de meses de carência do período. Omitir quando não disponível.',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o período possui pendência',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description: 'Indica se a competência está abaixo do mínimo',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Média de contribuição como string decimal, se disponível',
              },
              pendencyReason: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pendência, se houver',
              },
              periodConsideration: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningRejectionPeriodConsiderationEnum,
                ),
                description: 'Consideração do período para o benefício',
              },
              pcdStatus: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum,
                ),
                description:
                  'Grau de deficiência do segurado no período (LEVE, MODERADO ou GRAVE)',
              },
              wantsToComplementViaMeuINSS: {
                type: 'boolean',
                description:
                  'Indica se o segurado deseja complementar o período via Meu INSS.',
              },
              status: {
                type: 'boolean',
                description: 'Status do período (ativo/inativo)',
              },
            },
            required: [
              'startDate',
              'workType',
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

  private getDisabilityRetirementPlanningRejectionFirstAnalysisJsonSchema(): object {
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

    const timeSummaryScenarioSchema = {
      type: 'object',
      properties: {
        withoutResolvingPendencies: {
          type: 'string',
          description:
            'Valor sem resolver pendências. Ex: 23 anos e 4 meses ou 156 contribuições.',
        },
        resolvingPendencies: {
          type: 'string',
          description:
            'Valor resolvendo todas as pendências. Ex: 27 anos e 8 meses ou 172 contribuições.',
        },
        withTimeAccelerators: {
          type: 'string',
          description:
            'Valor com aceleradores de tempo. Ex: 30 anos e 2 meses ou 180 contribuições.',
        },
      },
      required: [
        'withoutResolvingPendencies',
        'resolvingPendencies',
        'withTimeAccelerators',
      ],
    };

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
            'Resumo do tempo de contribuição e carência apurados por cenário, dividido em tempo como PCD, tempo comum (não PCD) e totais.',
          properties: {
            pcdTime: {
              ...timeSummaryScenarioSchema,
              description: 'Tempo de contribuição como PCD em cada cenário.',
            },
            commonTime: {
              ...timeSummaryScenarioSchema,
              description:
                'Tempo de contribuição comum (não PCD) em cada cenário.',
            },
            totalTime: {
              ...timeSummaryScenarioSchema,
              description: 'Tempo de contribuição total em cada cenário.',
            },
            pcdGracePeriod: {
              ...timeSummaryScenarioSchema,
              description:
                'Carência (número de contribuições) como PCD em cada cenário.',
            },
            commonGracePeriod: {
              ...timeSummaryScenarioSchema,
              description:
                'Carência (número de contribuições) comum (não PCD) em cada cenário.',
            },
            totalGracePeriod: {
              ...timeSummaryScenarioSchema,
              description:
                'Carência (número de contribuições) total em cada cenário.',
            },
          },
          required: [
            'pcdTime',
            'commonTime',
            'totalTime',
            'pcdGracePeriod',
            'commonGracePeriod',
            'totalGracePeriod',
          ],
        },
        periods: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              bondOrigin: {
                type: 'string',
                description: 'Nome do vínculo ou empregador.',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningRejectionPeriodCategoryEnum,
                ),
                description: 'Categoria do período.',
              },
              activityDescription: {
                type: 'string',
                description: 'Descrição da atividade exercida no período.',
              },
              startDate: {
                type: 'string',
                description: 'Data de início do período no formato YYYY-MM-DD.',
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                description:
                  'Data de fim do período no formato YYYY-MM-DD. Null se ainda em aberto.',
              },
              workType: {
                type: 'string',
                enum: ['URBAN', 'RURAL'],
                description: 'Tipo de trabalho do período.',
              },
              impactMonths: {
                type: 'number',
                description:
                  'Número de meses de impacto do período. Omitir quando não disponível.',
              },
              graceMonths: {
                type: 'number',
                description:
                  'Número de meses de carência do período. Omitir quando não disponível.',
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
                  DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pendência, se houver.',
              },
              periodConsideration: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningRejectionPeriodConsiderationEnum,
                ),
                description: 'Indicação de consideração do período.',
              },
              wantsToComplementViaMeuINSS: {
                type: 'boolean',
                description:
                  'Indica se o segurado deseja complementar o período via Meu INSS.',
              },
              status: {
                type: 'boolean',
                description:
                  'Status do período (favorável/desfavorável para o segurado).',
              },
              statusPCD: {
                type: 'string',
                enum: Object.values(
                  DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum,
                ),
                description:
                  'Grau PCD considerado para o período. Só deve ser preenchido nos períodos em que houve deficiência reconhecida; nos demais, omita o campo.',
              },
              local: {
                type: 'string',
                description:
                  'Localização do vínculo (rua, município, estado, etc).',
              },
              contributionAverage: {
                type: 'number',
                description:
                  'Média de contribuição do período. Omitir quando não disponível.',
              },
              earningsHistory: {
                type: 'array',
                description:
                  'Lista APENAS das competências com pendência identificada no período.',
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
                    pendencyType: {
                      type: 'string',
                      enum: Object.values(
                        DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum,
                      ),
                      description:
                        'Tipo de pendência: COMPETENCE_BELOW_MINIMUM, NO_EXIT_DATE ou LATE_CONTRIBUTION.',
                    },
                    collectedAt: {
                      type: 'string',
                      description:
                        'Data em que a contribuição foi efetivamente recolhida, no formato YYYY-MM-DD. Preencher apenas quando pendencyType for LATE_CONTRIBUTION.',
                    },
                  },
                  required: ['competence', 'value', 'pendencyType'],
                },
              },
            },
            required: [
              'statusPCD',
              'local',
              'startDate',
              'workType',
              'isPendency',
              'competenceBelowTheMinimum',
              'status',
              'earningsHistory',
            ],
          },
        },
        disabilityAnalysis: disabilityAnalysisSchema,
      },
      required: ['clientData', 'timeSummary', 'periods', 'disabilityAnalysis'],
    };
  }

  private getDisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisJsonSchema(): object {
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

  private getDisabilityRetirementPlanningRejectionResultAnalysisJsonSchema(): object {
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
            'Resumo de regras aplicáveis para aposentadoria da pessoa com deficiência.',
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
  private getBpcElderlyAnalysisCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        diagnosis: {
          enum: ['eligible', 'ineligible', 'pending'],
          type: 'string',
          description: 'Diagnóstico da análise de BPC ao Idoso.',
        },
        totalHouseholdIncome: {
          type: 'number',
          description: 'Renda Familiar Total',
          example: 2500.75,
        },
        perCapitaIncome: {
          type: 'number',
          description: 'Renda per capita',
          example: 833.58,
        },
        eligibilityJustification: {
          type: 'string',
          description:
            'Justificativa detalhada do diagnóstico, considerando os critérios de elegibilidade do BPC ao Idoso e as especificidades do caso analisado. Deve conter uma análise fundamentada dos documentos apresentados, a situação socioeconômica do idoso e a aplicação da legislação pertinente.',
        },
        type: {
          enum: ['BPC_IDOSO'],
          type: 'string',
          description: 'Tipo de análise realizada, que é BPC IDOSO.',
        },
        benefitStartDate: {
          type: 'string',
          description: 'Data de início do benefício, se houver',
        },
        amount: {
          type: 'number',
          description: 'Valor do benefício, se houver',
          example: 606.78,
        },
        analysisDetails: {
          type: 'string',
          description:
            'Detalhamento completo da análise, incluindo a avaliação de cada documento apresentado, a situação socioeconômica do idoso, a aplicação dos critérios legais e a conclusão sobre a elegibilidade para o BPC ao Idoso. Esta seção deve fornecer uma visão abrangente do processo de análise, destacando os pontos fortes e as possíveis fragilidades do caso.',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'Detalhamento completo da análise, incluindo a avaliação de cada documento apresentado, a situação socioeconômica do idoso, a aplicação dos critérios legais e a conclusão sobre a elegibilidade para o BPC ao Idoso. Esta seção deve fornecer uma visão abrangente do processo de análise, destacando os pontos fortes e as possíveis fragilidades do caso. A analise técnica deve ser formatada em Markdown, pronta para exportação em PDF/DOCX. Deve conter todas as seções: Diagnóstico, Renda Familiar Total, Renda per capita, Justificativa de Elegibilidade, Tipo de Análise, Data de Início do Benefício, Valor do Benefício e Detalhes da Análise. Formate com títulos (##), listas e tabelas em Markdown quando aplicável. ',
        },
        legalRequirementsMet: {
          type: 'string',
          enum: [
            'Preenchidos os requisitos legais para concessão do beneficio assistencial ao idoso',
            'Não preenchidos os requisitos legais para concessão do beneficio assistencial ao idoso',
          ],
          description:
            'Diagnóstico sobre o preenchimento dos requisitos legais para concessão do BPC ao Idoso.',
        },
        perCapitaIncomeBelowQuarterMinimumWage: {
          type: 'string',
          enum: ['Atende ao Critério Legal', 'Não Atende critério legal'],
          description:
            'Indica se a renda per capita familiar é inferior a 1/4 do salário mínimo, conforme exigido para o BPC ao Idoso.',
        },
        ageEqualOrAbove65Years: {
          type: 'string',
          enum: ['Atende ao Critério Legal', 'Não Atende critério legal'],
          description:
            'Indica se o requerente possui idade igual ou superior a 65 anos, conforme exigido para o BPC ao Idoso.',
        },
      },
      required: [
        'diagnosis',
        'totalHouseholdIncome',
        'perCapitaIncome',
        'eligibilityJustification',
        'type',
        'benefitStartDate',
        'amount',
        'analysisDetails',
        'completeAnalysisDownload',
        'legalRequirementsMet',
        'perCapitaIncomeBelowQuarterMinimumWage',
        'ageEqualOrAbove65Years',
      ],
    };
  }

  private getAccidentAssistanceTerminatedDecisionDetailsJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        decision: {
          type: 'string',
          enum: ['TERMINATED', 'MAINTAINED'],
          description:
            'Decisão final sobre o termo de assistência acidente: TERMINATED (termo de assistência acidente encerrado) ou MAINTAINED (termo de assistência acidente mantido).',
        },
        terminationJustification: {
          type: 'string',
          description:
            'Justificativa detalhada para a decisão de encerramento do termo de assistência acidente, incluindo os fundamentos legais, análise dos documentos apresentados e a situação do segurado.',
        },
        analysis: {
          type: 'string',
          description:
            'Análise detalhada do caso, considerando os critérios para encerramento do termo de assistência acidente, a situação do segurado e a aplicação da legislação pertinente. Deve conter uma avaliação dos documentos apresentados, a situação do segurado e os fundamentos legais para a decisão tomada.',
        },
      },
    };
  }

  private getAccidentAssistanceTerminatedFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        qualitySecurity: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description:
                'Status da qualidade de segurado se foi mantida ou não na DFG',
              enum: ['MAINTAINED', 'NOT_MAINTAINED'],
            },
            description: {
              type: 'string',
              description:
                'Descrição detalhada da conclusão da análise se a qualidade do segurada foi mantida na Dii',
            },
            required: ['status', 'description'],
          },
        },
        assessmentSequelae: {
          type: 'object',
          properties: {
            existsSequelae: {
              type: 'string',
              enum: ['Confirmada', 'Não confirmada'],
              description:
                'Indicação de existência de sequelas decorrentes do acidente',
            },
            sequelaeCompatibility: {
              type: 'string',
              enum: ['Confirmada', 'Não confirmada'],
              description:
                'Indicação de compatibilidade das sequelas decorrentes do acidente',
            },
            partialWorkCapacityMaintenance: {
              type: 'string',
              enum: [
                'Capacidade laboral parcialmente comprometida',
                'Capacidade laboral não comprometida',
                'Capacidade laboral totalmente comprometida',
              ],
              description:
                'Indicação de manutenção da capacidade laboral parcial decorrente do acidente',
            },
            description: {
              type: 'string',
              description:
                'Descrição detalhada da conclusão da análise das sequelas decorrentes do acidente, incluindo a existência de sequelas, a compatibilidade das sequelas com o acidente e a manutenção da capacidade laboral parcial decorrente do acidente com a conclusão da análise',
            },
          },
          required: [
            'existsSequelae',
            'sequelaeCompatibility',
            'partialWorkCapacityMaintenance',
            'description',
          ],
        },
      },
      required: ['qualitySecurity', 'assessmentSequelae'],
    };
  }

  private getAccidentAssistanceTerminatedCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['AUXILIO_ACIDENTE'],
          description:
            'Modalidade da análise realizada, que é Auxílio Acidente',
        },
        isEligible: {
          type: 'string',
          enum: ['Sim', 'Não'],
          description:
            'Indicação de elegibilidade para manutenção do benefício de auxílio-acidente.',
        },
        startDate: {
          type: 'string',
          description:
            'Data de início da concessão do benefício de auxílio-acidente. Retorne em YYYY-MM-DD ou null se o benefício não for elegível para manutenção ou se a data de início não puder ser determinada com base nos documentos analisados.',
        },
        rmiPreviuoslyGranted: {
          type: 'string',
          description:
            'Valor da RMI do benefício de auxílio-acidente previsto para recebimento caso o benefício seja elegível para manutenção. Retorne como string em formato decimal (ex: "1234.56") ou null se o benefício não for elegível para manutenção ou se o valor da RMI não puder ser determinado com base nos documentos analisados.',
        },
        estimatedValueClaim: {
          type: 'string',
          description:
            'Valor estimado do benefício de auxílio-acidente cessado a ser recebido caso o benefício seja elegível para manutenção. Retorne como string em formato decimal (ex: "1234.56") ou null se o benefício não for elegível para manutenção ou se o valor estimado do benefício não puder ser determinado com base nos documentos analisados.',
        },
        analysisResult: {
          type: 'string',
          description:
            'Texto explicativo completo sobre o resultado da análise, perspectivas processuais e recomendações para o caso de indeferimento.',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'Análise completa e detalhada do caso de auxílio-acidente cessado, incluindo a avaliação da qualidade de segurado, análise das sequelas decorrentes do acidente, aplicação das regras de manutenção do benefício e conclusão fundamentada sobre a elegibilidade para manutenção do benefício. A análise deve ser formatada em Markdown, pronta para exportação em PDF/DOCX. Deve conter todas as seções: Categoria da Análise, Elegibilidade para Manutenção do Benefício, Data de Início do Benefício, RMI Prevista e Análise Detalhada.',
        },
      },
      required: [
        'category',
        'isEligible',
        'startDate',
        'rmiPreviuoslyGranted',
        'estimatedValueClaim',
        'analysisResult',
        'completeAnalysisDownload',
      ],
    };
  }
}
