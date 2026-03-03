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
import { GeneralUrbanRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/general-urban-retirement-grant.query.repository.gateway';
import { GeneralUrbanRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-result/command/general-urban-retirement-grant-result.command.repository.gateway';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';
import { CreateGeneralUrbanRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant-result.response.dto';
import { GeneralUrbanRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementGrantResultUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementGrantResultUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementGrantQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantQueryRepositoryGateway: GeneralUrbanRetirementGrantQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantResultCommandRepositoryGateway: GeneralUrbanRetirementGrantResultCommandRepositoryGateway,
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
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CreateGeneralUrbanRetirementGrantResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const generalUrbanRetirementGrant =
      await this.generalUrbanRetirementGrantQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantIdOrFailWithRelations(
        generalUrbanRetirementGrantId,
        GeneralUrbanRetirementGrantNotFoundError,
      );

    if (!generalUrbanRetirementGrant.generalUrbanRetirementGrantResult) {
      throw new GeneralUrbanRetirementGrantNotFoundError();
    }

    const analysisRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        GeneralUrbanRetirementGrantNotFoundError,
      );

    const cnisDocumentBuffer = await this.fileProcessorGateway.getFileBuffer(
      generalUrbanRetirementGrant.cnisDocument as unknown as string,
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

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_FINAL_RULES_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_FINAL_RULES_ANALYSIS,
        organizationMember.id,
      );

    const iaResponse =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          promptFiles: [],
          prompt: [
            JSON.stringify(
              generalUrbanRetirementGrant.generalUrbanRetirementGrantPeriod,
            ),
            jsonCnisAnalyzerResponse,
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
              },
              required: ['analiseCompletaJson', 'analiseCompletaMarkdown'],
            },
          }),
        }),
      )) as {
        analiseCompletaJson: unknown[];
        analiseCompletaMarkdown: string;
      } | null;

    const analiseCompletaJson = iaResponse?.analiseCompletaJson ?? [];
    const analiseCompletaMarkdown = iaResponse?.analiseCompletaMarkdown ?? '';
    const generalUrbanRetirementGrantCompleteAnalysis = JSON.stringify(
      analiseCompletaJson,
      null,
      2,
    );

    const generalUrbanRetirementGrantResult =
      new GeneralUrbanRetirementGrantResultEntity({
        ...generalUrbanRetirementGrant.generalUrbanRetirementGrantResult,
        generalUrbanRetirementGrantCompleteAnalysis,
        generalUrbanRetirementGrantCompleteAnalysisDownload:
          analiseCompletaMarkdown,
      });

    const generalUrbanRetirementGrantEntity =
      new GeneralUrbanRetirementGrantEntity({
        ...generalUrbanRetirementGrant,
        generalUrbanRetirementGrantResult,
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
      generalUrbanRetirementGrant: generalUrbanRetirementGrantEntity,
    });

    const updateAnalysisRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisRecord.id,
        analysisToolRecordUpdated,
      );

    const transaction =
      this.generalUrbanRetirementGrantResultCommandRepositoryGateway.updateGeneralUrbanRetirementGrantResult(
        generalUrbanRetirementGrant.generalUrbanRetirementGrantResult.id,
        generalUrbanRetirementGrantResult,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      transaction,
      consumeCreditTransaction,
      updateAnalysisRecordTransaction,
    ]);

    await transactions.commit();

    return CreateGeneralUrbanRetirementGrantResultResponseDto.build({
      response: generalUrbanRetirementGrantCompleteAnalysis,
    });
  }
}
