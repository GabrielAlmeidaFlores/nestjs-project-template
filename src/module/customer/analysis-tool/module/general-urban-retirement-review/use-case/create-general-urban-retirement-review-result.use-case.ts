import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/query/general-urban-retirement-review-analysis-result.query.repository.gateway';
import { GetGeneralUrbanRetirementReviewAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/query/result/get-general-urban-retirement-review-analysis-result.query.result';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { CreateGeneralUrbanRetirementReviewResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-result.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

type ParsedIaResponseType = {
  analiseCompletaJson?: unknown;
  analiseCompletaMarkdown?: unknown;
};

@Injectable()
export class CreateGeneralUrbanRetirementReviewResultUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementReviewResultUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewAnalysisResultQueryRepositoryGateway: GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewResultCommandRepositoryGateway: GeneralUrbanRetirementReviewResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalysisGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CreateGeneralUrbanRetirementReviewResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const generalUrbanRetirementReview =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
        generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    if (!generalUrbanRetirementReview.generalUrbanRetirementReviewResult) {
      throw new GeneralUrbanRetirementReviewNotFoundError();
    }

    const analysisRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementReviewIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementReviewId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const cnisDocumentBuffer = await this.fileProcessorGateway.getFileBuffer(
      generalUrbanRetirementReview.cnisDocument as unknown as string,
    );
    const cnisDocumentData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisDocumentBuffer);

    const cnisAnalyzerResponse =
      await this.cnisAnalysisGateway.analyzeCnisDocument(
        cnisDocumentData,
        new AnalysisToolClientEntity({
          ...analysisRecord.analysisToolClient,
          createdBy: analysisRecord.analysisToolClient.createdBy.id,
          updatedBy: analysisRecord.analysisToolClient.updatedBy.id,
        }),
      );

    const jsonCnisAnalyzerResponse = JSON.stringify(
      cnisAnalyzerResponse,
      null,
      2,
    );
    const analysisResultQueryRepository = this
      .generalUrbanRetirementReviewAnalysisResultQueryRepositoryGateway as {
      findManyByGeneralUrbanRetirementReviewId: (
        generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
      ) => Promise<GetGeneralUrbanRetirementReviewAnalysisResultQueryResult[]>;
    };

    const analysisResults =
      await analysisResultQueryRepository.findManyByGeneralUrbanRetirementReviewId(
        generalUrbanRetirementReviewId,
      );
    const jsonAcceleratorAnalysisResults = JSON.stringify(
      analysisResults.map((analysisResult) => ({
        analysisType: analysisResult.analysisType,
        response: analysisResult.response,
      })),
      null,
      2,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const iaResponse =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          promptFiles: [],
          prompt: [
            `PERIODOS_GERAL_URBAN_RETIREMENT_REVIEW:\n${JSON.stringify(
              generalUrbanRetirementReview.generalUrbanRetirementReviewPeriod,
            )}`,
            `CNIS_ANALYZER_RESPONSE:\n${jsonCnisAnalyzerResponse}`,
            `ACELERADORES_ANALISADOS:\n${jsonAcceleratorAnalysisResults}`,
          ].join('\n\n'),
          responseConfig: ResponseConfigInputModel.build({
            jsonSchema: {
              type: 'object',
              properties: {
                analiseCompletaJson: {
                  type: 'array',
                  description:
                    'Array com as regras de aposentadoria analisadas em formato JSON.',
                  items: {
                    type: 'object',
                    properties: {
                      regraDeAposentadoria: {
                        type: 'string',
                        description:
                          'Aposentadoria por tempo de contribuição, aposentadoria por idade, etc.',
                        enum: [
                          'APOSENTADORIA_TEMPO_CONTRIBUICAO_DIREITO_ADQUIRIDO_EC103',
                          'APOSENTADORIA_IDADE_URBANA_DIREITO_ADQUIRIDO_EC103',
                          'APOSENTADORIA_TEMPO_CONTRIBUICAO_TRANSICAO_ART15_EC103',
                          'APOSENTADORIA_TEMPO_CONTRIBUICAO_TRANSICAO_ART16_EC103',
                          'APOSENTADORIA_TEMPO_CONTRIBUICAO_TRANSICAO_ART17_EC103',
                          'APOSENTADORIA_TEMPO_CONTRIBUICAO_TRANSICAO_ART20_EC103',
                          'APOSENTADORIA_IDADE_HIBRIDA_DIREITO_ADQUIRIDO_EC103',
                          'APOSENTADORIA_IDADE_URBANA_TRANSICAO_ART18_EC103',
                          'APOSENTADORIA_IDADE_HIBRIDA_TRANSICAO_ART18_EC103',
                          'APOSENTADORIA_PROGRAMADA_COMUM_ART19_EC103',
                          'APOSENTADORIA_PROGRAMADA_PROFESSOR_ART19_II_EC103',
                          'APOSENTADORIA_PROGRAMADA_PROFESSOR_DIREITO_ADQUIRIDO_EC103',
                          'APOSENTADORIA_PROGRAMADA_ESPECIAL_ART19_I_EC103',
                          'APOSENTADORIA_PROGRAMADA_ESPECIAL_TRANSICAO_ART21_EC103',
                          'APOSENTADORIA_PROGRAMADA_ESPECIAL_DIREITO_ADQUIRIDO_EC103',
                        ],
                      },
                      resultado: {
                        type: 'string',
                        enum: ['Atingido', 'Aguardando'],
                        description:
                          'Indica se o cliente já atingiu os requisitos para essa aposentadoria ou se ainda está aguardando.',
                      },
                      dataDoDireito: {
                        type: 'string',
                        description:
                          'Data em que o cliente atingiu ou atingirá os requisitos para essa aposentadoria, formatada como "DD de mês de AAAA".',
                      },
                      rmiPrevista: {
                        type: 'string',
                        description:
                          'Valor da Renda Mensal Inicial (RMI) prevista para essa aposentadoria, formatada como moeda brasileira (R$ X.XXX,XX).',
                      },
                      melhorRmi: {
                        type: 'boolean',
                        description:
                          'Indica se essa aposentadoria oferece a melhor RMI entre todas as opções disponíveis.',
                      },
                      maiorValorCausa: {
                        type: 'boolean',
                        description:
                          'Indica se essa aposentadoria oferece o maior valor de causa entre todas as opções disponíveis.',
                      },
                      detalhes: {
                        type: 'string',
                        description:
                          'Detalhes adicionais relevantes sobre essa aposentadoria, como vantagens, desvantagens, tempo de espera, etc.',
                      },
                    },
                    required: [
                      'regraDeAposentadoria',
                      'resultado',
                      'dataDoDireito',
                      'rmiPrevista',
                      'melhorRmi',
                      'maiorValorCausa',
                      'detalhes',
                    ],
                  },
                },
                analiseCompletaMarkdown: {
                  type: 'string',
                  description:
                    'Versão em markdown da análise completa das regras de aposentadoria, formatada para leitura e download.',
                },
                recomendacaoDoSistema: {
                  type: 'object',
                  description:
                    'Resumo estruturado da seção "Recomendação do Sistema", contendo as opções comparativas principais.',
                  properties: {
                    opcaoMaiorRmi: {
                      type: 'object',
                      properties: {
                        regra: {
                          type: 'string',
                        },
                        dib: {
                          type: 'string',
                          description: 'Data formatada como DD/MM/AAAA.',
                        },
                        rmi: {
                          type: 'string',
                          description: 'Valor formatado como moeda brasileira.',
                        },
                        valorDaCausa: {
                          type: 'string',
                          description: 'Valor formatado como moeda brasileira.',
                        },
                      },
                      required: ['regra', 'dib', 'rmi', 'valorDaCausa'],
                    },
                    opcaoMaiorValorDaCausa: {
                      type: 'object',
                      properties: {
                        regra: {
                          type: 'string',
                        },
                        dib: {
                          type: 'string',
                          description: 'Data formatada como DD/MM/AAAA.',
                        },
                        rmi: {
                          type: 'string',
                          description: 'Valor formatado como moeda brasileira.',
                        },
                        valorDaCausa: {
                          type: 'string',
                          description: 'Valor formatado como moeda brasileira.',
                        },
                      },
                      required: ['regra', 'dib', 'rmi', 'valorDaCausa'],
                    },
                    estrategiaRecomendada: {
                      type: 'string',
                    },
                    regraRecomendada: {
                      type: 'string',
                    },
                    fundamentacao: {
                      type: 'string',
                    },
                  },
                  required: [
                    'opcaoMaiorRmi',
                    'opcaoMaiorValorDaCausa',
                    'estrategiaRecomendada',
                    'regraRecomendada',
                    'fundamentacao',
                  ],
                },
                resultadosDaAnalise: {
                  type: 'string',
                  description:
                    'Texto corrido técnico da seção "Resultados da Análise", sem conteúdo genérico.',
                },
              },
              required: [
                'analiseCompletaJson',
                'analiseCompletaMarkdown',
                'recomendacaoDoSistema',
                'resultadosDaAnalise',
              ],
            },
          }),
        }),
      )) as unknown;

    const normalizedIaResponse = this.parseIaResponse(iaResponse);

    const analiseCompletaJson = Array.isArray(
      normalizedIaResponse?.analiseCompletaJson,
    )
      ? normalizedIaResponse.analiseCompletaJson
      : [];
    const analiseCompletaMarkdown =
      typeof normalizedIaResponse?.analiseCompletaMarkdown === 'string'
        ? normalizedIaResponse.analiseCompletaMarkdown
        : '';
    const generalUrbanRetirementReviewCompleteAnalysis = JSON.stringify(
      analiseCompletaJson,
      null,
      2,
    );

    const generalUrbanRetirementReviewResult =
      new GeneralUrbanRetirementReviewResultEntity({
        ...generalUrbanRetirementReview.generalUrbanRetirementReviewResult,
        generalUrbanRetirementReviewCompleteAnalysis,
        generalUrbanRetirementReviewCompleteAnalysisDownload:
          analiseCompletaMarkdown,
      });

    const generalUrbanRetirementReviewEntity =
      new GeneralUrbanRetirementReviewEntity({
        ...generalUrbanRetirementReview,
        generalUrbanRetirementReviewResult,
      });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisRecord.analysisToolClient,
      createdBy: analysisRecord.createdBy.id,
      updatedBy: analysisRecord.updatedBy.id,
    });

    const analysisToolRecordUpdated = new AnalysisToolRecordEntity({
      id: analysisRecord.id,
      code: analysisRecord.code,
      type: analysisRecord.type,
      cnisFastAnalysis: null,
      analysisToolClient,
      retirementPlanningRpps: null,
      status: AnalysisStatusEnum.COMPLETED,
      createdBy: analysisRecord.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      audienceQuestionGenerator: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
      insuranceQualityAnalysis: null,
      generalUrbanRetirementReview: generalUrbanRetirementReviewEntity,
    });

    const updateAnalysisRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisRecord.id,
        analysisToolRecordUpdated,
      );

    const transaction =
      this.generalUrbanRetirementReviewResultCommandRepositoryGateway.updateGeneralUrbanRetirementReviewResult(
        generalUrbanRetirementReview.generalUrbanRetirementReviewResult.id,
        generalUrbanRetirementReviewResult,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      transaction,
      consumeCreditTransaction,
      updateAnalysisRecordTransaction,
    ]);

    await transactions.commit();

    return CreateGeneralUrbanRetirementReviewResultResponseDto.build({
      response: generalUrbanRetirementReviewCompleteAnalysis,
    });
  }

  private parseIaResponse(response: unknown): ParsedIaResponseType | null {
    if (response === null) {
      return null;
    }

    if (typeof response === 'string') {
      try {
        const parsed = JSON.parse(response) as unknown;
        return typeof parsed === 'object' && parsed !== null
          ? (parsed as ParsedIaResponseType)
          : null;
      } catch {
        return null;
      }
    }

    return typeof response === 'object'
      ? (response as ParsedIaResponseType)
      : null;
  }
}
