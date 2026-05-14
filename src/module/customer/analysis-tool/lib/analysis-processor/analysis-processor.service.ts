import { Inject, Injectable } from '@nestjs/common';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';
import { TimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-analysis-type.enum';
import { TimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-recognition-inss.enum';
import { TimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-viability.enum';
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
import { RetirementPermanentDisabilityRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-category.enum';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentProbativeForceEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-document-probative-force.enum';
import { TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-timeline-classification.enum';
import { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-pendency-reason.enum';
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
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON;
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS, não realize calculos como valores salariais, use estritamente os fornecidos.
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
                    description:
                      'Linha do tempo COMPLETA cobrindo TODOS os períodos desde o início da vida contributiva até hoje. OBRIGATÓRIO: incluir períodos com activityType "periodo_sem_atividade" para TODOS os intervalos entre contribuições onde não havia nenhum vínculo ativo. Não deixe buracos na linha do tempo.',
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
                          description:
                            'Tipo de atividade: "atividade_professor" para períodos de magistério, "atividade_comum" para outros vínculos (CLT, servidor, etc.), "periodo_sem_atividade" para lacunas/intervalos sem nenhum vínculo contributivo',
                        },
                        type: {
                          type: 'string',
                          description: 'Classificacao do periodo',
                        },
                        location: {
                          type: 'string',
                          description: 'Local do periodo ou nome do vínculo',
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
                          description:
                            'Análise detalhada da regra em MARKDOWN estruturado. OBRIGATÓRIO conter: (1) título da regra com "##"; (2) seção de requisitos com lista "- " mostrando cada requisito, tempo necessário vs tempo atual, e se foi cumprido (✅ ou ❌); (3) seção "### Situação Atual" com o que falta ou por que foi cumprida; (4) seção "### Estratégia" com orientação prática. Exemplo: "## Regra X\\n\\n### Requisitos\\n- ✅ Tempo de magistério: necessário 25 anos / possui 26 anos\\n- ❌ Idade mínima: necessário 57 anos / possui 52 anos\\n\\n### Situação Atual\\n[parágrafo]\\n\\n### Estratégia\\n[parágrafo com recomendação]"',
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
                    description:
                      'Análise técnica final completa em formato MARKDOWN estruturado. OBRIGATÓRIO conter: (1) um título principal com "#"; (2) pelo menos 3 seções com "##" cobrindo: diagnóstico previdenciário, pendências identificadas, e recomendações estratégicas; (3) listas com "- " ou "1." dentro das seções; (4) texto em negrito "**...**" para destacar pontos críticos; (5) um parágrafo conclusivo. Exemplo de estrutura: "# Observação Técnica\\n\\n## 1. Diagnóstico Previdenciário\\n[parágrafo]\\n\\n**Situação Atual:**\\n- Tempo de Magistério: X\\n- ...\\n\\n## 2. Pendências Identificadas\\n1. ...\\n\\n## 3. Recomendações Estratégicas\\n..."',
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
- O campo \`statusPCD\` só deve ser preenchido nos períodos em que houve deficiência reconhecida no período; nos demais, omita o campo.
- NÃO inclua o campo \`earningsHistory\` na resposta — esse dado já está armazenado e não deve ser reenviado.

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
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON;
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS, não realize cálculos como valores salariais, use estritamente os fornecidos.
- Não incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.

## Instruções para os campos em Markdown
Os campos \`retirementAnalysis\` (por regra) e \`analysisResult\` (análise geral) devem ser gerados em **Markdown rico**, com:
- Títulos com ## e ###
- Subtítulos e seções bem definidas
- Tabelas Markdown (| coluna | coluna |) para apresentar dados comparativos, requisitos, datas e valores
- Listas com marcadores (- item) ou numeradas (1. item) para enumerar critérios, documentos, pendências
- Negrito (**texto**) para destacar termos técnicos, datas, valores monetários e conclusões
- Seções como: Resumo do Caso, Análise da Incapacidade, Qualidade de Segurado, Carência, Conclusão, Estratégia Recomendada
- O texto deve ser extenso, detalhado e juridicamente fundamentado, com referências às normas aplicáveis

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
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: {
            type: 'object',
            properties: {
              tipoBeneficio: {
                type: 'string',
                description: 'Tipo do benefício previdenciário concedido',
              },
              nomeSegurado: {
                type: 'string',
                description: 'Nome completo do segurado beneficiário',
              },
              dib: {
                type: 'string',
                description:
                  'Data de início do benefício (DIB) no formato DD/MM/AAAA',
              },
              rmi: {
                type: 'string',
                description:
                  'Renda mensal inicial (RMI) do benefício. Exemplo: R$ 1.234,56',
              },
              rma: {
                type: 'string',
                description:
                  'Renda mensal atual (RMA) do benefício. Exemplo: R$ 1.234,56',
              },
              competenciasNaoConsideradas: {
                type: 'array',
                description:
                  'Lista de competências que não foram consideradas no cálculo do benefício',
                items: {
                  type: 'object',
                  properties: {
                    competencia: {
                      type: 'string',
                      description:
                        'Mês/ano da competência no formato MM/AAAA. Exemplo: 03/2019',
                    },
                    valor: {
                      type: 'string',
                      description:
                        'Valor da contribuição não considerada. Exemplo: R$ 500,00',
                    },
                    motivo: {
                      type: 'string',
                      description:
                        'Motivo pelo qual a competência não foi considerada no cálculo',
                    },
                  },
                  required: ['competencia', 'valor', 'motivo'],
                },
              },
            },
            required: [
              'tipoBeneficio',
              'nomeSegurado',
              'dib',
              'rmi',
              'rma',
              'competenciasNaoConsideradas',
            ],
          },
        }),
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
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getSpecialRetirementGrantCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getSpecialRetirementRejectionFirstAnalysis(
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
- Para cada item de \`workPeriods\`, use prioritariamente os dados estruturados já enviados nos arquivos do prompt; não invente valores.

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
                this.getSpecialRetirementRejectionFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getSpecialRetirementRejectionCompleteAnalysis(
    systemInstruction: string,
    _cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getSpecialRetirementRejectionSimplifiedAnalysis(
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
                      description: 'Indica se à a melhor opção financeira',
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
                  'Tipo de análise mais recomendada para o perfil do cliente com base nas informações recebidas',
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

  public async getDeathBenefitGrantTimeAcceleratorAnalysis(
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

  public async getTemporaryDisabilityBenefitsTerminatedFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    return this.getTemporaryIncapacityBenefitRejectionFirstAnalysis(
      systemInstruction,
      cnisAnalysisJson,
      files,
      asJson,
    );
  }

  public async getDeathBenefitGrantResultAnalysis(
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

  public async getTemporaryDisabilityBenefitsTerminatedCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    return this.getTemporaryIncapacityBenefitRejectionCompleteAnalysis(
      systemInstruction,
      cnisAnalysisJson,
      files,
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

  public async getTemporaryDisabilityBenefitsTerminatedSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return this.getTemporaryIncapacityBenefitRejectionSimplifiedAnalysis(
      systemInstruction,
      files,
    );
  }

  public async getRuralOrHybridRetirementRejectionFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANT
- Base the technical analysis primarily on the already processed CNIS analysis in JSON format.
- Calculate only values that are not already present in the provided CNIS analysis.
- Return strictly a JSON object compatible with the requested schema.

Processed CNIS analysis:
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
                this.getRuralOrHybridRetirementRejectionFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getRuralOrHybridRetirementRejectionCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANT
- Base the technical analysis primarily on the already processed CNIS analysis in JSON format.
- Calculate only values that are not already present in the provided CNIS analysis.
- Return strictly a JSON object compatible with the requested schema.

Processed CNIS analysis:
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
            this.getRuralOrHybridRetirementRejectionCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getRuralOrHybridRetirementRejectionSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
    analysisJson?: string,
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        ...(analysisJson !== undefined && { prompt: analysisJson }),
        ...(files.length > 0 && { promptFiles: files }),
      }),
    );
  }

  public async getTimeAcceleratorAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANT
- Return strictly a JSON object compatible with the requested schema.
- Use only enum values provided by the schema for recognition and viability fields.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: this.getTimeAcceleratorAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
    systemInstruction: string,
    customerName: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
You will receive ${files.length} document file(s). Analyze each one individually and return EXACTLY ${files.length} item(s) in the JSON array — one item per uploaded file, in the same order they were provided. Do NOT merge multiple files into a single item.

For each document, verify if the holder name matches the customer name exactly or with clear equivalent variation.

Base your analysis exclusively on the provided documents. Do not invent information.
Return strictly JSON compatible with the requested schema, with no external markdown, no comments, and no additional text.

    Customer name: ${customerName}
    `;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisJsonSchema(
              files.length,
            ),
        }),
      }),
    );
  }

  public async getRuralOrHybridRetirementAnalysisFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    return this.getRuralOrHybridRetirementRejectionFirstAnalysis(
      systemInstruction,
      cnisAnalysisJson,
      files,
      asJson,
    );
  }

  public async getRuralOrHybridRetirementAnalysisCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    return this.getRuralOrHybridRetirementRejectionCompleteAnalysis(
      systemInstruction,
      cnisAnalysisJson,
      files,
    );
  }

  public async getRuralOrHybridRetirementAnalysisSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
    analysisJson?: string,
  ): Promise<string | null> {
    return this.getRuralOrHybridRetirementRejectionSimplifiedAnalysis(
      systemInstruction,
      files,
      analysisJson,
    );
  }

  public async getRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis(
    systemInstruction: string,
    customerName: string,
    files: Buffer[],
  ): Promise<string | null> {
    return this.getRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
      systemInstruction,
      customerName,
      files,
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

  public async getAccidentBenefitRejectionFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    useJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS.
- Não incluir tag <br> na resposta.

Análise processada do CNIS:
  ${cnisAnalysisJson}
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: useJson
          ? ResponseConfigInputModel.build({
              responseMimeType:
                GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
              jsonSchema:
                this.getAccidentBenefitRejectionFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getAccidentBenefitRejectionSecondAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS.
- Não incluir tag <br> na resposta.

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

  public async getAccidentBenefitRejectionCompleteAnalysis(
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
            this.getAccidentBenefitRejectionCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getAccidentBenefitRejectionSimplifiedAnalysis(
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

  public async getBpcDisabilityDenialInssDecisionAnalysis(
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

  public async getBpcDisabilityDenialFirstAnalysis(
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

  public async getBpcElderlyCessationInssDecisionAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Analise a decisão administrativa de cessação ou suspensão do BPC ao Idoso.
- Extraia, quando disponível, NB, data da decisão, motivo da cessação/suspensão, fundamentos usados pelo INSS, prazo recursal e pontos técnicos de contestação.
- Não invente informações ausentes nos documentos; quando algo não estiver claro, indique a pendência.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
      }),
    );
  }

  public async getBpcElderlyCessationFirstAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Cruze os dados do formulário, cliente, CadÚnico, CNIS, composição familiar, renda, documentos anexados e decisão do INSS.
- Foque nos critérios do BPC ao Idoso em cenário de cessação/suspensão: idade mínima, renda familiar, renda per capita, atualização cadastral, composição do grupo familiar, prazo recursal e fragilidades da decisão administrativa.
- Não incluir tag <br> na resposta.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
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

  public async getBpcDisabilityDenialCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente nos dados e documentos fornecidos.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- O campo \`analysisResult\` deve conter o resultado consolidado em Markdown rico, com títulos, parágrafos curtos e listas quando útil. Ele será convertido para HTML pelo backend antes de ser exibido.
- O campo \`analysisDetailedText\` deve conter a fundamentação técnica e jurídica detalhada em Markdown rico, com hierarquia visual semelhante ao relatório de Atividade Especial: título principal, seções numeradas, subseções, listas e tabelas quando necessário. Não devolva texto corrido único.
- O campo \`completeAnalysisDownload\` deve conter a versão completa para download em Markdown rico, pronta para conversão em HTML/PDF/DOCX pelo backend. Use headings Markdown (#, ##, ###), parágrafos, listas e tabelas. Não use tags HTML e não use tags <br>.
- Para cada item de \`applicableRules\`, preencha \`title\` com o nome da regra/critério, \`description\` com a análise fundamentada daquele critério no caso concreto, e \`status\` com o resultado objetivo (ex.: "ATENDIDO", "NÃO ATENDIDO", "PARCIALMENTE ATENDIDO", "PENDENTE").
- Para cada item de \`benefitSummaries\`, preencha \`benefitType\` com o tipo/cenário de benefício analisado, \`result\` com o resultado do cenário (ex.: "ELEGÍVEL", "NÃO ELEGÍVEL", "ELEGÍVEL VIA FLEXIBILIZAÇÃO JURISPRUDENCIAL"), \`dib\` com a data estimada de início do benefício quando aplicável, \`expectedMonthlyBenefit\` com o valor estimado da RMI quando calculável, e \`detailedAnalysis\` com a análise detalhada daquele cenário em Markdown estruturado.
- Não invente dados; utilize exclusivamente as informações fornecidas.
- Os demais campos devem respeitar as descrições e orientações do schema.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: this.getBpcDisabilityDenialCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getBpcDisabilityGrantCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente nos dados e documentos fornecidos.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- O campo \`analysisResult\` deve conter o resultado consolidado em Markdown rico, com títulos, parágrafos curtos e listas quando útil. Ele será convertido para HTML pelo backend antes de ser exibido.
- O campo \`retirementRules\` deve listar regras juridico-previdenciarias (por artigo/beneficio), por exemplo: BPC pessoa com deficiência, Salário-maternidade.
- Para cada item de \`retirementRules\`, preencha obrigatoriamente: \`benefitType\`, \`result\` (boolean), \`benefitStartDate\`, \`RMIprevista\` e \`detaildAnalysis\`.
- Não invente dados; utilize exclusivamente as informações fornecidas.
- Os demais campos devem respeitar as descrições e orientações do schema.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: this.getBpcDisabilityGrantCompleteAnalysisJsonSchema(),
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

  public async getRetirementPermanentDisabilityRejectionInssDecisionAnalysis(
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

  public async getRetirementPermanentDisabilityRejectionFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    structured: boolean,
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
- O campo \`earningsHistory\` de cada período deve conter APENAS as competências com pendência.
- Não inclua competências sem pendência. Retorne array vazio quando não houver nenhuma.

Análise processada do CNIS:
  ${cnisAnalysisJson}
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: structured
          ? ResponseConfigInputModel.build({
              responseMimeType:
                GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
              jsonSchema:
                this.getRetirementPermanentDisabilityRejectionFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getRetirementPermanentDisabilityRejectionResultAnalysis(
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
- O campo \`simplifiedAnalysis\` deve conter a análise simplificada em Markdown, pronta para exportação.
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
            this.getRetirementPermanentDisabilityRejectionResultAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getRetirementPermanentDisabilityRejectionSimplifiedAnalysis(
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

  public async getBpcDisabilityDenialSimplifiedAnalysis(
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

  public async getBpcDisabilityGrantSimplifiedAnalysis(
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

  public async getBpcDisabilityTerminationInssDecisionAnalysis(
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

  public async getBpcDisabilityTerminationCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- O campo \`completeAnalysisDownload\` deve conter a análise detalhada em Markdown, pronta para exportação em PDF/DOCX.
- O campo \`analysisResult\` deve conter um resumo textual objetivo do resultado.
- O campo \`analysisDetailedText\` deve conter a fundamentação detalhada em texto corrido.
- Cada item de \`applicableRules\` deve representar uma regra aplicável à análise do BPC Pessoa com Deficiência cessado.
- Cada item de \`benefitSummaries\` deve representar um cenário ou benefício resumido para a tela final.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getBpcDisabilityTerminationCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getBpcDisabilityTerminationSimplifiedAnalysis(
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

  public async getMaternityPayRejectionFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS.
- Não incluir tag <br> na resposta.

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

  public async getMaternityPayRejectionSecondAnalysis(
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
          jsonSchema: this.getMaternityPayRejectionSecondAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getMaternityPayRejectionCompleteAnalysis(
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
- Garanta que o campo analysisResult esteja sempre preenchido com parecer conclusivo técnico e objetivo.
- No campo causeValue, retorne string com o valor monetário correto (ex.: "R$ 12.345,67") e nunca use 0 como valor padrão.

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
          jsonSchema: this.getMaternityPayRejectionCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getMaternityPayRejectionSimplifiedAnalysis(
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

  public async getTemporaryIncapacityBenefitRejectionInssDecisionAnalysis(
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

  public async getTemporaryDisabilityBenefitsTerminatedInssDecisionAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return this.getTemporaryIncapacityBenefitRejectionInssDecisionAnalysis(
      systemInstruction,
      files,
    );
  }

  public async getBpcElderlyCessationCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Retorne estritamente um objeto JSON válido compatível com o schema solicitado.
- O campo \`completeAnalysisDownload\` deve conter a análise detalhada em Markdown, pronta para exportação em PDF/DOCX.
- O campo \`analysisResult\` deve conter um resumo objetivo em Markdown, com títulos curtos e bullets.
- O campo \`analysisDetailedText\` deve conter a fundamentação detalhada em Markdown estruturado para renderização na tela "Resultado Final da Análise".
- Não gere \`analysisDetailedText\` em parágrafo único; use títulos, subtítulos, listas curtas e tabelas quando houver dados objetivos.
- Cada item de \`applicableRules\` deve representar uma regra aplicável ao BPC ao Idoso cessado/suspenso.
- Cada item de \`benefitSummaries\` deve representar um cenário ou benefício resumido para a tela final.
- Preencha diagnóstico, renda familiar total, renda per capita, requisitos legais, regra de renda e idade mínima com base nos documentos fornecidos.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: this.getBpcElderlyCessationCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getTemporaryIncapacityBenefitRejectionFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente nos dados fornecidos.
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
                this.getTemporaryIncapacityBenefitRejectionFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getTemporaryIncapacityBenefitRejectionCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
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
            this.getTemporaryIncapacityBenefitRejectionCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getBpcElderlyCessationSimplifiedAnalysis(
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

  public async getTemporaryIncapacityBenefitRejectionSimplifiedAnalysis(
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

  public async getPermanentIncapacityBenefitTerminatedInssDecisionAnalysis(
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

  public async getPermanentIncapacityBenefitTerminatedFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente nos dados fornecidos.
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
                this.getPermanentIncapacityBenefitTerminatedFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getPermanentIncapacityBenefitTerminatedCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
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
            this.getPermanentIncapacityBenefitTerminatedCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getPermanentIncapacityBenefitTerminatedSimplifiedAnalysis(
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

  public async getMaternityPayGrantFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    contributorGender: GenderEnum | null,
    asJson = true,
  ): Promise<string | null> {
    const genderLabel =
      contributorGender === GenderEnum.FEMALE
        ? 'Feminino'
        : contributorGender === GenderEnum.MALE
          ? 'Masculino'
          : 'Não informado';

    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS, não realize cálculos como valores salariais, use estritamente os fornecidos.
- Não incluir tag <br> na resposta.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- Para cada item de \`periods\`, use prioritariamente os dados estruturados já enviados nos arquivos do prompt; não invente valores.
- O campo \`contributionAverage\` representa a média das remunerações do período já informada nos dados estruturados; quando esse valor estiver disponível, reutilize exatamente esse valor e não retorne \`0\`.
- Quando o valor de \`contributionAverage\` não estiver presente nos dados estruturados do período, omita esse campo em vez de retornar \`0\`.
- O campo \`belowMinimumContributions\` deve conter somente as competências cujos valores ficaram abaixo do mínimo.
- Quando não houver competências abaixo do mínimo, retorne \`belowMinimumContributions: []\`.
- O campo \`competenceBelowTheMinimum\` deve ser \`true\` somente quando houver ao menos um item em \`belowMinimumContributions\`; caso contrário, deve ser \`false\`.
- Analise a qualidade de segurado da requerente com base nos períodos e na data do evento gerador (parto/adoção/aborto).
- Analise o cumprimento da carência necessária para o salário-maternidade.
- Analise a elegibilidade para o benefício com base na categoria de segurada.
- O campo \`lastContribution\` deve conter a data da última contribuição identificada no CNIS no formato YYYY-MM-DD, ou null se não identificada.
- O campo \`categoryAtDfg\` deve descrever a categoria contributiva do segurado na data do fato gerador (DFG), ex: "desempregada (ex-empregada)".
- O campo \`employmentBondStatus\` deve descrever o status do vínculo contributivo na data do fato gerador, ex: "Inativo - desempregada há 7 meses na DFG".
Sexo do contribuinte: ${genderLabel}
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
              jsonSchema: this.getMaternityPayGrantFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getMaternityPayGrantResultAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON.
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- O campo \`completeAnalysisDownload\` deve conter HTML completo e bem formatado com toda a análise detalhada, pronto para conversão em PDF. Deve conter todos os dados analisados, e uma explicação técnica de todos os dados
- O campo \`analysisDescription\` deve conter um texto explicativo completo sobre o resultado da análise e as perspectivas do caso.
- Não incluir tag <br> na resposta no campo \`analysisDescription\`.

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
          jsonSchema: this.getMaternityPayGrantResultAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getMaternityPayGrantSimplifiedAnalysis(
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

  public async getTeacherRetirementPlanningRejectionFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANT
- Base the technical analysis primarily on the already processed CNIS analysis in JSON format.
- Calculate only values that are not already present in the provided CNIS analysis.
- Return strictly a JSON object compatible with the requested schema.
- For "specialTime" and "commonTime", consider "special" as exclusive teaching (magistério) time and "common" as non-teaching contribution time.
- For each period, classify using timelineClassification: TEACHER_TIME for periods of exclusive teaching activity, COMMON_TIME for regular urban/rural contribution periods, PENDENCY_PERIOD for periods with pendencies, INACTIVITY_PERIOD for gaps without activity.
- Include earningsHistory ONLY for competences with pendencies (below minimum, late contribution, no exit date). Return empty array when no pendencies exist.
- CRITICAL: For nullable fields, use JSON null (not the string "null"). Example: "endDate": null (correct), "endDate": "null" (WRONG).

Processed CNIS analysis:
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
                this.getTeacherRetirementPlanningRejectionFirstAnalysisJsonSchema(),
            })
          : null,
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

  public async getTeacherRetirementPlanningRejectionCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANT
- Base the technical analysis primarily on the already processed CNIS analysis in JSON format.
- Calculate only values that are not already present in the provided CNIS analysis.
- Return strictly a JSON object compatible with the requested schema.

Processed CNIS analysis:
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
            this.getTeacherRetirementPlanningRejectionCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getTeacherRetirementPlanningRejectionSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
    analysisJson?: string,
  ): Promise<string | null> {
    return this.getRuralOrHybridRetirementRejectionSimplifiedAnalysis(
      systemInstruction,
      files,
      analysisJson,
    );
  }

  public async getTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysis(
    systemInstruction: string,
    customerName: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
You will receive ${files.length} document file(s). Analyze each one individually and return EXACTLY ${files.length} item(s) in the JSON array — one item per uploaded file, in the same order they were provided. Do NOT merge multiple files into a single item.

For each document, verify if the holder name matches the customer name exactly or with clear equivalent variation.

Customer name: ${customerName}

Set ownName as true when the document holder belongs to this customer, otherwise false.

For probativeForce, classify each document as:
- HIGH: The document has strong probative force for proving teaching activity (e.g., CTPS with teaching role, CTC - Certidão de Tempo de Contribuição, official school records, employment contracts specifying teaching).
- LOW: The document has weak or indirect probative force (e.g., pay stubs without role specification, generic declarations, documents that only partially prove teaching activity).
- NONE: The document has no probative force for proving teaching activity (e.g., unrelated documents, illegible documents, documents from non-teaching activities).
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisJsonSchema(
              files.length,
            ),
        }),
      }),
    );
  }

  public async getTeacherRetirementPlanningRejectionInssDecisionAnalysis(
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

  public async getTeacherRetirementPlanningRejectionPppAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- Retorne estritamente um objeto JSON compatível com o schema solicitado.
- Cada item do array \`periods\` deve ser compatível com a criação de um período na análise de indeferimento de aposentadoria do professor.
- Preencha \`endDate\`, \`pendencyReason\`, \`contributionAverage\`, \`periodConsideration\` e \`timelineClassification\` somente quando essas informações estiverem disponíveis nos documentos analisados.
- O campo \`timelineClassification\` indica a classificação do período na linha do tempo (PCD_TIME, COMMON_TIME, INACTIVITY_PERIOD, TEACHER_TIME ou PENDENCY_PERIOD).
- O campo \`hasSpecialPeriod\` indica se o período possui atividade especial identificada no PPP.
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
            this.getTeacherRetirementPlanningRejectionPppAnalysisJsonSchema(),
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
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt: cnisAnalysisJson,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema:
            this.getAccidentAssistanceTerminatedFirstAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getRetirementPermanentDisabilityRevisionCompleteAnalysis(
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
            this.getRetirementPermanentDisabilityRevisionCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getRetirementPermanentDisabilityRevisionSimplifiedAnalysis(
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

  public async getRetirementPermanentDisabilityRevisionFirstAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
    asJson = true,
  ): Promise<string | null> {
    const prompt = `
# IMPORTANT
- Base the technical analysis primarily on the already processed CNIS analysis in JSON format.
- Calculate only values that are not already present in the provided CNIS analysis.
- Return strictly a JSON object compatible with the requested schema.

Processed CNIS analysis:
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
                this.getRetirementPermanentDisabilityRevisionFirstAnalysisJsonSchema(),
            })
          : null,
      }),
    );
  }

  public async getElderlyBpcRejectionInssDecisionAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANT
- Analyze the INSS administrative denial decision for elderly BPC based on the provided case data and attached administrative proceeding files.
- Identify the key denial grounds, legal basis cited by INSS, critical factual points, and possible inconsistencies.
- Highlight the strongest technical arguments for administrative appeal or judicial challenge.
- When data is missing, explicitly state that it was not identified.
- Return a clear, structured markdown text suitable for direct reading by a social security lawyer.
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
      }),
    );
  }

  public async getElderlyBpcRejectionCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANT
- Base the technical analysis primarily on the already processed CNIS analysis in JSON format.
- Calculate only values that are not already present in the provided CNIS analysis.
- Return strictly a JSON object compatible with the requested schema.

Processed CNIS analysis:
  ${cnisAnalysisJson}
`;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
        responseConfig: ResponseConfigInputModel.build({
          responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          jsonSchema: this.getElderlyBpcRejectionCompleteAnalysisJsonSchema(),
        }),
      }),
    );
  }

  public async getElderlyBpcRejectionSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
    completeAnalysis: string,
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt: completeAnalysis,
        ...(files.length > 0 && { promptFiles: files }),
      }),
    );
  }

  private getRetirementPermanentDisabilityRevisionFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        benefitAnalysis: {
          type: 'object',
          properties: {
            benefitType: {
              type: 'string',
              description: 'Tipo de benefício previdenciário concedido.',
            },
            dib: {
              type: 'string',
              description: 'DIB no formato DD/MM/YYYY.',
            },
            initialMonthlyIncome: {
              type: 'number',
              description: 'RMI - Renda Mensal Inicial.',
            },
            updatedMonthlyIncome: {
              type: 'number',
              description: 'RMA - Renda Mensal Atualizada.',
            },
            insuredName: {
              type: 'string',
              description: 'Nome completo do segurado.',
            },
          },
          required: [
            'benefitType',
            'dib',
            'initialMonthlyIncome',
            'updatedMonthlyIncome',
            'insuredName',
          ],
        },
        contributionTime: {
          type: 'object',
          properties: {
            minimumRequired: {
              type: 'object',
              properties: {
                withoutPendingIssues: {
                  type: 'string',
                  description:
                    'Tempo reconhecido sem resolver pendências. Ex: 23 years and 4 months.',
                },
                afterResolvingPendingIssues: {
                  type: 'string',
                  description:
                    'Tempo após regularização das pendências. Ex: 27 years and 8 months.',
                },
                withCollaborators: {
                  type: 'string',
                  description:
                    'Tempo considerando vínculos adicionais. Ex: 30 years and 2 months.',
                },
              },
              required: [
                'withoutPendingIssues',
                'afterResolvingPendingIssues',
                'withCollaborators',
              ],
            },
            description: {
              type: 'string',
              description:
                'Texto explicativo sobre regras de tempo de contribuição.',
            },
          },
          required: ['minimumRequired', 'description'],
        },
        concessionLetterBreakdown: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              competence: {
                type: 'string',
                description: 'Competência no formato MM/YYYY.',
              },
              amount: {
                type: 'number',
                description: 'Valor do salário de contribuição.',
              },
              reasonNotConsidered: {
                type: 'string',
                description:
                  'Motivo pelo qual a competência não foi considerada.',
              },
              action: {
                type: 'string',
                description:
                  'Ação recomendada para regularizar ou incluir a competência.',
              },
            },
            required: ['competence', 'amount', 'reasonNotConsidered', 'action'],
          },
        },
      },
      required: [
        'benefitAnalysis',
        'contributionTime',
        'concessionLetterBreakdown',
      ],
    };
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

  private getTeacherRetirementPlanningRejectionFirstAnalysisJsonSchema(): object {
    const timeBreakdownSchema = (label: string): object => ({
      type: 'object',
      properties: {
        withoutResolvingPendencies: {
          type: 'string',
          description: `${label} sem resolver pendências. Ex: 12 anos e 3 meses`,
        },
        resolvingPendencies: {
          type: 'string',
          description: `${label} resolvendo todas as pendências documentais. Ex: 14 anos e 1 mês`,
        },
        withAccelerators: {
          type: 'string',
          description: `${label} resolvendo pendências e computando aceleradores de tempo. Ex: 15 anos e 6 meses`,
        },
      },
      required: [
        'withoutResolvingPendencies',
        'resolvingPendencies',
        'withAccelerators',
      ],
    });

    const gracePeriodBreakdownSchema = (label: string): object => ({
      type: 'object',
      properties: {
        withoutResolvingPendencies: {
          type: 'number',
          description: `Quantidade de ${label} sem resolver pendências. Ex: 153`,
        },
        resolvingPendencies: {
          type: 'number',
          description: `Quantidade de ${label} resolvendo todas as pendências documentais. Ex: 168`,
        },
        withAccelerators: {
          type: 'number',
          description: `Quantidade de ${label} resolvendo pendências e computando aceleradores de tempo. Ex: 180`,
        },
      },
      required: [
        'withoutResolvingPendencies',
        'resolvingPendencies',
        'withAccelerators',
      ],
    });

    return {
      type: 'object',
      properties: {
        summary: {
          type: 'object',
          description:
            'Resumo do tempo de contribuição e carência apurados por cenário, separando tempo de magistério (special) e tempo comum (common).',
          properties: {
            specialTime: {
              ...timeBreakdownSchema(
                'Tempo de contribuição exclusivo em magistério',
              ),
              description:
                'Tempo de contribuição exclusivo em atividades de magistério (ensino infantil, fundamental e médio) apurado em cada cenário.',
            },
            commonTime: {
              ...timeBreakdownSchema(
                'Tempo de contribuição comum (não-magistério)',
              ),
              description:
                'Tempo de contribuição em atividades não relacionadas ao magistério apurado em cada cenário.',
            },
            totalTime: {
              ...timeBreakdownSchema('Tempo de contribuição total'),
              description:
                'Tempo total de contribuição (magistério + comum) apurado em cada cenário.',
            },
            specialGracePeriod: {
              ...gracePeriodBreakdownSchema('meses de carência em magistério'),
              description:
                'Carência acumulada pelo tempo de magistério em cada cenário.',
            },
            commonGracePeriod: {
              ...gracePeriodBreakdownSchema('meses de carência comum'),
              description:
                'Carência acumulada pelo tempo comum (não-magistério) em cada cenário.',
            },
            totalGracePeriod: {
              ...gracePeriodBreakdownSchema('meses de carência total'),
              description:
                'Carência total acumulada (magistério + comum) em cada cenário.',
            },
          },
          required: [
            'specialTime',
            'commonTime',
            'totalTime',
            'specialGracePeriod',
            'commonGracePeriod',
            'totalGracePeriod',
          ],
        },
        periods: {
          type: 'array',
          description:
            'Lista de todos os períodos contributivos identificados no CNIS, ordenados cronologicamente.',
          items: {
            type: 'object',
            properties: {
              bondOrigin: {
                type: 'string',
                description:
                  'Nome do vínculo ou empregador. Ex: Escola Municipal João XXIII, INSS - Contribuinte Individual.',
              },
              period: {
                type: 'string',
                description:
                  'Descrição do período no formato legível. Ex: 01/2010 a 12/2015.',
              },
              category: {
                type: 'string',
                description:
                  'Categoria do vínculo. Ex: Empregado, Contribuinte Individual, Segurado Especial, Servidor Público.',
              },
              contributionTime: {
                type: 'string',
                description:
                  'Tempo de contribuição do período. Ex: 5 anos e 11 meses.',
              },
              gracePeriod: {
                type: 'string',
                description: 'Carência do período. Ex: 71 contribuições.',
              },
              status: {
                type: 'string',
                description:
                  'Status do período: Válido, Pendente, Concomitante, Não reconhecido.',
              },
              startDate: {
                type: 'string',
                nullable: true,
                description:
                  'Data de início do período no formato YYYY-MM-DD. JSON null se não disponível.',
              },
              endDate: {
                type: 'string',
                nullable: true,
                description:
                  'Data de fim do período no formato YYYY-MM-DD. JSON null se ainda em aberto.',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description:
                  'Indica se há competências com valor abaixo do mínimo neste período.',
              },
              contributionAverage: {
                type: 'string',
                nullable: true,
                description:
                  'Média de contribuição do período. Ex: R$ 1.500,00. JSON null se não disponível.',
              },
              timelineClassification: {
                type: 'string',
                enum: Object.values(
                  TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum,
                ),
                description:
                  'Classificação do período na linha do tempo: TEACHER_TIME para atividade exclusiva de magistério, COMMON_TIME para contribuição comum, PENDENCY_PERIOD para períodos com pendência, INACTIVITY_PERIOD para períodos sem atividade.',
              },
              earningsHistory: {
                type: 'array',
                description:
                  'Lista APENAS das competências com pendência identificada no período (contribuições abaixo do mínimo, sem data de saída, recolhidas em atraso). Retorne array vazio quando não houver pendências.',
                items: {
                  type: 'object',
                  properties: {
                    competence: {
                      type: 'string',
                      description: 'Competência no formato MM/YYYY.',
                    },
                    remuneration: {
                      type: 'string',
                      description:
                        'Valor da remuneração como string. Ex: R$ 1.320,00.',
                    },
                    indicators: {
                      type: 'string',
                      description:
                        'Indicadores do CNIS para esta competência. Ex: IREC-INDPEND, PREC-MENOR-MIN.',
                    },
                    paymentDate: {
                      type: 'string',
                      nullable: true,
                      description:
                        'Data de pagamento no formato YYYY-MM-DD. JSON null se não disponível.',
                    },
                    contribution: {
                      type: 'string',
                      nullable: true,
                      description:
                        'Valor da contribuição. Ex: R$ 145,20. JSON null se não disponível.',
                    },
                    contributionSalary: {
                      type: 'string',
                      nullable: true,
                      description:
                        'Salário de contribuição. Ex: R$ 1.320,00. JSON null se não disponível.',
                    },
                    competenceBelowMinimum: {
                      type: 'boolean',
                      description:
                        'Indica se esta competência está abaixo do salário mínimo.',
                    },
                  },
                  required: ['competence', 'competenceBelowMinimum'],
                },
              },
            },
            required: [
              'bondOrigin',
              'competenceBelowTheMinimum',
              'timelineClassification',
              'earningsHistory',
            ],
          },
        },
      },
      required: ['summary', 'periods'],
    };
  }

  private getRuralOrHybridRetirementRejectionFirstAnalysisJsonSchema(): object {
    const timeBreakdownSchema = (label: string): object => ({
      type: 'object',
      properties: {
        withoutResolvingPendingIssues: {
          type: 'string',
          nullable: true,
          description: `${label} sem resolver pendências. Ex: 12 anos e 3 meses`,
        },
        resolvingPendingIssues: {
          type: 'string',
          nullable: true,
          description: `${label} resolvendo todas as pendências documentais. Ex: 14 anos e 1 mês`,
        },
        withAccelerators: {
          type: 'string',
          nullable: true,
          description: `${label} resolvendo pendências e computando aceleradores de tempo. Ex: 15 anos e 6 meses`,
        },
      },
      required: [
        'withoutResolvingPendingIssues',
        'resolvingPendingIssues',
        'withAccelerators',
      ],
    });

    const gracePeriodBreakdownSchema = (label: string): object => ({
      type: 'object',
      properties: {
        withoutResolvingPendingIssues: {
          type: 'number',
          nullable: true,
          description: `Quantidade de ${label} sem resolver pendências. Ex: 153`,
        },
        resolvingPendingIssues: {
          type: 'number',
          nullable: true,
          description: `Quantidade de ${label} resolvendo todas as pendências documentais. Ex: 168`,
        },
        withAccelerators: {
          type: 'number',
          nullable: true,
          description: `Quantidade de ${label} resolvendo pendências e computando aceleradores de tempo. Ex: 180`,
        },
      },
      required: [
        'withoutResolvingPendingIssues',
        'resolvingPendingIssues',
        'withAccelerators',
      ],
    });

    return {
      type: 'object',
      properties: {
        decisionAnalysis: {
          type: 'string',
          nullable: true,
          description:
            'Análise técnica da decisão de indeferimento em formato Markdown. Deve avaliar a fundamentação do INSS, os pontos contestáveis e a viabilidade de reversão.',
        },
        ruralTime: {
          ...timeBreakdownSchema('Tempo de contribuição rural'),
          description: 'Tempo de atividade rural apurado em cada cenário',
        },
        urbanTime: {
          ...timeBreakdownSchema('Tempo de contribuição urbana'),
          description: 'Tempo de contribuição urbana apurado em cada cenário',
        },
        ruralGracePeriod: {
          ...gracePeriodBreakdownSchema('meses de carência rural'),
          description: 'Carência acumulada pelo tempo rural em cada cenário',
        },
        urbanGracePeriod: {
          ...gracePeriodBreakdownSchema('meses de carência urbana'),
          description: 'Carência acumulada pelo tempo urbano em cada cenário',
        },
        totalGracePeriod: {
          ...gracePeriodBreakdownSchema('meses de carência total'),
          description:
            'Carência total acumulada (rural + urbana) em cada cenário',
        },
        totalTime: {
          ...timeBreakdownSchema('Tempo de contribuição total'),
          description:
            'Tempo total de contribuição (rural + urbano) em cada cenário',
        },
        timeline: {
          type: 'object',
          description:
            'Linha do tempo cronológica de todas as atividades do segurado',
          properties: {
            periods: {
              type: 'array',
              description:
                'Lista de períodos identificados na linha do tempo, ordenados cronologicamente',
              items: {
                type: 'object',
                properties: {
                  startDate: {
                    type: 'string',
                    nullable: true,
                    description:
                      'Data de início do período no formato YYYY-MM-DD',
                  },
                  endDate: {
                    type: 'string',
                    nullable: true,
                    description: 'Data de fim do período no formato YYYY-MM-DD',
                  },
                  type: {
                    type: 'string',
                    description:
                      'Tipo do período: atividade_urbana, atividade_rural, pendencia ou periodo_sem_atividade',
                    enum: [
                      'atividade_urbana',
                      'atividade_rural',
                      'pendencia',
                      'periodo_sem_atividade',
                    ],
                  },
                  nome: {
                    type: 'string',
                    nullable: true,
                    description:
                      'Nome da atividade ou vínculo. Ex: Agricultura familiar - cultivo de hortaliças, CLT - Empresa Exemplo Ltda',
                  },
                  local: {
                    type: 'string',
                    nullable: true,
                    description:
                      'Descrição do local de trabalho ou situação do período. Ex: Assentamento Nova Vida, Município de Araraquara/SP',
                  },
                },
                required: ['startDate', 'endDate', 'type', 'nome', 'local'],
              },
            },
            ruralTime: {
              type: 'string',
              nullable: true,
              description:
                'Tempo total de atividade rural identificado na linha do tempo. Ex: 8 anos e 4 meses',
            },
            urbanTime: {
              type: 'string',
              nullable: true,
              description:
                'Tempo total de atividade urbana identificado na linha do tempo. Ex: 5 anos e 2 meses',
            },
            overlapTime: {
              type: 'string',
              nullable: true,
              description:
                'Tempo em que houve sobreposição de atividade rural e urbana simultaneamente. Ex: 1 ano e 3 meses',
            },
            pendencyTime: {
              type: 'string',
              nullable: true,
              description:
                'Tempo total com pendências documentais que impedem o reconhecimento do período. Ex: 2 anos e 7 meses',
            },
          },
          required: [
            'periods',
            'ruralTime',
            'urbanTime',
            'overlapTime',
            'pendencyTime',
          ],
        },
      },
      required: [
        'decisionAnalysis',
        'ruralTime',
        'urbanTime',
        'ruralGracePeriod',
        'urbanGracePeriod',
        'totalGracePeriod',
        'totalTime',
        'timeline',
      ],
    };
  }

  private getRuralOrHybridRetirementRejectionCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        retirementRules: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ruleName: { type: 'string' },
              fulfilled: { type: 'boolean' },
              retirementDate: {
                type: 'string',
                nullable: true,
                description: 'Data no formato YYYY-MM-DD',
              },
              expectedRmi: { type: 'number', nullable: true },
              causeValue: { type: 'number', nullable: true },
              detaildAnalysis: { type: 'string' },
            },
            required: [
              'ruleName',
              'fulfilled',
              'retirementDate',
              'expectedRmi',
              'causeValue',
              'detaildAnalysis',
            ],
          },
        },
        analysisResult: { type: 'string' },
      },
      required: ['retirementRules', 'analysisResult'],
    };
  }

  private getTeacherRetirementPlanningRejectionCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        clientData: {
          type: 'object',
          properties: {
            name: { type: 'string', nullable: true },
            cpf: { type: 'string', nullable: true },
            birthDate: { type: 'string', nullable: true },
          },
          required: ['name', 'cpf', 'birthDate'],
        },
        retirementRules: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              modality: { type: 'string' },
              fulfilled: { type: 'boolean' },
              retirementDate: {
                type: 'string',
                nullable: true,
                description: 'Data no formato YYYY-MM-DD',
              },
              expectedRmi: { type: 'number', nullable: true },
              estimatedCauseValue: { type: 'number', nullable: true },
              bestRmi: { type: 'boolean' },
              highestCauseValue: { type: 'boolean' },
              detailedAnalysis: { type: 'string' },
            },
            required: [
              'modality',
              'fulfilled',
              'retirementDate',
              'expectedRmi',
              'estimatedCauseValue',
              'bestRmi',
              'highestCauseValue',
              'detailedAnalysis',
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
            'Conteúdo HTML completo e bem formatado com toda a análise detalhada, pronto para conversão em PDF. Deve conter todos os dados analisados, e uma explicação técnica de todos os dados.',
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

  private getTimeAcceleratorAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        timeAccelerators: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              timeType: {
                type: 'string',
                enum: Object.values(TimeAcceleratorAnalysisTypeEnum),
              },
              recognitionInss: {
                type: 'string',
                enum: Object.values(TimeAcceleratorRecognitionInssEnum),
              },
              viability: {
                type: 'string',
                enum: Object.values(TimeAcceleratorViabilityEnum),
              },
              technicalNote: {
                type: 'string',
                nullable: true,
                description:
                  'Nota técnica em MARKDOWN estruturado. OBRIGATÓRIO conter: (1) título com "## Nota Técnica"; (2) seção "### Avaliação Documental" com lista "- " dos documentos analisados e sua força probatória; (3) seção "### Viabilidade e Fundamentação" explicando o grau de viabilidade com embasamento jurídico; (4) seção "### Pendências e Recomendações" com lista numerada de providências a tomar; (5) parágrafo conclusivo em negrito com a principal recomendação estratégica. Use "**...**" para destacar pontos críticos.',
              },
              startDate: { type: 'string', nullable: true },
              endDate: { type: 'string', nullable: true },
              gracePeriod: { type: 'string', nullable: true },
              institution: { type: 'string', nullable: true },
              affectsQualifyingPeriod: { type: 'boolean' },
            },
            required: [
              'timeType',
              'recognitionInss',
              'viability',
              'technicalNote',
              'startDate',
              'endDate',
              'gracePeriod',
              'institution',
              'affectsQualifyingPeriod',
            ],
          },
        },
      },
      required: ['timeAccelerators'],
    };
  }

  private getTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisJsonSchema(
    totalFiles: number,
  ): object {
    return {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          description: `Lista de documentos identificados e analisados. Deve conter exatamente ${totalFiles} item(ns), com um item para cada arquivo enviado, preservando a mesma ordem dos arquivos recebidos.`,
          minItems: totalFiles,
          maxItems: totalFiles,
          items: {
            type: 'object',
            properties: {
              documentType: {
                type: 'string',
                description:
                  'Tipo do documento identificado. Ex: CTPS, Certidão de Tempo de Contribuição (CTC), Declaração de Tempo de Serviço, Contrato de Trabalho, Contracheque, Portaria de Nomeação',
              },
              ownName: {
                type: 'boolean',
                description:
                  'Use true quando o titular do documento pertencer ao cliente informado na requisição. Use false quando o documento estiver em nome de terceiro.',
              },
              documentYear: {
                type: 'string',
                description:
                  'Ano de emissão ou vigência do documento. Use YYYY quando só o ano estiver disponível, ou YYYY-MM-DD quando a data completa constar no documento.',
              },
              shortDescription: {
                type: 'string',
                maxLength: 100,
                description:
                  'Descrição curta de no máximo 100 caracteres resumindo a conclusão sobre o documento',
              },
              technicalNote: {
                type: 'string',
                description:
                  'Nota técnica sobre a relevância e a força probatória do documento para comprovação de atividade de magistério no contexto de recurso ao INSS. Utilize formatação Markdown: use **negrito** para destacar pontos importantes, listas com `-` para enumerações e parágrafos separados por linha em branco.',
              },
              probativeForce: {
                type: 'string',
                enum: Object.values(
                  TeacherRetirementPlanningRejectionWorkPeriodDocumentProbativeForceEnum,
                ),
                description:
                  'Classificação da força probante do documento: HIGH para alta força probante (comprova diretamente atividade de magistério), LOW para pouca força probante (comprova indiretamente), NONE para sem força probante (não comprova atividade de magistério).',
              },
            },
            required: [
              'documentType',
              'ownName',
              'documentYear',
              'shortDescription',
              'technicalNote',
              'probativeForce',
            ],
          },
        },
      },
      required: ['items'],
    };
  }

  private getRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisJsonSchema(
    totalFiles: number,
  ): object {
    return {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          description: `Lista de documentos identificados e analisados. Deve conter exatamente ${totalFiles} item(ns), com um item para cada arquivo enviado, preservando a mesma ordem dos arquivos recebidos.`,
          minItems: totalFiles,
          maxItems: totalFiles,
          items: {
            type: 'object',
            properties: {
              documentType: {
                type: 'string',
                description:
                  'Tipo do documento identificado. Ex: DAP/CAF, ITR, Contrato de Arrendamento Rural, CTPS, Declaração do Sindicato Rural, Bloco de Produtor Rural, Nota Fiscal de Venda de Produtos Rurais',
              },
              ownName: {
                type: 'boolean',
                description:
                  'Use true quando o titular do documento pertencer ao cliente informado na requisição. Use false quando o documento estiver em nome de terceiro.',
              },
              documentYear: {
                type: 'string',
                description:
                  'Ano de emissão ou vigência do documento. Use YYYY quando só o ano estiver disponível, ou YYYY-MM-DD quando a data completa constar no documento.',
              },
              shortDescription: {
                type: 'string',
                maxLength: 100,
                description:
                  'Descrição curta de no máximo 100 caracteres resumindo a conclusão sobre o documento',
              },
              technicalNote: {
                type: 'string',
                description:
                  'Nota técnica sobre a relevância e a força probatória do documento para comprovação de atividade rural no contexto de recurso ao INSS. Utilize formatação Markdown: use **negrito** para destacar pontos importantes, listas com `-` para enumerações e parágrafos separados por linha em branco.',
              },
            },
            required: [
              'documentType',
              'ownName',
              'documentYear',
              'shortDescription',
              'technicalNote',
            ],
            additionalProperties: false,
          },
        },
      },
      required: ['items'],
      additionalProperties: false,
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
        summaryTable: {
          type: 'object',
          description:
            'Summary table with time and grace period breakdowns across different scenarios',
          properties: {
            timeAsDisabledWithoutResolvingPendencies: {
              type: 'string',
              description:
                'Total time as disabled without resolving pendencies. Ex: 23 years and 4 months',
            },
            timeAsDisabledResolvingPendencies: {
              type: 'string',
              description:
                'Total time as disabled resolving pendencies. Ex: 23 years and 4 months',
            },
            timeAsDisabledWithAccelerators: {
              type: 'string',
              description:
                'Total time as disabled with accelerators. Ex: 23 years and 4 months',
            },
            commonTimeWithoutResolvingPendencies: {
              type: 'string',
              description:
                'Common time without resolving pendencies. Ex: 23 years and 4 months',
            },
            commonTimeResolvingPendencies: {
              type: 'string',
              description:
                'Common time resolving pendencies. Ex: 23 years and 4 months',
            },
            commonTimeWithAccelerators: {
              type: 'string',
              description:
                'Common time with accelerators. Ex: 23 years and 4 months',
            },
            totalTimeWithoutResolvingPendencies: {
              type: 'string',
              description:
                'Total contribution time without resolving pendencies. Ex: 23 years and 4 months',
            },
            totalTimeResolvingPendencies: {
              type: 'string',
              description:
                'Total contribution time resolving pendencies. Ex: 23 years and 4 months',
            },
            totalTimeWithAccelerators: {
              type: 'string',
              description:
                'Total contribution time with accelerators. Ex: 23 years and 4 months',
            },
            gracePeriodAsDisabledWithoutResolvingPendencies: {
              type: 'string',
              description:
                'Grace period as disabled without resolving pendencies. Ex: 156 contributions',
            },
            gracePeriodAsDisabledResolvingPendencies: {
              type: 'string',
              description:
                'Grace period as disabled resolving pendencies. Ex: 156 contributions',
            },
            gracePeriodAsDisabledWithAccelerators: {
              type: 'string',
              description:
                'Grace period as disabled with accelerators. Ex: 156 contributions',
            },
            commonGracePeriodWithoutResolvingPendencies: {
              type: 'string',
              description:
                'Common grace period without resolving pendencies. Ex: 156 contributions',
            },
            commonGracePeriodResolvingPendencies: {
              type: 'string',
              description:
                'Common grace period resolving pendencies. Ex: 156 contributions',
            },
            commonGracePeriodWithAccelerators: {
              type: 'string',
              description:
                'Common grace period with accelerators. Ex: 156 contributions',
            },
            totalGracePeriodWithoutResolvingPendencies: {
              type: 'string',
              description:
                'Total grace period without resolving pendencies. Ex: 156 contributions',
            },
            totalGracePeriodResolvingPendencies: {
              type: 'string',
              description:
                'Total grace period resolving pendencies. Ex: 156 contributions',
            },
            totalGracePeriodWithAccelerators: {
              type: 'string',
              description:
                'Total grace period with accelerators. Ex: 156 contributions',
            },
          },
          required: [
            'timeAsDisabledWithoutResolvingPendencies',
            'timeAsDisabledResolvingPendencies',
            'timeAsDisabledWithAccelerators',
            'commonTimeWithoutResolvingPendencies',
            'commonTimeResolvingPendencies',
            'commonTimeWithAccelerators',
            'totalTimeWithoutResolvingPendencies',
            'totalTimeResolvingPendencies',
            'totalTimeWithAccelerators',
            'gracePeriodAsDisabledWithoutResolvingPendencies',
            'gracePeriodAsDisabledResolvingPendencies',
            'gracePeriodAsDisabledWithAccelerators',
            'commonGracePeriodWithoutResolvingPendencies',
            'commonGracePeriodResolvingPendencies',
            'commonGracePeriodWithAccelerators',
            'totalGracePeriodWithoutResolvingPendencies',
            'totalGracePeriodResolvingPendencies',
            'totalGracePeriodWithAccelerators',
          ],
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
        'summaryTable',
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
                      type: 'string',
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
        unit: {
          type: 'string',
          description: 'Unidade da medição. Ex: dB, °C',
        },
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
              type: 'object',
              properties: {
                withoutResolvingPendencies: {
                  type: 'string',
                  description:
                    'Tempo especial sem resolver pendências. Ex: 23 anos e 4 meses',
                },
                resolvingPendencies: {
                  type: 'string',
                  description:
                    'Tempo especial resolvendo pendências. Ex: 27 anos e 8 meses',
                },
                withAccelerators: {
                  type: 'string',
                  description:
                    'Tempo especial com aceleradores. Ex: 30 anos e 2 meses',
                },
              },
              required: [
                'withoutResolvingPendencies',
                'resolvingPendencies',
                'withAccelerators',
              ],
            },
            commonTime: {
              type: 'object',
              properties: {
                withoutResolvingPendencies: {
                  type: 'string',
                  description:
                    'Tempo comum sem resolver pendências. Ex: 23 anos e 4 meses',
                },
                resolvingPendencies: {
                  type: 'string',
                  description:
                    'Tempo comum resolvendo pendências. Ex: 27 anos e 8 meses',
                },
                withAccelerators: {
                  type: 'string',
                  description:
                    'Tempo comum com aceleradores. Ex: 30 anos e 2 meses',
                },
              },
              required: [
                'withoutResolvingPendencies',
                'resolvingPendencies',
                'withAccelerators',
              ],
            },
            totalTime: {
              type: 'object',
              properties: {
                withoutResolvingPendencies: {
                  type: 'string',
                  description:
                    'Tempo total sem resolver pendências. Ex: 23 anos e 4 meses',
                },
                resolvingPendencies: {
                  type: 'string',
                  description:
                    'Tempo total resolvendo pendências. Ex: 27 anos e 8 meses',
                },
                withAccelerators: {
                  type: 'string',
                  description:
                    'Tempo total com aceleradores. Ex: 30 anos e 2 meses',
                },
              },
              required: [
                'withoutResolvingPendencies',
                'resolvingPendencies',
                'withAccelerators',
              ],
            },
            specialGracePeriod: {
              type: 'object',
              properties: {
                withoutResolvingPendencies: {
                  type: 'number',
                  description:
                    'Carência em tempo especial sem resolver pendências (contribuições)',
                },
                resolvingPendencies: {
                  type: 'number',
                  description:
                    'Carência em tempo especial resolvendo pendências (contribuições)',
                },
                withAccelerators: {
                  type: 'number',
                  description:
                    'Carência em tempo especial com aceleradores (contribuições)',
                },
              },
              required: [
                'withoutResolvingPendencies',
                'resolvingPendencies',
                'withAccelerators',
              ],
            },
            commonGracePeriod: {
              type: 'object',
              properties: {
                withoutResolvingPendencies: {
                  type: 'number',
                  description:
                    'Carência em tempo comum sem resolver pendências (contribuições)',
                },
                resolvingPendencies: {
                  type: 'number',
                  description:
                    'Carência em tempo comum resolvendo pendências (contribuições)',
                },
                withAccelerators: {
                  type: 'number',
                  description:
                    'Carência em tempo comum com aceleradores (contribuições)',
                },
              },
              required: [
                'withoutResolvingPendencies',
                'resolvingPendencies',
                'withAccelerators',
              ],
            },
            totalGracePeriod: {
              type: 'object',
              properties: {
                withoutResolvingPendencies: {
                  type: 'number',
                  description:
                    'Carência total sem resolver pendências (contribuições)',
                },
                resolvingPendencies: {
                  type: 'number',
                  description:
                    'Carência total resolvendo pendências (contribuições)',
                },
                withAccelerators: {
                  type: 'number',
                  description:
                    'Carência total com aceleradores (contribuições)',
                },
              },
              required: [
                'withoutResolvingPendencies',
                'resolvingPendencies',
                'withAccelerators',
              ],
            },
          },
          required: [
            'specialTime',
            'commonTime',
            'totalTime',
            'specialGracePeriod',
            'commonGracePeriod',
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
                  company: {
                    type: 'string',
                    description: 'Company/employer name',
                  },
                  cnpj: {
                    type: 'string',
                    description: 'Company tax ID (CNPJ)',
                  },
                  role: { type: 'string', description: 'Job title/role held' },
                  supportingDocument: {
                    type: 'string',
                    description:
                      'Supporting documents used. Ex: PPP, CTPS, LTCAT',
                  },
                  recordedInCnis: {
                    type: 'boolean',
                    description:
                      'Whether the employment record appears in the CNIS',
                  },
                  remunerationRecordedInCnis: {
                    type: 'boolean',
                    description:
                      'Whether remunerations for this period are recorded in the CNIS',
                  },
                  hazardousAgents: {
                    type: 'array',
                    description: 'Hazardous agents identified in this period',
                    items: {
                      type: 'object',
                      properties: {
                        intensityAndFrequency: {
                          type: 'string',
                          description:
                            'Exposure intensity and frequency. Ex: 87dB - Habitual and Permanent',
                        },
                        identifiedAgent: {
                          type: 'string',
                          description:
                            'Name of the identified hazardous agent. Ex: Noise',
                        },
                      },
                      required: ['intensityAndFrequency', 'identifiedAgent'],
                    },
                  },
                  informationSource: {
                    type: 'string',
                    description: 'Source of information used. Ex: PPP, LTCAT',
                  },
                  legalFramework: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        description: {
                          type: 'string',
                          description:
                            'Legal framework description. Ex: By occupational category (Decree 53.831/64)',
                        },
                        code: {
                          type: 'string',
                          description:
                            'Legal framework code. Ex: Code 2.5.3 - Miscellaneous operations',
                        },
                      },
                      required: ['description', 'code'],
                    },
                  },
                  epiEficaz: { type: 'boolean' },
                  observations: { type: 'array', items: { type: 'string' } },
                },
                required: [
                  'periodStartDate',
                  'periodEndDate',
                  'recognized',
                  'justification',
                  'legalFramework',
                  'company',
                  'cnpj',
                  'role',
                  'supportingDocument',
                  'recordedInCnis',
                  'remunerationRecordedInCnis',
                  'hazardousAgents',
                  'informationSource',
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

  private getSpecialRetirementRejectionFirstAnalysisJsonSchema(): object {
    const workPeriodSchema = {
      type: 'object',
      properties: {
        bondOrigin: { type: 'string' },
        startDate: {
          type: 'string',
          format: 'date',
          description: 'YYYY-MM-DD',
        },
        endDate: {
          type: 'string',
          format: 'date',
          description: 'YYYY-MM-DD',
        },
        category: {
          type: 'string',
          enum: [
            'segurado_empregado',
            'segurado_contribuinte_individual',
            'segurado_facultativo',
            'segurado_especial',
            'segurado_domestico',
            'segurado_avulso',
          ],
        },
        pendencyReason: {
          type: 'array',
          items: { type: 'string' },
          description: 'Lista de motivos de pendencia do período',
        },
        periodConsideration: {
          type: 'string',
          enum: ['sim', 'nao', 'provisoriamente'],
        },
        contributionAverage: {
          type: 'string',
          description:
            'Valor numérico decimal sem símbolo de moeda, ex: "567.03". Não incluir "R$" ou qualquer formatação de moeda.',
        },
        status: { type: 'string' },
        gracePeriod: { type: 'string' },
        activityType: {
          type: 'string',
          enum: [
            'atividade_comum',
            'atividade_especial',
            'periodo_sem_atividade',
            'pendencia',
          ],
        },
        earningsHistory: {
          type: 'array',
          description:
            'Histórico de remunerações do período, com foco em competências abaixo do mínimo ou com pendências. Retornar array vazio se não houver.',
          items: {
            type: 'object',
            properties: {
              competence: {
                type: 'string',
                format: 'date',
                description: 'YYYY-MM-DD',
              },
              remuneration: { type: 'string' },
              indicators: { type: 'string' },
              paymentDate: {
                type: 'string',
                format: 'date',
                description: 'YYYY-MM-DD',
              },
              contribution: { type: 'string' },
              contributionSalary: { type: 'string' },
              competenceBelowTheMinimum: { type: 'boolean' },
            },
          },
        },
        specialPeriods: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              recognizedSpecialTime: { type: 'boolean' },
              companyName: { type: 'string' },
              cnpj: { type: 'string' },
              position: { type: 'string' },
              comprobatoryDocument: { type: 'string' },
              linkedToCnis: { type: 'boolean' },
              containsCnisRemunerationInPeriod: { type: 'boolean' },
              technicalJustification: { type: 'string' },
              additionalObservation: { type: 'string' },
              lawyerObservation: { type: 'string' },
              exposureFrequency: { type: 'string' },
              informationSource: { type: 'string' },
              identifiedAgents: { type: 'string' },
              efficientEpi: { type: 'boolean' },
            },
            required: [
              'recognizedSpecialTime',
              'companyName',
              'cnpj',
              'position',
              'comprobatoryDocument',
              'linkedToCnis',
              'containsCnisRemunerationInPeriod',
              'technicalJustification',
              'additionalObservation',
              'lawyerObservation',
              'exposureFrequency',
              'informationSource',
              'identifiedAgents',
              'efficientEpi',
            ],
          },
        },
      },
      required: [
        'bondOrigin',
        'startDate',
        'endDate',
        'category',
        'pendencyReason',
        'periodConsideration',
        'contributionAverage',
        'status',
        'gracePeriod',
        'activityType',
        'earningsHistory',
        'specialPeriods',
      ],
    };

    return {
      type: 'object',
      properties: {
        decisionAnalysis: {
          type: 'string',
          description: 'Análise da decisão em formato markdown',
        },
        specialTimeWithoutResolvingPendencies: {
          type: 'string',
          description: 'Ex: 23 anos e 4 meses',
        },
        specialTimeResolvingPendencies: {
          type: 'string',
          description: 'Ex: 23 anos e 4 meses',
        },
        specialTimeWithAccelerators: {
          type: 'string',
          description: 'Ex: 23 anos e 4 meses',
        },
        commonTimeWithoutResolvingPendencies: {
          type: 'string',
          description: 'Ex: 23 anos e 4 meses',
        },
        commonTimeResolvingPendencies: {
          type: 'string',
          description: 'Ex: 23 anos e 4 meses',
        },
        commonTimeWithAccelerators: {
          type: 'string',
          description: 'Ex: 23 anos e 4 meses',
        },
        totalTimeWithoutResolvingPendencies: {
          type: 'string',
          description: 'Ex: 23 anos e 4 meses',
        },
        totalTimeResolvingPendencies: {
          type: 'string',
          description: 'Ex: 23 anos e 4 meses',
        },
        totalTimeWithAccelerators: {
          type: 'string',
          description: 'Ex: 23 anos e 4 meses',
        },
        specialGracePeriodWithoutResolvingPendencies: {
          type: 'string',
          description: 'Ex: 156 contribuições',
        },
        specialGracePeriodResolvingPendencies: {
          type: 'string',
          description: 'Ex: 156 contribuições',
        },
        specialGracePeriodWithAccelerators: {
          type: 'string',
          description: 'Ex: 156 contribuiçõe',
        },
        commonGracePeriodWithoutResolvingPendencies: {
          type: 'string',
          description: 'Ex: 156 contribuições',
        },
        commonGracePeriodResolvingPendencies: {
          type: 'string',
          description: 'Ex: 156 contribuições',
        },
        commonGracePeriodWithAccelerators: {
          type: 'string',
          description: 'Ex: 156 contribuições',
        },
        totalGracePeriodWithoutResolvingPendencies: {
          type: 'string',
          description: 'Ex: 156 contribuições',
        },
        totalGracePeriodResolvingPendencies: {
          type: 'string',
          description: 'Ex: 156 contribuições',
        },
        totalGracePeriodWithAccelerators: {
          type: 'string',
          description: 'Ex: 156 contribuições',
        },
        workPeriods: {
          type: 'array',
          items: workPeriodSchema,
        },
      },
      required: [
        'decisionAnalysis',
        'specialTimeWithoutResolvingPendencies',
        'specialTimeResolvingPendencies',
        'specialTimeWithAccelerators',
        'commonTimeWithoutResolvingPendencies',
        'commonTimeResolvingPendencies',
        'commonTimeWithAccelerators',
        'totalTimeWithoutResolvingPendencies',
        'totalTimeResolvingPendencies',
        'totalTimeWithAccelerators',
        'specialGracePeriodWithoutResolvingPendencies',
        'specialGracePeriodResolvingPendencies',
        'specialGracePeriodWithAccelerators',
        'commonGracePeriodWithoutResolvingPendencies',
        'commonGracePeriodResolvingPendencies',
        'commonGracePeriodWithAccelerators',
        'totalGracePeriodWithoutResolvingPendencies',
        'totalGracePeriodResolvingPendencies',
        'totalGracePeriodWithAccelerators',
        'workPeriods',
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
                  'Análise detalhada desta regra em formato Markdown rico, com títulos (##, ###), tabelas comparativas de requisitos, listas de critérios, datas e valores em negrito, fundamentação legal e conclusão sobre elegibilidade.',
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
                description: 'Título da sugestáo processual',
              },
              suggestionDescription: {
                type: 'string',
                description: 'Descrição da sugestáo processual',
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
            'Análise extensa e detalhada do caso em formato Markdown rico. Deve conter: títulos de seção com ## e ###, tabelas Markdown comparando requisitos e situação do segurado, listas com critérios atendidos e pendentes, valores monetários e datas em negrito. Seções obrigatórias: ## Resumo do Caso, ## Histórico Previdenciário, ## Análise da Incapacidade, ## Qualidade de Segurado e Carência, ## Conclusão, ## Estratégia Recomendada. O texto deve ser extenso, juridicamente fundamentado, com referência expressa às normas aplicáveis (artigos de lei, decretos).',
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
                description: 'Se o segurado à elegível',
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
          description: 'Tempo de serviço/contribuição',
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
            'Relatório completo da análise em Markdown, pronto para exportação em PDF/DOCX. Deve conter todas as seções: Dados do cliente, Tempo de serviço/contribuição, Análise de Regras de Aposentadoria, resumo e lista de regras (elegíveis e não elegíveis), Linha do tempo integrada, Análise do tempo especial, Análise do tempo PCD, Resumo de Regras Aplicáveis para Aposentadoria Urbana Comum (RPPS) e Análise final. Formate com títulos (##), listas e tabelas em Markdown quando aplicável.',
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
                  GeneralUrbanRetirementDenialPeriodCategoryEnum,
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
                  GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
                ),
                description: 'Motivo da pendência, se houver',
              },
              periodConsideration: {
                type: 'string',
                enum: Object.values(
                  GeneralUrbanRetirementDenialPeriodConsiderationEnum,
                ),
                description: 'Consideração do período para o benefício',
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

  private getDeathBenefitGrantFirstAnalysisJsonSchema(): object {
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
                enum: Object.values(DeathBenefitGrantCategoryEnum),
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
                enum: Object.values(DeathBenefitGrantPeriodPendencyReasonEnum),
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

  private getDeathBenefitGrantTimeAcceleratorAnalysisJsonSchema(): object {
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

  private getAccidentBenefitRejectionFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        insuredStatusMantained: {
          type: 'boolean',
          description:
            'Indica se a qualidade de segurado foi mantida na data do acidente.',
        },
        insuredStatusAnalysisConclusion: {
          type: 'string',
          description:
            'Conclusão técnica sobre a análise da qualidade de segurado.',
        },
        presenceOfPermanentSequelae: {
          type: 'boolean',
          description:
            'Indica se há presença de sequelas permanentes decorrentes do acidente.',
        },
        compatibilityOfTheSequelaeWithAccident: {
          type: 'boolean',
          description:
            'Indica se as sequelas são compatíveis com o acidente informado.',
        },
        sequelaeAnalysisConclusion: {
          type: 'string',
          description:
            'Conclusão técnica sobre a análise das sequelas e sua compatibilidade com o acidente.',
        },
      },
      required: [
        'insuredStatusMantained',
        'insuredStatusAnalysisConclusion',
        'presenceOfPermanentSequelae',
        'compatibilityOfTheSequelaeWithAccident',
        'sequelaeAnalysisConclusion',
      ],
    };
  }

  private getAccidentBenefitRejectionCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        retirementRules: {
          type: 'array',
          description:
            'Lista das regras de aposentadoria que o segurado pode ter direito.',
          items: {
            type: 'object',
            properties: {
              ruleName: {
                type: 'string',
                description: 'Nome da regra de aposentadoria.',
              },
              fulfilled: {
                type: 'boolean',
                description:
                  'Indica se os requisitos da regra foram cumpridos.',
              },
              retirementDate: {
                type: 'string',
                description:
                  'Data estimada de aposentadoria no formato DD/MM/AAAA, ou null se não aplicável.',
              },
              expectedRmi: {
                type: 'number',
                description:
                  'RMI (Renda Mensal Inicial) estimada em reais para esta regra de aposentadoria.',
              },
              causeValue: {
                type: 'number',
                description:
                  'Valor de causa estimado em reais para fins de eventual ação judicial.',
              },
              detailedAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada dos requisitos e resultado para esta regra específica.',
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
            'Parecer técnico conclusivo completo da análise do indeferimento de acidente, incluindo estratégia processual e recomendações. Retorne em formato Markdown.',
        },
      },
      required: ['retirementRules', 'analysisResult'],
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

  private getRetirementPermanentDisabilityRejectionFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        clientData: {
          type: 'object',
          description: 'Dados do cliente extraídos dos documentos',
          properties: {
            name: {
              type: 'string',
              description: 'Nome completo do cliente',
            },
            cpf: {
              type: 'string',
              description: 'CPF do cliente',
            },
            birthDate: {
              type: 'string',
              description:
                'Data de nascimento do cliente no formato DD/MM/AAAA',
            },
            category: {
              type: 'string',
              description:
                'Categoria previdenciária do segurado (ex: MEI, Empregado, Contribuinte Individual)',
            },
            nb: {
              type: 'string',
              description: 'Número do Benefício (NB)',
            },
            judicialProcessNumber: {
              type: 'string',
              description: 'Número do processo judicial, se houver',
            },
            incapacityStartDate: {
              type: 'string',
              description:
                'Data de Início da Incapacidade (DII) no formato DD/MM/AAAA',
            },
          },
          required: ['name'],
        },
        insuredStatus: {
          type: 'boolean',
          description:
            'Indica se o segurado possui qualidade de segurado na Data de Início da Incapacidade (DII)',
        },
        gracePeriodStatus: {
          type: 'string',
          description:
            'Indica a situação do período de graça do segurado na DII',
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
        graceExempt: {
          type: 'boolean',
          description:
            'Indica se o segurado é isento de carência para o benefício',
        },
        graceValidation: {
          type: 'string',
          description:
            'Observação sobre a validação de carência na Data de Início da Incapacidade (DII)',
        },
        contributionTimeWithoutResolvingPendencies: {
          type: 'string',
          description: 'Tempo de contribuição total sem resolver pendências',
        },
        contributionTimeResolvingPendencies: {
          type: 'string',
          description: 'Tempo de contribuição total resolvendo pendências',
        },
        contributionTimeWithAccelerators: {
          type: 'string',
          description: 'Tempo de contribuição total com aceleradores',
        },
        periods: {
          type: 'array',
          description:
            'Lista de períodos de contribuição extraídos do CNIS (Raio-X do CNIS)',
          items: {
            type: 'object',
            properties: {
              bondOrigin: {
                type: 'string',
                description:
                  'Origem do vínculo (nome da empresa ou empregador)',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  RetirementPermanentDisabilityRejectionPeriodCategoryEnum,
                ),
                description:
                  'Categoria do período (ex: EMPREGADO_URBANO, MEI, CONTRIBUINTE_INDIVIDUAL_AUTONOMO)',
              },
              startDate: {
                type: 'string',
                description: 'Data de início do período no formato DD/MM/AAAA',
              },
              endDate: {
                type: 'string',
                description: 'Data de fim do período no formato DD/MM/AAAA',
              },
              impactMonths: {
                type: 'number',
                description: 'Tempo de contribuição do período em meses',
              },
              graceMonths: {
                type: 'number',
                description: 'Carência do período em meses',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o período possui pendência',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description:
                  'Indica se há competências abaixo do mínimo no período',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Média contributiva do período em formato decimal (ex: 1213.50)',
              },
              pendencyReason: {
                type: 'string',
                description:
                  'Motivo da pendência (ex: LEAVE_DATE, COMPETENCE_BELOW_MINIMUM, INCONSISTENT_COMPETENCE)',
              },
              periodConsideration: {
                type: 'string',
                description:
                  'Consideração do período (ex: SIM, NAO, PROVISORIO)',
              },
              wantsToComplementViaMeuINSS: {
                type: 'boolean',
                description:
                  'Indica se deseja fazer a complementação via Meu INSS',
              },
              status: {
                type: 'boolean',
                description:
                  'Status do período (true = válido, false = inválido)',
              },
              earningsHistory: {
                type: 'array',
                description: 'Histórico de remunerações do período',
                items: {
                  type: 'object',
                  properties: {
                    competence: {
                      type: 'string',
                      description: 'Competência no formato MM/AAAA',
                    },
                    value: {
                      type: 'string',
                      description: 'Valor da remuneração em formato decimal',
                    },
                    pendencyType: {
                      type: 'string',
                      description:
                        'Tipo de pendência da competência (ex: COMPETENCE_BELOW_MINIMUM)',
                    },
                    collectedAt: {
                      type: 'string',
                      description: 'Data de recolhimento no formato DD/MM/AAAA',
                    },
                  },
                },
              },
            },
            required: [
              'startDate',
              'isPendency',
              'competenceBelowTheMinimum',
              'status',
              'category',
              'endDate',
              'impactMonths',
              'graceMonths',
              'wantsToComplementViaMeuINSS',
              'bondOrigin',
              'contributionAverage',
              'pendencyReason',
              'periodConsideration',
              'earningsHistory',
            ],
          },
        },
      },
      required: [
        'clientData',
        'insuredStatus',
        'gracePeriodStatus',
        'gracePeriods',
        'analysisConclusion',
        'graceExtensionDueToInvoluntaryUnemployment',
        'requestToExtendGracePeriod',
        'graceExempt',
        'graceValidation',
        'contributionTimeWithoutResolvingPendencies',
        'contributionTimeResolvingPendencies',
        'contributionTimeWithAccelerators',
        'periods',
      ],
    };
  }

  private getRetirementPermanentDisabilityRejectionResultAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        retirementRules: {
          type: 'array',
          description:
            'Resumo de regras aplicáveis para aposentadoria por incapacidade permanente.',
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
                description: 'Data do direito no formato YYYY-MM-DD.',
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
                description: 'Análise detalhada desta regra.',
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
            'Texto explicativo completo sobre o resultado da análise.',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'Conteúdo HTML completo e bem formatado, pronto para conversão em PDF.',
        },
        simplifiedAnalysis: {
          type: 'string',
          description: 'Análise simplificada em Markdown.',
        },
      },
      required: [
        'retirementRules',
        'analysisResult',
        'completeAnalysisDownload',
        'simplifiedAnalysis',
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

  private getBpcElderlyCessationCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        analysisResult: {
          type: 'string',
          description: 'Resumo principal do resultado da análise.',
        },
        analysisDetailedText: {
          type: 'string',
          description:
            'Texto detalhado da análise final sobre a cessação ou suspensão do BPC ao Idoso em Markdown estruturado, com títulos, listas e tabelas quando aplicável.',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'Versão em Markdown da análise completa, pronta para exportação.',
        },
        applicableRules: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              status: { type: 'string' },
            },
            required: ['title', 'description', 'status'],
          },
        },
        benefitSummaries: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              benefitType: { type: 'string' },
              result: { type: 'string' },
              dib: { type: 'string' },
              expectedMonthlyBenefit: { type: 'number' },
              detailedAnalysis: { type: 'string' },
            },
            required: ['benefitType', 'result'],
          },
        },
        diagnosis: {
          type: 'string',
          description:
            'Diagnóstico da possibilidade de reativação/manutenção do BPC ao Idoso.',
        },
        totalHouseholdIncome: {
          type: 'number',
          description: 'Renda familiar total apurada.',
        },
        perCapitaIncome: {
          type: 'number',
          description: 'Renda familiar per capita apurada.',
        },
        legalRequirementsMet: {
          type: 'string',
          description:
            'Conclusão sobre o preenchimento dos requisitos legais do BPC ao Idoso.',
        },
        perCapitaIncomeBelowQuarterMinimumWage: {
          type: 'string',
          description:
            'Conclusão sobre a renda per capita inferior a 1/4 do salário mínimo.',
        },
        ageEqualOrAbove65Years: {
          type: 'string',
          description:
            'Conclusão sobre o requisito de idade igual ou superior a 65 anos.',
        },
      },
      required: [
        'analysisResult',
        'analysisDetailedText',
        'completeAnalysisDownload',
        'applicableRules',
        'benefitSummaries',
        'diagnosis',
        'totalHouseholdIncome',
        'perCapitaIncome',
        'legalRequirementsMet',
        'perCapitaIncomeBelowQuarterMinimumWage',
        'ageEqualOrAbove65Years',
      ],
    };
  }

  private getMaternityPayRejectionSecondAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        insuredStatusManteined: {
          type: 'boolean',
          description:
            'Indica se a qualidade de segurada foi mantida na data do evento gerador, considerando períodos de contribuição e eventual período de graça.',
        },
        insuredStatusAnalysisConclusion: {
          type: 'string',
          description:
            'Conclusão textual objetiva sobre a qualidade de segurada, com fundamento nos dados do CNIS e documentos analisados. Deve ser texto simples, sem markdown.',
        },
        gracePeriod: {
          type: 'object',
          description:
            'Resumo da análise de período de graça aplicável ao caso concreto.',
          properties: {
            withinTheGracePeriod: {
              type: 'boolean',
              description:
                'Indica se a segurada estava dentro do período de graça na data relevante para o benefício.',
            },
            situation: {
              type: 'string',
              description:
                'Descrição sintética da situação da segurada frente ao período de graça.',
            },
            applicableGracePeriod: {
              type: 'string',
              description:
                'Período de graça aplicado ao caso (base legal e prazo considerado).',
            },
            endOfGracePeriod: {
              type: 'string',
              description:
                'Data final do período de graça no formato YYYY-MM-DD. Quando não aplicável, explicar no texto.',
            },
          },
          required: [
            'withinTheGracePeriod',
            'situation',
            'applicableGracePeriod',
            'endOfGracePeriod',
          ],
        },
        benefitInformation: {
          type: 'object',
          description:
            'Consolidação das informações essenciais do benefício de salário-maternidade no caso analisado.',
          properties: {
            situation: {
              type: 'string',
              description:
                'Situação geral do benefício (deferido, indeferido, pendente ou equivalente conforme contexto do processo).',
            },
            duration: {
              type: 'string',
              description:
                'Duração do benefício em linguagem clara (ex.: 120 dias).',
            },
            startDate: {
              type: 'string',
              description:
                'Data de início do benefício no formato YYYY-MM-DD, quando identificável.',
            },
            concessionDate: {
              type: 'string',
              description:
                'Data de concessão no formato YYYY-MM-DD, quando houver.',
            },
            startOfTheLeave: {
              type: 'string',
              description:
                'Data de início do afastamento no formato YYYY-MM-DD, conforme documentação.',
            },
            endOfTheLeave: {
              type: 'string',
              description:
                'Data de término do afastamento no formato YYYY-MM-DD, conforme documentação.',
            },
            totalLeaveDuration: {
              type: 'string',
              description:
                'Tempo total de afastamento em formato textual objetivo (ex.: 120 dias).',
            },
            amountBenefit: {
              type: 'string',
              description:
                'Valor do benefício em formato textual com moeda quando cabível (ex.: R$ 1.518,00).',
            },
            calculationBasis: {
              type: 'string',
              description:
                'Base de cálculo utilizada para estimar o valor do benefício.',
            },
          },
          required: [
            'situation',
            'duration',
            'startDate',
            'concessionDate',
            'startOfTheLeave',
            'endOfTheLeave',
            'totalLeaveDuration',
            'amountBenefit',
            'calculationBasis',
          ],
        },
        requirementDeadline: {
          type: 'object',
          description:
            'Análise do prazo para requerimento administrativo do benefício.',
          properties: {
            triggeringEventDate: {
              type: 'string',
              description: 'Data do fato gerador no formato YYYY-MM-DD.',
            },
            requirementDate: {
              type: 'string',
              description:
                'Data do requerimento administrativo no formato YYYY-MM-DD.',
            },
            statuoryDeadline: {
              type: 'string',
              description:
                'Prazo legal aplicável ao requerimento, em linguagem clara e objetiva.',
            },
            details: {
              type: 'string',
              description:
                'Detalhes relevantes sobre contagem do prazo e marcos temporais considerados.',
            },
            justification: {
              type: 'string',
              description:
                'Justificativa técnica final sobre tempestividade ou eventual intempestividade.',
            },
          },
          required: [
            'triggeringEventDate',
            'requirementDate',
            'statuoryDeadline',
            'details',
            'justification',
          ],
        },
      },
      required: [
        'insuredStatusManteined',
        'insuredStatusAnalysisConclusion',
        'gracePeriod',
        'benefitInformation',
        'requirementDeadline',
      ],
    };
  }

  private getMaternityPayRejectionCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        retirementRules: {
          type: 'array',
          description:
            'Lista das regras previdenciárias analisadas para verificar repercussão no direito ao salário-maternidade e em cenários correlatos.',
          items: {
            type: 'object',
            properties: {
              ruleName: {
                type: 'string',
                description: 'Nome da regra analisada.',
              },
              fulfilled: {
                type: 'boolean',
                description:
                  'Indica se os requisitos dessa regra foram cumpridos com base nos dados disponíveis.',
              },
              grantDate: {
                type: 'string',
                description:
                  'Data provável de cumprimento dos requisitos no formato YYYY-MM-DD. Use valor textual quando não houver data objetiva.',
              },
              expectedRmi: {
                type: 'number',
                description: 'RMI estimada para a regra, quando calculável.',
              },
              causeValue: {
                type: 'string',
                description:
                  'Valor estimado da causa em formato textual monetário (ex.: "R$ 12.345,67"). Deve refletir o cálculo correto do cenário e não pode usar 0 como preenchimento padrão.',
              },
              detaildAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada da regra, com fundamentação fática e jurídica em texto claro.',
              },
            },
            required: ['ruleName', 'fulfilled', 'detaildAnalysis'],
          },
        },
        isEligibleForMaternityPay: {
          type: 'boolean',
          description:
            'Conclusão objetiva sobre elegibilidade ao salário-maternidade no caso concreto.',
        },
        analysisResult: {
          type: 'string',
          description:
            'Parecer técnico conclusivo da análise completa. Deve sintetizar fundamentos, riscos, pontos favoráveis/desfavoráveis e recomendação final em texto claro, sem markdown.',
        },
      },
      required: [
        'retirementRules',
        'isEligibleForMaternityPay',
        'analysisResult',
      ],
    };
  }

  private getTemporaryIncapacityBenefitRejectionFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        clientData: {
          type: 'object',
          description: 'Dados do cliente extraídos dos documentos',
          properties: {
            name: {
              type: 'string',
              description: 'Nome completo do cliente',
            },
            cpf: {
              type: 'string',
              description: 'CPF ou CNPJ do cliente',
            },
            birthDate: {
              type: 'string',
              description:
                'Data de nascimento do cliente no formato DD/MM/AAAA',
            },
            category: {
              type: 'string',
              description:
                'Categoria previdenciária do segurado (ex: MEI, Empregado, Contribuinte Individual)',
            },
            nb: {
              type: 'string',
              description: 'Número do Benefício (NB)',
            },
            judicialProcessNumber: {
              type: 'string',
              description: 'Número do processo judicial, se houver',
            },
            incapacityStartDate: {
              type: 'string',
              description:
                'Data de Início da Incapacidade (DII) no formato DD/MM/AAAA',
            },
          },
          required: ['name'],
        },
        insuredStatus: {
          type: 'boolean',
          description:
            'Indica se o segurado possui qualidade de segurado na Data de Início da Incapacidade (DII)',
        },
        gracePeriodStatus: {
          type: 'string',
          description:
            'Indica a situação do período de graça do segurado na DII',
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
        graceExempt: {
          type: 'boolean',
          description:
            'Indica se o segurado é isento de carência para o benefício',
        },
        graceValidation: {
          type: 'string',
          description:
            'Observação sobre a validação de carência na Data de Início da Incapacidade (DII)',
        },
        contributionTimeWithoutResolvingPendencies: {
          type: 'string',
          description: 'Tempo de contribuição total sem resolver pendências',
        },
        contributionTimeResolvingPendencies: {
          type: 'string',
          description: 'Tempo de contribuição total resolvendo pendências',
        },
        contributionTimeWithAccelerators: {
          type: 'string',
          description: 'Tempo de contribuição total com aceleradores',
        },
        periods: {
          type: 'array',
          description:
            'Lista de períodos de contribuição extraídos do CNIS (Raio-X do CNIS)',
          items: {
            type: 'object',
            properties: {
              bondOrigin: {
                type: 'string',
                description:
                  'Origem do vínculo (nome da empresa ou empregador)',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  TemporaryIncapacityBenefitRejectionCategoryEnum,
                ),
                description:
                  'Categoria do período (ex: EMPREGADO_URBANO, MEI, CONTRIBUINTE_INDIVIDUAL_AUTONOMO)',
              },
              startDate: {
                type: 'string',
                description: 'Data de início do período no formato DD/MM/AAAA',
              },
              endDate: {
                type: 'string',
                description: 'Data de fim do período no formato DD/MM/AAAA',
              },
              impactMonths: {
                type: 'number',
                description: 'Tempo de contribuição do período em meses',
              },
              graceMonths: {
                type: 'number',
                description: 'Carência do período em meses',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o período possui pendência',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description:
                  'Indica se há competências abaixo do mínimo no período',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Média contributiva do período em formato decimal (ex: 1213.50)',
              },
              pendencyReason: {
                type: 'string',
                enum: Object.values(
                  TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum,
                ),
                description:
                  'Motivo da pendência (ex: LEAVE_DATE, COMPETENCE_BELOW_MINIMUM, INCONSISTENT_COMPETENCE)',
              },
              periodConsideration: {
                type: 'string',
                description:
                  'Consideração do período (ex: SIM, NAO, PROVISORIO)',
              },
              wantsToComplementViaMeuINSS: {
                type: 'boolean',
                description:
                  'Indica se deseja fazer a complementação via Meu INSS',
              },
              status: {
                type: 'boolean',
                description:
                  'Status do período (true = válido, false = inválido)',
              },
              earningsHistory: {
                type: 'array',
                description: 'Histórico de remunerações do período',
                items: {
                  type: 'object',
                  properties: {
                    competence: {
                      type: 'string',
                      description: 'Competência no formato MM/AAAA',
                    },
                    value: {
                      type: 'string',
                      description: 'Valor da remuneração em formato decimal',
                    },
                    pendencyType: {
                      type: 'string',
                      enum: Object.values(
                        TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum,
                      ),
                      description:
                        'Tipo de pendência da competência (ex: LEAVE_DATE, COMPETENCE_BELOW_MINIMUM, INCONSISTENT_COMPETENCE)',
                    },
                    collectedAt: {
                      type: 'string',
                      description: 'Data de recolhimento no formato DD/MM/AAAA',
                    },
                  },
                },
              },
            },
            required: [
              'startDate',
              'isPendency',
              'competenceBelowTheMinimum',
              'status',
              'category',
              'endDate',
              'impactMonths',
              'graceMonths',
              'wantsToComplementViaMeuINSS',
              'bondOrigin',
              'contributionAverage',
              'pendencyReason',
              'periodConsideration',
              'earningsHistory',
            ],
          },
        },
      },
      required: [
        'clientData',
        'insuredStatus',
        'gracePeriodStatus',
        'gracePeriods',
        'analysisConclusion',
        'graceExtensionDueToInvoluntaryUnemployment',
        'requestToExtendGracePeriod',
        'graceExempt',
        'graceValidation',
        'contributionTimeWithoutResolvingPendencies',
        'contributionTimeResolvingPendencies',
        'contributionTimeWithAccelerators',
        'periods',
      ],
    };
  }

  private getTemporaryIncapacityBenefitRejectionCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        isEligibleForTemporaryIncapacityBenefit: {
          type: 'boolean',
          description:
            'Indica se o segurado tem direito ao auxílio por incapacidade temporária',
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
                'Lista dos CIDs informados no caso. Cada item deve conter o código CID seguido de hífen e descrição. Ex: ["M51.1 - Degeneração de disco intervertebral"]',
              items: { type: 'string' },
            },
            preliminaryAnalysis: {
              type: 'string',
              description:
                'Análise preliminar da incapacidade com base nos documentos e CIDs, avaliando gravidade, impacto laboral e perspectivas de concessão',
            },
            medicalDocumentsCount: {
              type: 'number',
              description: 'Quantidade de documentos médicos anexados ao caso',
            },
          },
          required: [
            'informedCids',
            'medicalDocumentsCount',
            'preliminaryAnalysis',
          ],
        },
        retirementRules: {
          type: 'array',
          description: 'Lista das regras de aposentadoria aplicáveis ao caso',
          items: {
            type: 'object',
            properties: {
              modality: {
                type: 'string',
                description: 'Nome da modalidade ou regra de aposentadoria',
              },
              isFulfilled: {
                type: 'boolean',
                description: 'Indica se os requisitos da regra foram cumpridos',
              },
              retirementDate: {
                type: ['string', 'null'],
                description:
                  'Data estimada de aposentadoria no formato DD/MM/AAAA, ou null se não aplicável',
              },
              estimatedRmi: {
                type: ['string', 'null'],
                description:
                  'RMI estimada em formato monetário, ou null se não aplicável',
              },
              estimatedCauseValue: {
                type: ['string', 'null'],
                description:
                  'Valor de causa estimado em formato monetário, ou null se não aplicável',
              },
              detailedAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada desta modalidade de aposentadoria, incluindo requisitos, cálculos, fundamentação legal e viabilidade',
              },
            },
            required: [
              'modality',
              'isFulfilled',
              'retirementDate',
              'estimatedRmi',
              'estimatedCauseValue',
              'detailedAnalysis',
            ],
          },
        },
        analysisResult: {
          type: 'string',
          description:
            'Parecer técnico conclusivo completo da análise, incluindo verificação de carência, qualidade de segurado, análise de incapacidade e recomendações técnicas. Retorne em formato Markdown (use ##, ###, **negrito**, listas com - e parágrafos)',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'Conteúdo HTML completo e bem formatado com toda a análise detalhada, pronto para conversão em PDF. Inclua todas as seções: elegibilidade, carência, qualidade de segurado, análise de incapacidade, regras aplicáveis e parecer conclusivo.',
        },
      },
      required: [
        'isEligibleForTemporaryIncapacityBenefit',
        'gracePeriodAnalysis',
        'insuredStatus',
        'disabilityAnalysis',
        'retirementRules',
        'analysisResult',
        'completeAnalysisDownload',
      ],
    };
  }

  private getPermanentIncapacityBenefitTerminatedFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        clientData: {
          type: 'object',
          description: 'Dados do cliente extraídos dos documentos',
          properties: {
            name: {
              type: 'string',
              description: 'Nome completo do cliente',
            },
            cpf: {
              type: 'string',
              description: 'CPF ou CNPJ do cliente',
            },
            birthDate: {
              type: 'string',
              description:
                'Data de nascimento do cliente no formato DD/MM/AAAA',
            },
            category: {
              type: 'string',
              description:
                'Categoria previdenciária do segurado (ex: MEI, Empregado, Contribuinte Individual)',
            },
            nb: {
              type: 'string',
              description: 'Número do Benefício (NB)',
            },
            judicialProcessNumber: {
              type: 'string',
              description: 'Número do processo judicial, se houver',
            },
            incapacityStartDate: {
              type: 'string',
              description:
                'Data de Início da Incapacidade (DII) no formato DD/MM/AAAA',
            },
          },
          required: ['name'],
        },
        insuredStatus: {
          type: 'boolean',
          description:
            'Indica se o segurado possui qualidade de segurado na Data de Início da Incapacidade (DII)',
        },
        gracePeriodStatus: {
          type: 'string',
          description:
            'Indica a situação do período de graça do segurado na DII',
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
                  'Nome do evento que gerou ou sustenta o período de graça',
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
            'Indica se há direito à extensão do período de graça em razão de desemprego involuntário',
        },
        requestToExtendGracePeriod: {
          type: 'boolean',
          description:
            'Indica se é recomendável requerer prorrogação do período de graça administrativamente',
        },
        graceExempt: {
          type: 'boolean',
          description:
            'Indica se o segurado é isento de carência para o benefício',
        },
        graceValidation: {
          type: 'string',
          description:
            'Observação sobre a validação de carência na Data de Início da Incapacidade (DII)',
        },
        contributionTimeWithoutResolvingPendencies: {
          type: 'string',
          description: 'Tempo de contribuição total sem resolver pendências',
        },
        contributionTimeResolvingPendencies: {
          type: 'string',
          description: 'Tempo de contribuição total resolvendo pendências',
        },
        contributionTimeWithAccelerators: {
          type: 'string',
          description: 'Tempo de contribuição total com aceleradores',
        },
        periods: {
          type: 'array',
          description:
            'Lista de períodos de contribuição extraídos do CNIS (Raio-X do CNIS)',
          items: {
            type: 'object',
            properties: {
              bondOrigin: {
                type: 'string',
                description:
                  'Origem do vínculo (nome da empresa ou empregador)',
              },
              category: {
                type: 'string',
                enum: Object.values(
                  TemporaryIncapacityBenefitRejectionCategoryEnum,
                ),
                description:
                  'Categoria do período (ex: EMPREGADO_URBANO, MEI, CONTRIBUINTE_INDIVIDUAL_AUTONOMO)',
              },
              startDate: {
                type: 'string',
                description: 'Data de início do período no formato DD/MM/AAAA',
              },
              endDate: {
                type: 'string',
                description: 'Data de fim do período no formato DD/MM/AAAA',
              },
              impactMonths: {
                type: 'number',
                description: 'Tempo de contribuição do período em meses',
              },
              graceMonths: {
                type: 'number',
                description: 'Carência do período em meses',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o período possui pendência',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description:
                  'Indica se há competências abaixo do mínimo no período',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Média contributiva do período em formato decimal (ex: 1213.50)',
              },
              pendencyReason: {
                type: 'string',
                description:
                  'Motivo da pendência (ex: LEAVE_DATE, COMPETENCE_BELOW_MINIMUM, INCONSISTENT_COMPETENCE)',
              },
              periodConsideration: {
                type: 'string',
                description:
                  'Consideração do período (ex: SIM, NAO, PROVISORIO)',
              },
              wantsToComplementViaMeuINSS: {
                type: 'boolean',
                description:
                  'Indica se deseja fazer a complementação via Meu INSS',
              },
              status: {
                type: 'boolean',
                description:
                  'Status do período (true = válido, false = inválido)',
              },
              earningsHistory: {
                type: 'array',
                description: 'Histórico de remunerações do período',
                items: {
                  type: 'object',
                  properties: {
                    competence: {
                      type: 'string',
                      description: 'Competência no formato MM/AAAA',
                    },
                    value: {
                      type: 'string',
                      description: 'Valor da remuneração em formato decimal',
                    },
                    pendencyType: {
                      type: 'string',
                      description:
                        'Tipo de pendência da competência (ex: COMPETENCE_BELOW_MINIMUM)',
                    },
                    collectedAt: {
                      type: 'string',
                      description: 'Data de recolhimento no formato DD/MM/AAAA',
                    },
                  },
                },
              },
            },
            required: [
              'startDate',
              'isPendency',
              'competenceBelowTheMinimum',
              'status',
              'category',
              'endDate',
              'impactMonths',
              'graceMonths',
              'wantsToComplementViaMeuINSS',
              'bondOrigin',
              'contributionAverage',
              'pendencyReason',
              'periodConsideration',
              'earningsHistory',
            ],
          },
        },
      },
      required: [
        'clientData',
        'insuredStatus',
        'gracePeriodStatus',
        'gracePeriods',
        'analysisConclusion',
        'graceExtensionDueToInvoluntaryUnemployment',
        'requestToExtendGracePeriod',
        'graceExempt',
        'graceValidation',
        'contributionTimeWithoutResolvingPendencies',
        'contributionTimeResolvingPendencies',
        'contributionTimeWithAccelerators',
        'periods',
      ],
    };
  }

  private getPermanentIncapacityBenefitTerminatedCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        isEligibleForPermanentIncapacityBenefit: {
          type: 'boolean',
          description:
            'Indica se o segurado tem direito à aposentadoria por incapacidade permanente',
        },
        gracePeriodAnalysis: {
          type: 'object',
          description: 'Análise da carência previdenciária',
          properties: {
            totalContribution: {
              type: 'string',
              description:
                'Total de contribuições computadas para fins de carência',
            },
            minimumGracePeriodRequired: {
              type: 'string',
              description: 'Carência mínima exigida para o benefício',
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
              description: 'Lista dos CIDs informados no caso',
              items: { type: 'string' },
            },
            preliminaryAnalysis: {
              type: 'string',
              description:
                'Análise preliminar da incapacidade com base nos documentos e CIDs',
            },
            medicalDocumentsCount: {
              type: 'number',
              description: 'Quantidade de documentos médicos anexados ao caso',
            },
          },
          required: [
            'informedCids',
            'medicalDocumentsCount',
            'preliminaryAnalysis',
          ],
        },
        retirementRules: {
          type: 'array',
          description: 'Lista das regras de aposentadoria aplicáveis ao caso',
          items: {
            type: 'object',
            properties: {
              modality: {
                type: 'string',
                description: 'Nome da modalidade ou regra de aposentadoria',
              },
              isFulfilled: {
                type: 'boolean',
                description: 'Indica se os requisitos da regra foram cumpridos',
              },
              retirementDate: {
                type: ['string', 'null'],
                description:
                  'Data estimada de aposentadoria no formato DD/MM/AAAA, ou null se não aplicável',
              },
              estimatedRmi: {
                type: ['string', 'null'],
                description:
                  'RMI estimada em formato monetário, ou null se não aplicável',
              },
              estimatedCauseValue: {
                type: ['string', 'null'],
                description:
                  'Valor de causa estimado em formato monetário, ou null se não aplicável',
              },
              detailedAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada desta modalidade de aposentadoria',
              },
            },
            required: [
              'modality',
              'isFulfilled',
              'retirementDate',
              'estimatedRmi',
              'estimatedCauseValue',
              'detailedAnalysis',
            ],
          },
        },
        analysisResult: {
          type: 'string',
          description:
            'Parecer técnico conclusivo completo da análise. Retorne em formato Markdown',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'Conteúdo HTML completo e bem formatado com toda a análise detalhada, pronto para conversão em PDF.',
        },
      },
      required: [
        'isEligibleForPermanentIncapacityBenefit',
        'gracePeriodAnalysis',
        'insuredStatus',
        'disabilityAnalysis',
        'retirementRules',
        'analysisResult',
        'completeAnalysisDownload',
      ],
    };
  }

  private getBpcDisabilityDenialCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        analysisResult: {
          type: 'string',
          description:
            'Resultado consolidado em Markdown rico, com títulos, parágrafos curtos, listas e conclusão objetiva.',
        },
        analysisDetailedText: {
          type: 'string',
          description:
            'Fundamentação técnica e jurídica detalhada em Markdown rico, estruturada em seções numeradas para renderização em HTML.',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'Versão completa em Markdown rico da análise, pronta para conversão em HTML/PDF/DOCX.',
        },
        applicableRules: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              status: { type: 'string' },
            },
            required: ['title', 'description', 'status'],
          },
        },
        benefitSummaries: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              benefitType: { type: 'string' },
              result: { type: 'string' },
              dib: { type: 'string' },
              expectedMonthlyBenefit: { type: 'number' },
              detailedAnalysis: { type: 'string' },
            },
            required: ['benefitType', 'result'],
          },
        },
      },
      required: [
        'analysisResult',
        'analysisDetailedText',
        'completeAnalysisDownload',
        'applicableRules',
        'benefitSummaries',
      ],
    };
  }

  private getBpcDisabilityGrantCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        isElligibleForDisabilityBpc: {
          type: 'boolean',
          description:
            'Indica se o segurado é elegível ao BPC por deficiência.',
        },
        totalFamiliarIncome: {
          type: 'string',
          description: 'Renda familiar total bruta. Exemplo: "5.000,00".',
        },
        perCapitaIncome: {
          type: 'string',
          description:
            'Renda per capita do grupo familiar. Exemplo: "1.250,00".',
        },
        lessThanOneQuarter: {
          type: 'boolean',
          description:
            'Indica se a renda per capita é inferior a 1/4 do salário mínimo.',
        },
        lessThanHalfAndAboveOneQuarter: {
          type: 'boolean',
          description:
            'Indica se a renda per capita está entre 1/4 e 1/2 do salário mínimo.',
        },
        disabilityProven: {
          type: 'boolean',
          description:
            'Indica se a deficiência foi comprovada por laudo médico/pericial.',
        },
        retirementRules: {
          type: 'array',
          description:
            'Lista de regras legais/previdenciarias aplicaveis ao caso, incluindo regras por artigo e por tipo de beneficio (ex.: Regra BPC PCD, Salario-Maternidade).',
          items: {
            type: 'object',
            properties: {
              benefitType: {
                type: 'string',
                description:
                  'Tipo de beneficio/regra juridico-previdenciaria analisada. Exemplo: "BPC pessoa com deficiencia", "Salario-Maternidade".',
              },
              result: {
                type: 'boolean',
                description: 'Resultado da regra: atingido ou nao atingido.',
              },
              benefitStartDate: {
                type: 'string',
                description:
                  'Data de início do benefício no formato ISO 8601. Exemplo: "2024-01-15".',
              },
              RMIprevista: {
                type: 'string',
                description:
                  'Valor da RMI prevista em formato monetario. Exemplo: "R$1.412,00".',
              },
              detaildAnalysis: {
                type: 'string',
                description:
                  'Analise detalhada da aplicacao da regra ao caso, com fundamentacao tecnica e juridica.',
              },
            },
            required: [
              'benefitType',
              'result',
              'benefitStartDate',
              'RMIprevista',
              'detaildAnalysis',
            ],
          },
        },
        analysisResult: {
          type: 'string',
          description:
            'Resultado completo da análise em Markdown com títulos, listas e conclusão objetiva.',
        },
      },
      required: [
        'isElligibleForDisabilityBpc',
        'totalFamiliarIncome',
        'perCapitaIncome',
        'lessThanOneQuarter',
        'lessThanHalfAndAboveOneQuarter',
        'disabilityProven',
        'retirementRules',
        'analysisResult',
      ],
    };
  }

  private getBpcDisabilityTerminationCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        analysisResult: {
          type: 'string',
          description: 'Resumo principal do resultado da análise.',
        },
        analysisDetailedText: {
          type: 'string',
          description: 'Texto detalhado da análise final.',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'Versão em Markdown da análise completa, pronta para exportação.',
        },
        applicableRules: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              status: { type: 'string' },
            },
            required: ['title', 'description', 'status'],
          },
        },
        benefitSummaries: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              benefitType: { type: 'string' },
              result: { type: 'string' },
              dib: { type: 'string' },
              expectedMonthlyBenefit: { type: 'number' },
              detailedAnalysis: { type: 'string' },
            },
            required: ['benefitType', 'result'],
          },
        },
      },
      required: [
        'analysisResult',
        'analysisDetailedText',
        'completeAnalysisDownload',
        'applicableRules',
        'benefitSummaries',
      ],
    };
  }

  private getMaternityPayGrantFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        insuredQualityAnalysis: {
          type: 'object',
          description:
            'Análise da qualidade de segurada na data do evento gerador',
          properties: {
            isConfirmed: {
              type: 'boolean',
              description:
                'Indica se a qualidade de segurada foi confirmada na data do evento gerador',
            },
            status: {
              type: 'string',
              description:
                'Status da qualidade de segurada: CONFIRMADA (a qualidade de segurada foi confirmada na data do evento gerador), NÃO CONFIRMADA (a qualidade de segurada não foi confirmada na data do evento gerador), PENDENTE (há pendências ou informações insuficientes para confirmar a qualidade de segurada na data do evento gerador, ou seja, existem indícios que sugerem que a qualidade de segurada pode estar presente, mas ainda é necessário resolver pendências ou obter informações adicionais para uma confirmação definitiva).',
              enum: [
                'QUALIDADE_DE_SEGURADO_MANTIDA',
                'QUALIDADE_DE_SEGURADO_NAO_CONFIRMADA',
              ],
            },
            description: {
              type: 'string',
              description:
                'Descrição detalhada da análise da qualidade de segurada',
            },
          },
          required: ['isConfirmed', 'description', 'status'],
        },
        carenciaAnalysis: {
          type: 'object',
          description:
            'Análise do cumprimento da carência para salário-maternidade',
          properties: {
            status: {
              type: 'string',
              description:
                'Status do cumprimento da carência: CUMPRIDA (a carência necessária foi cumprida), NÃO CUMPRIDA (a carência necessária não foi cumprida), PARCIALMENTE CUMPRIDA (a carência necessária foi parcialmente cumprida, ou seja, o segurado possui algumas contribuições, mas não atinge o total necessário para cumprir a carência, ou há pendências que precisam ser resolvidas para comprovar o cumprimento total da carência).',
              enum: [
                'Isento_de_Carencia_Base_Artigo_25_Lei_8213',
                'Nao_Isento_de_Carencia_Base_Artigo_25_Lei_8213',
              ],
            },
            isConfirmed: {
              type: 'boolean',
              description: 'Indica se a carência necessária foi cumprida',
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada da análise da carência',
            },
          },
          required: ['isConfirmed', 'description', 'status'],
        },
        requirementAnalysis: {
          type: 'object',
          description:
            'Análise do cumprimento dos requisitos para salário-maternidade',
          properties: {
            status: {
              type: 'string',
              description:
                'Status do cumprimento dos requisitos: CUMPRIDOS (todos os requisitos foram cumpridos), NÃO CUMPRIDOS (um ou mais requisitos não foram cumpridos), PARCIALMENTE CUMPRIDOS (alguns requisitos foram cumpridos, mas outros não, ou há pendências que precisam ser resolvidas para comprovar o cumprimento total dos requisitos).',
              enum: [
                'Dentro_do_prazo_de_requiremento',
                'Fora_do_prazo_de_requiremento',
              ],
            },
            description: {
              type: 'string',
              description:
                'Descrição detalhada da análise do cumprimento dos requisitos para salário-maternidade',
            },
            eventDate: {
              type: 'string',
              description:
                'Data do evento gerador no formato YYYY-MM-DD. Null se não identificada.',
            },
            requirementDate: {
              type: 'string',
              description:
                'Data do requerimento no formato YYYY-MM-DD. Null se não identificada.',
            },
            statutoryPeriod: {
              type: 'string',
              description:
                'Prazo legal para requerimento do benefício, que varia de acordo com o tipo de evento gerador',
            },
            details: {
              type: 'string',
              description:
                'Descrição detalhada da análise do cumprimento dos requisitos, incluindo quais requisitos foram cumpridos ou não cumpridos, e quais pendências existem para comprovar o cumprimento total dos requisitos',
            },
            rationale: {
              type: 'string',
              description:
                'Fundamentação detalhada para a conclusão sobre o cumprimento dos requisitos, baseada na legislação vigente, na jurisprudência aplicável e nos dados analisados',
            },
          },
          required: [
            'status',
            'description',
            'eventDate',
            'requirementDate',
            'statutoryPeriod',
            'details',
            'rationale',
          ],
        },
        applicationDeadlineAnalysis: {
          type: 'object',
          description:
            'Análise do cumprimento do prazo de requerimento para salário-maternidade',
          properties: {
            status: {
              type: 'string',
              description:
                'Parto normal ou aborto espontâneo: Prazo de requerimento é de até 28 dias após a data do evento gerador. Parto prematuro: Prazo de requerimento é de até 28 dias após a data prevista para o parto. Aborto induzido legal: Prazo de requerimento é de até 28 dias após a data do evento gerador. Nascimento de natimorto: Prazo de requerimento é de até 28 dias após a data do evento gerador.',
              enum: [
                'PARTO_NORMAL',
                'PARTO_PREMATURO',
                'ABORTO_ESPONTANEO',
                'ABORTO_INDUZIDO_LEGAL',
                'NASCIMENTO_NATIMORTO',
              ],
            },
            duration: {
              type: 'string',
              description:
                'Duração entre a data do evento gerador e a data do requerimento, apresentada em formato textual (ex: 45 dias). Null se não calculável.',
            },
            startDate: {
              type: 'string',
              format: 'date',
              description:
                'Data de início de inicio do beneficio, se aplicável, no formato YYYY-MM-DD',
            },
            terminationDate: {
              type: 'string',
              format: 'date',
              description:
                'Data de cessação do benefício, se aplicável, no formato YYYY-MM-DD',
            },
            startLeaveDate: {
              type: 'string',
              format: 'date',
              description:
                'Data de início do afastamento, se aplicável, no formato YYYY-MM-DD',
            },
            endLeaveDate: {
              type: 'string',
              format: 'date',
              description:
                'Data de término do afastamento, se aplicável, no formato YYYY-MM-DD',
            },
            total: {
              type: 'number',
              description:
                'Total de dias entre a data de início do afastamento e a data de término do afastamento',
            },
            amountBenefit: {
              type: 'string',
              description:
                'Valor estimado do benefício quando aplicável, em formato textual (ex: R$ 3.218,45). Null se não calculável.',
            },
            calculationBasis: {
              type: 'string',
              description:
                'Base de cálculo utilizada para estimar o valor do benefício,média das ultimas contribuições ou salário de contribuição, quando disponível nos dados estruturados. Null se não calculável.',
            },
          },
          required: [
            'status',
            'duration',
            'startDate',
            'terminationDate',
            'startLeaveDate',
            'endLeaveDate',
            'total',
            'amountBenefit',
            'calculationBasis',
          ],
        },
        benefitEligibilityAnalysis: {
          type: 'object',
          description: 'Análise da elegibilidade para o salário-maternidade',
          properties: {
            isConfirmed: {
              type: 'boolean',
              description: 'Indica se há direito ao salário-maternidade',
            },
            description: {
              type: 'string',
              description:
                'Descrição detalhada da elegibilidade para o benefício',
            },
          },
          required: ['isConfirmed', 'description'],
        },
        periods: {
          type: 'array',
          description: 'Lista de períodos contributivos analisados',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Nome ou identificação do período',
              },
              startDate: {
                type: 'string',
                format: 'date',
                description: 'Data de início do período no formato YYYY-MM-DD',
              },
              endDate: {
                type: 'string',
                format: 'date',
                description: 'Data de término do período no formato YYYY-MM-DD',
              },
              category: {
                type: 'string',
                description: 'Categoria do segurado para este período',
                enum: [
                  'EMPREGADO_URBANO',
                  'EMPREGADO_RURAL',
                  'EMPREGO_DOMESTICO',
                  'TRABALHADOR_AVULSO',
                  'CONTRIBUINTE_INDIVIDUAL_AUTONOMO',
                  'CONTRIBUINTE_INDIVIDUAL_PRESTADOR',
                  'MEI',
                  'SEGURADO_ESPECIAL',
                  'SEGURADO_FACULTATIVO',
                ],
              },
              gracePeriod: {
                type: 'number',
                description: 'Período de graça calculado em meses',
              },
              status: {
                type: 'boolean',
                description: 'Indica se o período é válido para contagem',
              },
              isPendency: {
                type: 'boolean',
                description: 'Indica se o período possui pendências',
              },
              competenceBelowTheMinimum: {
                type: 'boolean',
                description:
                  'Indica se há competências abaixo do salário mínimo neste período',
              },
              contributionAverage: {
                type: 'string',
                description:
                  'Média das contribuições do período quando disponível nos dados estruturados',
              },
              belowMinimumContributions: {
                type: 'array',
                description:
                  'Lista de competências com contribuições abaixo do mínimo',
                items: {
                  type: 'object',
                  properties: {
                    contributionDate: {
                      type: 'string',
                      format: 'date',
                      description: 'Data da competência no formato YYYY-MM-DD',
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
                description: 'Motivo da pendência quando isPendency é true',
                enum: [
                  'LEAVE_DATE',
                  'COMPETENCE_BELOW_MINIMUM',
                  'INCONSISTENT_COMPETENCE',
                ],
              },
              bondOrigin: {
                type: 'string',
                description: 'Origem do vínculo previdenciário',
              },
              impact: {
                type: 'string',
                description:
                  'Impacto deste período na elegibilidade do benefício',
              },
              complementViaMyInss: {
                type: 'boolean',
                description:
                  'Indica se há possibilidade de complementação via Meu INSS',
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
            ],
          },
        },
        lastContribution: {
          type: 'string',
          format: 'date',
          description:
            'Data da última contribuição identificada no CNIS no formato YYYY-MM-DD. Null se não identificada.',
          nullable: true,
        },
        categoryAtDfg: {
          type: 'string',
          description:
            'Categoria contributiva do segurado na data do fato gerador (DFG), ex: "desempregada (ex-empregada)".',
        },
        employmentBondStatus: {
          type: 'string',
          description:
            'Status do vínculo contributivo na data do fato gerador, ex: "Inativo - desempregada há 7 meses na DFG".',
        },
      },
      required: [
        'insuredQualityAnalysis',
        'carenciaAnalysis',
        'requirementAnalysis',
        'applicationDeadlineAnalysis',
        'benefitEligibilityAnalysis',
        'periods',
        'lastContribution',
        'categoryAtDfg',
        'employmentBondStatus',
      ],
    };
  }

  private getMaternityPayGrantResultAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        eligibilityStatus: {
          type: 'string',
          enum: ['ELIGIBLE', 'NOT_ELIGIBLE', 'ELIGIBLE_WITH_PENDENCIES'],
          description: 'Status de elegibilidade para o salário-maternidade',
        },
        insuredQualityStatus: {
          type: 'string',
          enum: ['CONFIRMED', 'NOT_CONFIRMED', 'CONDITIONAL'],
          description: 'Status da qualidade de segurada',
        },
        applicableRules: {
          type: 'array',
          description: 'Regras aplicáveis ao caso de salário-maternidade',
          items: {
            type: 'object',
            properties: {
              ruleName: {
                type: 'string',
                description: 'Nome da regra ou critério analisado',
              },
              result: {
                type: 'string',
                description: 'Resultado da análise desta regra',
              },
              estimatedBenefit: {
                type: 'string',
                description:
                  'Valor estimado do benefício quando aplicável. Null se não calculável.',
              },
              detailedAnalysis: {
                type: 'string',
                description: 'Análise detalhada desta regra',
              },
            },
            required: ['ruleName', 'result', 'detailedAnalysis'],
          },
        },
        analysisDescription: {
          type: 'string',
          description:
            'Texto explicativo completo sobre o resultado da análise e as perspectivas do caso',
        },
        completeAnalysisDownload: {
          type: 'string',
          description:
            'Detalhamento completo da análise, incluindo a avaliação de cada documento e uma explicação detalhada de cada caso. Conteúdo HTML completo e bem formatado com toda a análise detalhada, pronto para conversão em PDF.',
        },
      },
      required: [
        'eligibilityStatus',
        'insuredQualityStatus',
        'applicableRules',
        'analysisDescription',
        'completeAnalysisDownload',
      ],
    };
  }

  private getTeacherRetirementPlanningRejectionPppAnalysisJsonSchema(): object {
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
                description:
                  'Categoria do período (ex: magistério, atividade administrativa, atividade especial)',
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
                description: 'Motivo da pendência, se houver',
              },
              periodConsideration: {
                type: 'string',
                description: 'Consideração do período para o benefício',
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
              hasSpecialPeriod: {
                type: 'boolean',
                description:
                  'Indica se o período possui atividade especial identificada no PPP',
              },
              timelineClassification: {
                type: 'string',
                enum: Object.values(
                  TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum,
                ),
                description:
                  'Classificação do período na linha do tempo (PCD_TIME, COMMON_TIME, INACTIVITY_PERIOD, TEACHER_TIME ou PENDENCY_PERIOD)',
              },
            },
            required: [
              'startDate',
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
          },
          required: ['status', 'description'],
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

  private getElderlyBpcRejectionCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        isElligibleForElderlyBpc: {
          type: 'boolean',
          description:
            'Indica se o requerente é elegível para o BPC idoso com base na análise completa do caso.',
        },
        totalFamiliarIncome: {
          type: 'string',
          description:
            'Renda familiar total mensal declarada e/ou apurada, expressa em reais (ex: R$ 1.200,00).',
        },
        perCapitaIncome: {
          type: 'string',
          description:
            'Renda per capita do grupo familiar, expressa em reais (ex: R$ 200,00).',
        },
        lessThanOneQuarter: {
          type: 'boolean',
          description:
            'Indica se a renda per capita é inferior a 1/4 do salário mínimo vigente.',
        },
        ageGreaterThanOrEqualToSixtyFiveYears: {
          type: 'boolean',
          description:
            'Indica se o requerente possui 65 anos de idade ou mais.',
        },
        retirementRules: {
          type: 'array',
          description:
            'Lista de regras de aposentadoria avaliadas para o requerente.',
          items: {
            type: 'object',
            properties: {
              ruleName: {
                type: 'string',
                description: 'Nome da regra de aposentadoria avaliada.',
              },
              fulfilled: {
                type: 'boolean',
                description: 'Indica se a regra foi cumprida pelo requerente.',
              },
              benefitStartDate: {
                type: 'string',
                description:
                  'Data de início do benefício caso a regra seja cumprida, no formato DD/MM/AAAA.',
              },
              bestRmi: {
                type: 'boolean',
                description:
                  'Indica se esta regra resulta na melhor RMI para o requerente.',
              },
              biggestCauseValue: {
                type: 'boolean',
                description:
                  'Indica se esta regra resulta no maior valor de causa.',
              },
              detaildAnalysis: {
                type: 'string',
                description:
                  'Análise detalhada da regra, incluindo os requisitos, o que foi atendido e o que falta para cumprimento.',
              },
            },
            required: [
              'ruleName',
              'fulfilled',
              'benefitStartDate',
              'bestRmi',
              'biggestCauseValue',
              'detaildAnalysis',
            ],
          },
        },
        analysisResult: {
          type: 'string',
          description:
            'Análise completa e detalhada do caso de indeferimento do BPC idoso, incluindo avaliação da composição familiar, renda per capita, elegibilidade por idade e conclusão fundamentada sobre a viabilidade de reversão do indeferimento. A análise deve ser formatada em Markdown, pronta para exportação em PDF/DOCX.',
        },
      },
      required: [
        'isElligibleForElderlyBpc',
        'totalFamiliarIncome',
        'perCapitaIncome',
        'lessThanOneQuarter',
        'ageGreaterThanOrEqualToSixtyFiveYears',
        'retirementRules',
        'analysisResult',
      ],
    };
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async getAccidentAssistanceGrantFirstAnalysis(
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
          jsonSchema: this.getAccidentAssistanceGrantFirstAnalysisJsonSchema(),
        }),
      }),
    );
  }

  private getAccidentAssistanceGrantFirstAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        firstAnalysis: {
          type: 'string',
          description:
            'Análise técnica completa e detalhada em formato Markdown, cobrindo: 1) Perfil do Segurado e Qualidade de Segurado, 2) Análise do Acidente e da Sequela Definitiva, 3) Requisitos Legais (checklist com ✅/❌/⚠️), 4) Análise do Histórico Previdenciário (CNIS), 5) Diagnóstico e Viabilidade, 6) Pendências e Recomendações.',
        },
        analysisConclusion: {
          type: 'string',
          description:
            'Resumo objetivo em formato Markdown focado na aplicabilidade do Auxílio-Acidente para exibição em tabela de regras. Deve incluir: viabilidade geral (Alta/Média/Baixa/Inviável), checklist de requisitos com ✅/❌/⚠️, fundamento jurídico, pontos fortes, pontos de atenção e recomendação estratégica.',
        },
        expectedRmi: {
          type: 'string',
          nullable: true,
          description:
            'RMI prevista (Renda Mensal Inicial) do Auxílio-Acidente formatada em reais brasileiros (ex: "R$ 756,00"). Deve ser calculada com base no salário de benefício identificado no CNIS aplicando o coeficiente de 50%. Retornar null se não for possível calcular.',
        },
        estimatedCaseValue: {
          type: 'string',
          nullable: true,
          description:
            'Valor da causa estimado formatado em reais brasileiros (ex: "R$ 18.144,00"). Deve ser calculado multiplicando a RMI por 24 (dois anos de parcelas vencidas como referência). Retornar null se não for possível calcular.',
        },
      },
      required: ['firstAnalysis', 'analysisConclusion'],
    };
  }

  private getRetirementPermanentDisabilityRevisionCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        benefitReviewEligible: {
          type: 'string',
          description: 'Indica se o cliente possui direito à revisão.',
        },
        benefitReviewStatusMessage: {
          type: 'string',
          description: 'Mensagem principal exibida no topo.',
        },
        benefitReviewSummary: {
          type: 'string',
          description: 'Resumo da conclusão da análise.',
        },
        benefitReviewAlertType: {
          type: 'string',
          description: 'Tipo visual do alerta da interface.',
        },
        introductoryText: {
          type: 'string',
          description: 'Texto introdutório/contextual.',
        },
        informationBoxType: {
          type: 'string',
          description: 'Tipo do box de informação.',
        },
        reviewTheses: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              thesisName: {
                type: 'string',
                description: 'Nome da tese revisional.',
              },
              thesisDescription: {
                type: 'string',
                description: 'Descrição detalhada da tese.',
              },
              thesisApplicable: {
                type: 'string',
                description: 'Indica se a tese é aplicável.',
              },
            },
            required: ['thesisName', 'thesisDescription', 'thesisApplicable'],
          },
        },
        benefitType: {
          type: 'string',
          description: 'Tipo do benefício analisado.',
        },
        reviewPossible: {
          type: 'string',
          description: 'Indica se existe possibilidade de revisão.',
        },
        reviewTypes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              reviewTypeName: {
                type: 'string',
                description: 'Nome do tipo de revisão.',
              },
              reviewTypeStatus: {
                type: 'string',
                description: 'Status da revisão.',
              },
            },
            required: ['reviewTypeName', 'reviewTypeStatus'],
          },
        },
        originalRMI: {
          type: 'string',
          description: 'Valor original da RMI.',
        },
        originalRMA: {
          type: 'string',
          description: 'Valor original da RMA.',
        },
        revisedRMI: {
          type: 'string',
          description: 'Valor revisado da RMI.',
        },
        revisedRMA: {
          type: 'string',
          description: 'Valor revisado da RMA.',
        },
        estimatedCaseValue: {
          type: 'string',
          description: 'Valor estimado da causa.',
        },
        detailedAnalysisText: {
          type: 'string',
          description: 'Texto completo da análise detalhada.',
        },
        analysisResultsText: {
          type: 'string',
          description: 'Resultado final da análise.',
        },
        analysisResultType: {
          type: 'string',
          description: 'Tipo do resultado final.',
        },
        downloadContent: {
          type: 'string',
          description:
            'Conteúdo completo da análise em Markdown para geração do download.',
        },
      },
      required: [
        'benefitReviewEligible',
        'benefitReviewStatusMessage',
        'benefitReviewSummary',
        'benefitReviewAlertType',
        'introductoryText',
        'informationBoxType',
        'reviewTheses',
        'benefitType',
        'reviewPossible',
        'reviewTypes',
        'originalRMI',
        'originalRMA',
        'revisedRMI',
        'revisedRMA',
        'estimatedCaseValue',
        'detailedAnalysisText',
        'analysisResultsText',
        'analysisResultType',
        'downloadContent',
      ],
    };
  }

  private getSpecialRetirementGrantCompleteAnalysisJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        regrasAplicaveis: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              modalidade: { type: 'string' },
              cumprida: { type: 'boolean' },
              dataDaAposentadoria: { type: 'string' },
              rmiPrevista: { type: 'string' },
              valorDaCausaEstimada: { type: 'string' },
              melhorRmi: { type: 'boolean' },
              maiorValorDeCausa: { type: 'boolean' },
              analiseDetalhada: { type: 'string' },
            },
            required: [
              'modalidade',
              'cumprida',
              'dataDaAposentadoria',
              'rmiPrevista',
              'valorDaCausaEstimada',
              'melhorRmi',
              'maiorValorDeCausa',
              'analiseDetalhada',
            ],
          },
        },
        periodosReconhecidos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              origemDoVinculo: { type: 'string' },
              periodo: { type: 'string' },
              categoria: { type: 'string' },
              agentes: { type: 'string' },
              tempoEspecial: { type: 'string' },
              tempoConvertido: { type: 'string' },
              status: { type: 'string' },
            },
            required: [
              'origemDoVinculo',
              'periodo',
              'categoria',
              'agentes',
              'tempoEspecial',
              'tempoConvertido',
              'status',
            ],
          },
        },
        resultadoDaAnalise: { type: 'string' },
      },
      required: [
        'regrasAplicaveis',
        'periodosReconhecidos',
        'resultadoDaAnalise',
      ],
    };
  }
}
