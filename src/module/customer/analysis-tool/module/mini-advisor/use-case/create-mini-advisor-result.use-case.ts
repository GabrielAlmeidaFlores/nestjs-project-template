import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { MiniAdvisorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/mini-advisor/domain/repository/mini-advisor/command/mini-advisor.command.repository.gateway';
import { MiniAdvisorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/mini-advisor/domain/repository/mini-advisor/query/mini-advisor.query.repository.gateway';
import { MiniAdvisorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/mini-advisor/domain/repository/mini-advisor-result/command/mini-advisor-result.command.repository.gateway';
import { MiniAdvisorEntity } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/mini-advisor.entity';
import { MiniAdvisorId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { MiniAdvisorResultEntity } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';
import { CreateMiniAdvisorResultResponseDto } from '@module/customer/analysis-tool/module/mini-advisor/dto/response/create-mini-advisor-result.response.dto';
import { MiniAdvisorNotFoundError } from '@module/customer/analysis-tool/module/mini-advisor/error/mini-advisor-not-found.error';
import { MiniAdvisorResultAlreadyExistsError } from '@module/customer/analysis-tool/module/mini-advisor/error/mini-advisor-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface MiniAdvisorAiResult {
  chosenAnalysis: AnalysisToolRecordTypeEnum;
  benefitDescription: string | null;
  attentionNote: string | null;
}

@Injectable()
export class CreateMiniAdvisorResultUseCase {
  protected readonly _type = CreateMiniAdvisorResultUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MiniAdvisorCommandRepositoryGateway)
    private readonly miniAdvisorCommandRepositoryGateway: MiniAdvisorCommandRepositoryGateway,
    @Inject(MiniAdvisorQueryRepositoryGateway)
    private readonly miniAdvisorQueryRepositoryGateway: MiniAdvisorQueryRepositoryGateway,
    @Inject(MiniAdvisorResultCommandRepositoryGateway)
    private readonly miniAdvisorResultCommandRepositoryGateway: MiniAdvisorResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    miniAdvisorId: MiniAdvisorId,
  ): Promise<CreateMiniAdvisorResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.MINI_ADVISOR_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MINI_ADVISOR_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMiniAdvisorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        miniAdvisorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MiniAdvisorNotFoundError,
      );

    const miniAdvisorQueryResult =
      await this.miniAdvisorQueryRepositoryGateway.findOneByIdOrFail(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        miniAdvisorId,
        MiniAdvisorNotFoundError,
      );

    if (miniAdvisorQueryResult.miniAdvisorResult) {
      throw new MiniAdvisorResultAlreadyExistsError();
    }

    const clientData = {
      data_analise: new Date().toISOString(),
      client: analysisToolRecordQueryResult.analysisToolClient,
      situacao_cliente: miniAdvisorQueryResult.clientSituation,
      idade_cliente: miniAdvisorQueryResult.clientAge,
      genero_cliente: miniAdvisorQueryResult.clientGender,
      historico_trabalho: miniAdvisorQueryResult.clientWorkHistory,
      contribuiu_inss: miniAdvisorQueryResult.hasContributedWithInss,
      tem_deficiencia_ou_limitacoes:
        miniAdvisorQueryResult.clientHasDisabilityOrLimitations,
    };

    const clientDataBuffer = Buffer.from(
      JSON.stringify(clientData, null, 2),
      'utf-8',
    );

    const aiResponseRaw =
      await this.analysisProcessorGateway.getMiniAdvisorCompleteAnalysis(
        promptResponse.prompt,
        [clientDataBuffer],
      );

    const aiResult = this.parseAiResponse(aiResponseRaw);

    const miniAdvisorResult = new MiniAdvisorResultEntity({
      miniAdvisorId,
      chosenAnalysis: aiResult.chosenAnalysis,
      benefitDescription: aiResult.benefitDescription,
      attentionNote: aiResult.attentionNote,
    });

    const miniAdvisor = new MiniAdvisorEntity({
      id: miniAdvisorId,
      createdAt: miniAdvisorQueryResult.createdAt,
      updatedAt: miniAdvisorQueryResult.updatedAt,
      analysisToolClientId: analysisToolRecordQueryResult.analysisToolClient.id,
      clientSituation: miniAdvisorQueryResult.clientSituation,
      clientAge: miniAdvisorQueryResult.clientAge,
      clientGender: miniAdvisorQueryResult.clientGender,
      clientWorkHistory: miniAdvisorQueryResult.clientWorkHistory,
      hasContributedWithInss: miniAdvisorQueryResult.hasContributedWithInss,
      clientHasDisabilityOrLimitations:
        miniAdvisorQueryResult.clientHasDisabilityOrLimitations,
      miniAdvisorResult,
    });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      miniAdvisor,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createMiniAdvisorResultTransaction =
      this.miniAdvisorResultCommandRepositoryGateway.createMiniAdvisorResult(
        miniAdvisorResult,
      );

    const updateMiniAdvisorTransaction =
      this.miniAdvisorCommandRepositoryGateway.updateMiniAdvisor(
        miniAdvisor.id,
        miniAdvisor,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      createMiniAdvisorResultTransaction,
      updateMiniAdvisorTransaction,
      updateAnalysisToolRecordTransaction,
    ]);

    await transaction.commit();

    return CreateMiniAdvisorResultResponseDto.build({
      miniAdvisorResultId: miniAdvisorResult.id,
      chosenAnalysis: miniAdvisorResult.chosenAnalysis,
      ...(miniAdvisorResult.benefitDescription !== null && {
        benefitDescription: miniAdvisorResult.benefitDescription,
      }),
      ...(miniAdvisorResult.attentionNote !== null && {
        attentionNote: miniAdvisorResult.attentionNote,
      }),
    });
  }

  private parseAiResponse(raw: string | null): MiniAdvisorAiResult {
    if (!raw) {
      return {
        chosenAnalysis: AnalysisToolRecordTypeEnum.INSURANCE_QUALITY_ANALYSIS,
        benefitDescription: null,
        attentionNote: null,
      };
    }

    try {
      const parsed = JSON.parse(raw) as Partial<MiniAdvisorAiResult>;

      return {
        chosenAnalysis:
          parsed.chosenAnalysis ??
          AnalysisToolRecordTypeEnum.INSURANCE_QUALITY_ANALYSIS,
        benefitDescription: parsed.benefitDescription ?? null,
        attentionNote: parsed.attentionNote ?? null,
      };
    } catch {
      return {
        chosenAnalysis: AnalysisToolRecordTypeEnum.INSURANCE_QUALITY_ANALYSIS,
        benefitDescription: raw,
        attentionNote: null,
      };
    }
  }
}
