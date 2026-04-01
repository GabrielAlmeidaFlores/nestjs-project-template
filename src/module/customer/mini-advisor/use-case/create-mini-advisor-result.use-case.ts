import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { MiniAdvisorCommandRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor/command/mini-advisor.command.repository.gateway';
import { MiniAdvisorQueryRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor/query/mini-advisor.query.repository.gateway';
import { MiniAdvisorResultCommandRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/command/mini-advisor-result.command.repository.gateway';
import { MiniAdvisorEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/mini-advisor.entity';
import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { MiniAdvisorResultEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';
import { MiniAdvisorAnalysisTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/enum/mini-advisor-analysis-type.enum';
import { MiniAdvisorAnalysisPredefinedMessages } from '@module/customer/mini-advisor/models/mini-advisor-analysis-predefined-messages';
import { CreateMiniAdvisorResultResponseDto } from '@module/customer/mini-advisor/dto/response/create-mini-advisor-result.response.dto';
import { MiniAdvisorNotFoundError } from '@module/customer/mini-advisor/error/mini-advisor-not-found.error';
import { MiniAdvisorResultAlreadyExistsError } from '@module/customer/mini-advisor/error/mini-advisor-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { IMiniAdvisorAiResult } from '@module/customer/mini-advisor/models/mini-advisor-result-interface';



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

    const predefinedMessages = MiniAdvisorAnalysisPredefinedMessages.getByType(
      aiResult.chosenAnalysis,
    );

    const miniAdvisorResult = new MiniAdvisorResultEntity({
      miniAdvisorId,
      chosenAnalysis: aiResult.chosenAnalysis,
      benefitDescription: predefinedMessages.benefitDescription,
      attentionNote: predefinedMessages.attentionNote,
    });

    const miniAdvisor = new MiniAdvisorEntity({
      id: miniAdvisorId,
      createdAt: miniAdvisorQueryResult.createdAt,
      updatedAt: miniAdvisorQueryResult.updatedAt,
      createdBy: miniAdvisorQueryResult.createdById,
      updatedBy: organizationMember.id,
      clientSituation: miniAdvisorQueryResult.clientSituation,
      clientAge: miniAdvisorQueryResult.clientAge,
      clientGender: miniAdvisorQueryResult.clientGender,
      clientWorkHistory: miniAdvisorQueryResult.clientWorkHistory,
      hasContributedWithInss: miniAdvisorQueryResult.hasContributedWithInss,
      clientHasDisabilityOrLimitations:
        miniAdvisorQueryResult.clientHasDisabilityOrLimitations,
      miniAdvisorResult,
    });

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

  private parseAiResponse(raw: string | null): IMiniAdvisorAiResult {
    if (!raw) {
      return {
        chosenAnalysis:
          MiniAdvisorAnalysisTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT,
      };
    }

    try {
      const parsed = JSON.parse(raw) as Partial<IMiniAdvisorAiResult>;

      return {
        chosenAnalysis:
          parsed.chosenAnalysis ??
          MiniAdvisorAnalysisTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT,
      };
    } catch {
      return {
        chosenAnalysis:
          MiniAdvisorAnalysisTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT,
      };
    }
  }
}
