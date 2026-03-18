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
- A anÃ¡lise tÃ©cnica deve se basear prioritariamente na anÃ¡lise jÃ¡ processada do CNIS em formato JSON;
- Calcule somente os valores que nÃ£o estiverem presentes na anÃ¡lise jÃ¡ fornecida do CNIS, nÃ£o realize calculos como valores salÃ¡riais, use estritamente os fornecidos.
- NÃ£o incluir tag <br> na resposta.
Para a SeÃ§Ã£o 6 (CÃLCULOS), siga rigorosamente as instruÃ§Ãµes abaixo:
1. Para cÃ¡lculos ja efetuados, nÃ£o calcule novamente, use os valores fornecidos na anÃ¡lise do CNIS.
2. Garanta precisÃ£o absoluta nos cÃ¡lculos numÃ©ricos e de datas que precisar fazer.
3. Formate todos os valores monetÃ¡rios no padrÃ£o brasileiro: prefixo "R$ ", milhar com ponto e decimal com vÃ­rgula (ex.: R$ 1.234,56).

AnÃ¡lise processada do CNIS:
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
                  'Tempo total de contribuiÃ§Ã£o de serviÃ§o. Exemplo: 44 anos, 3 meses e 12 dias',
              },
              publicServiceContributionTime: {
                type: 'string',
                description:
                  'Tempo total de contribuiÃ§Ã£o em serviÃ§o pÃºblico. Exemplo: 30 anos, 2 meses e 5 dias',
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
                description: 'ProfissÃ£o do segurado',
              },
              totalCareerTime: {
                type: 'string',
                description:
                  'Tempo total de carreira. Exemplo: 50 anos, 1 mÃªs e 20 dias',
              },
              publicServiceStartDate: {
                type: 'string',
                format: 'date-time',
                description: 'Data de ingresso no serviÃ§o pÃºblico',
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
                        'Indica se a regra oferece o maior valor no cenÃ¡rio mais vantajoso',
                    },
                    retirementAnalysis: {
                      type: 'string',
                      description:
                        'AnÃ¡lise detalhada da aposentadoria em formato markdown',
                    },
                    isEligible: {
                      type: 'boolean',
                      description:
                        'Indica se o segurado Ã© elegÃ­vel para a regra',
                    },
                    eligibilityAvailableAt: {
                      type: 'string',
                      description:
                        'Data em que o segurado se tornarÃ¡ elegÃ­vel para a regra, se aplicÃ¡vel',
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
                      'Lista de perÃ­odos de atividade especial analisados',
                    items: {
                      type: 'object',
                      properties: {
                        label: {
                          type: 'string',
                          description: 'RÃ³tulo descritivo do perÃ­odo',
                        },
                        start: {
                          type: 'string',
                          description: 'Data de inÃ­cio no formato YYYY-MM-DD',
                        },
                        end: {
                          type: 'string',
                          description: 'Data de tÃ©rmino no formato YYYY-MM-DD',
                        },
                        recognized: {
                          type: 'boolean',
                          description:
                            'Indica se o perÃ­odo foi reconhecido como atividade especial',
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
                          description: 'Cargo/funÃ§Ã£o exercida',
                        },
                        employmentLinkStartDate: {
                          type: 'string',
                          description: 'Data de inÃ­cio do vÃ­nculo',
                        },
                        employmentLinkEndDate: {
                          type: 'string',
                          description: 'Data de tÃ©rmino do vÃ­nculo',
                        },
                        employmentLinkSupportingDocument: {
                          type: 'string',
                          description: 'Documento comprobatÃ³rio do vÃ­nculo',
                        },
                        employmentLinkPresentInCNIS: {
                          type: 'boolean',
                          description: 'Indica se o vÃ­nculo consta no CNIS',
                        },
                        employmentLinkEarningsInCNIS: {
                          type: 'boolean',
                          description:
                            'Indica se hÃ¡ remuneraÃ§Ãµes registradas no CNIS',
                        },
                        harmfulAgentsHasAny: {
                          type: 'boolean',
                          description:
                            'Indica se hÃ¡ agentes nocivos identificados',
                        },
                        harmfulAgentsExposureFrequency: {
                          type: 'array',
                          description:
                            'FrequÃªncia e intensidade de exposiÃ§Ã£o aos agentes',
                          items: {
                            type: 'object',
                            properties: {
                              agent: {
                                type: 'string',
                                description: 'Nome do agente nocivo',
                              },
                              intensity: {
                                type: 'string',
                                description: 'Intensidade da exposiÃ§Ã£o',
                              },
                              characteristic: {
                                type: 'string',
                                description: 'CaracterÃ­stica do agente',
                              },
                            },
                          },
                        },
                        harmfulAgentsInformationSource: {
                          type: 'array',
                          description:
                            'Fontes de informaÃ§Ã£o sobre os agentes',
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
                            'Indica se havia EPI (Equipamento de ProteÃ§Ã£o Individual) eficaz',
                        },
                        legalFrameworkOccupationalCategoryDecree: {
                          type: 'string',
                          description:
                            'Decreto aplicÃ¡vel Ã  categoria profissional',
                        },
                        legalFrameworkOccupationalCategoryCode: {
                          type: 'string',
                          description: 'CÃ³digo da categoria profissional',
                        },
                        legalFrameworkOccupationalCategoryDescription: {
                          type: 'string',
                          description: 'DescriÃ§Ã£o da categoria profissional',
                        },
                        legalFrameworkHarmfulAgentDecree: {
                          type: 'string',
                          description: 'Decreto aplicÃ¡vel ao agente nocivo',
                        },
                        legalFrameworkHarmfulAgentCode: {
                          type: 'string',
                          description: 'CÃ³digo do agente nocivo',
                        },
                        legalFrameworkHarmfulAgentDescription: {
                          type: 'string',
                          description: 'DescriÃ§Ã£o do agente nocivo',
                        },
                        legalFrameworkCaseLawOrTechnicalStandardReference: {
                          type: 'string',
                          description: 'ReferÃªncia da jurisprudÃªncia/norma',
                        },
                        legalFrameworkCaseLawOrTechnicalStandardCode: {
                          type: 'string',
                          description: 'CÃ³digo da norma tÃ©cnica',
                        },
                        legalFrameworkCaseLawOrTechnicalStandardDescription: {
                          type: 'string',
                          description: 'DescriÃ§Ã£o da norma tÃ©cnica',
                        },
                        technicalConclusionSpecialTimeRecognized: {
                          type: 'boolean',
                          description:
                            'Indica se o tempo especial foi reconhecido',
                        },
                        technicalConclusionJustification: {
                          type: 'string',
                          description: 'Justificativa da conclusÃ£o tÃ©cnica',
                        },
                        additionalNotes: {
                          type: 'string',
                          description: 'ObservaÃ§Ãµes adicionais relevantes',
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
                    description: 'AnÃ¡lise completa em formato markdown',
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
                description: 'Lista de itens de conversÃ£o de tempo especial',
                items: {
                  type: 'object',
                  properties: {
                    originJobTitleDescription: {
                      type: 'string',
                      description: 'DescriÃ§Ã£o do cargo/funÃ§Ã£o de origem',
                    },
                    periodDateRangeText: {
                      type: 'string',
                      description:
                        'Texto descritivo do perÃ­odo (ex: 01/2010 a 12/2015)',
                    },
                    harmfulExposureAgentsText: {
                      type: 'string',
                      description:
                        'DescriÃ§Ã£o dos agentes nocivos identificados',
                    },
                    specialTimeDurationText: {
                      type: 'string',
                      description:
                        'DuraÃ§Ã£o do tempo especial em formato textual',
                    },
                    convertedTimeDurationText: {
                      type: 'string',
                      description:
                        'DuraÃ§Ã£o do tempo convertido em formato textual',
                    },
                    conversionFactorValue: {
                      type: 'number',
                      description:
                        'Fator de conversÃ£o aplicado (ex: 1.4, 1.2)',
                    },
                    recognitionStatusEnum: {
                      type: 'string',
                      description:
                        'Status de reconhecimento do perÃ­odo especial',
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

  private getGeneralUrbanRetirementCompleteAnalysisJsonSchema(): object {
    const specialTimePeriodSchema = {
      type: 'object',
      properties: {
        label: {
          type: 'string',
          description: 'RÃ³tulo descritivo do perÃ­odo',
        },
        start: {
          type: 'string',
          description: 'Data de inÃ­cio no formato YYYY-MM-DD',
        },
        end: {
          type: 'string',
          description: 'Data de tÃ©rmino no formato YYYY-MM-DD',
        },
        recognized: {
          type: 'boolean',
          description: 'Indica se o perÃ­odo foi reconhecido',
        },
        companyName: { type: 'string', description: 'Nome da empresa' },
        companyCNPJ: { type: 'string', description: 'CNPJ da empresa' },
        role: { type: 'string', description: 'Cargo/funÃ§Ã£o' },
        employmentLinkStartDate: {
          type: 'string',
          description: 'InÃ­cio do vÃ­nculo',
        },
        employmentLinkEndDate: {
          type: 'string',
          description: 'Fim do vÃ­nculo',
        },
        employmentLinkSupportingDocument: {
          type: 'string',
          description: 'Documento comprobatÃ³rio',
        },
        employmentLinkPresentInCNIS: {
          type: 'boolean',
          description: 'VÃ­nculo consta no CNIS',
        },
        employmentLinkEarningsInCNIS: {
          type: 'boolean',
          description: 'RemuneraÃ§Ãµes no CNIS',
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
        label: { type: 'string', description: 'RÃ³tulo do perÃ­odo PCD' },
        start: { type: 'string', description: 'Data de inÃ­cio YYYY-MM-DD' },
        end: { type: 'string', description: 'Data de tÃ©rmino YYYY-MM-DD' },
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
          description: 'Tipo de deficiÃªncia (ex: FÃ­sica)',
        },
        cidCodes: {
          type: 'array',
          items: { type: 'string' },
          description: 'CID(s) identificados',
        },
        cifClassification: {
          type: 'string',
          description: 'ClassificaÃ§Ã£o CIF',
        },
        disabilityDegree: {
          type: 'string',
          description: 'Grau da deficiÃªncia (Leve, Moderado, Grave)',
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
              description: 'NÃºmero do processo judicial',
            },
          },
          required: ['name', 'birthDate'],
        },
        rulesSummary: {
          type: 'object',
          description:
            'NÃºmero total de regras analisadas, elegÃ­veis e nÃ£o elegÃ­veis',
          properties: {
            totalAnalyzed: {
              type: 'number',
              description: 'Total de regras analisadas',
            },
            eligibleCount: {
              type: 'number',
              description: 'Quantidade de regras elegÃ­veis',
            },
            nonEligibleCount: {
              type: 'number',
              description: 'Quantidade de regras nÃ£o elegÃ­veis',
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
                description: 'Se o segurado Ã© elegÃ­vel',
              },
              rightDate: {
                type: 'string',
                description:
                  'Data do direito no formato YYYY-MM-DD (quando elegÃ­vel)',
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
                description: 'Indica se possui o maior valor de aÃ§Ã£o',
              },
              detailedRuleAnalysis: {
                type: 'string',
                description:
                  'AnÃ¡lise detalhada da regra (requisitos, cÃ¡lculo RMI, valor da causa)',
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
                description: 'Data de inÃ­cio YYYY-MM-DD',
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
                description: 'ClassificaÃ§Ã£o do perÃ­odo',
              },
              location: { type: 'string', description: 'Local do perÃ­odo' },
              duration: {
                type: 'string',
                description: 'DuraÃ§Ã£o (ex: 4 anos)',
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
            'AnÃ¡lise do tempo especial (perÃ­odos com agentes nocivos)',
          items: specialTimePeriodSchema,
        },
        pcdTimeAnalysis: {
          type: 'array',
          description:
            'AnÃ¡lise do tempo PCD (perÃ­odos como pessoa com deficiÃªncia)',
          items: pcdPeriodSchema,
        },
        contributionTimeSummary: {
          type: 'object',
          description: 'Tempo de ServiÃ§o/ContribuiÃ§Ã£o',
          properties: {
            totalContributionTime: {
              type: 'string',
              description:
                'Tempo total de contribuiÃ§Ã£o. Ex: 44 anos, 5 meses e 22 dias',
            },
            publicServiceContributionTime: {
              type: 'string',
              description: 'Tempo no serviÃ§o pÃºblico',
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
                'Ingresso no serviÃ§o pÃºblico (anterior/posterior a 16/12/1998 ou data)',
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
            'Resumo de Regras AplicÃ¡veis para Aposentadoria Urbana Comum (RPPS)',
        },
        finalAnalysis: {
          type: 'string',
          description: 'AnÃ¡lise final consolidada',
        },
        completeAnalysisReport: {
          type: 'string',
          description:
            'RelatÃ³rio completo da anÃ¡lise em Markdown, pronto para exportaÃ§Ã£o em PDF/DOCX. Deve conter todas as seÃ§Ãµes: Dados do cliente, Tempo de ServiÃ§o/ContribuiÃ§Ã£o, AnÃ¡lise de Regras de Aposentadoria, resumo e lista de regras (elegÃ­veis e nÃ£o elegÃ­veis), Linha do tempo integrada, AnÃ¡lise do tempo especial, AnÃ¡lise do tempo PCD, Resumo de Regras AplicÃ¡veis para Aposentadoria Urbana Comum (RPPS) e AnÃ¡lise final. Formate com tÃ­tulos (##), listas e tabelas em Markdown quando aplicÃ¡vel.',
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
