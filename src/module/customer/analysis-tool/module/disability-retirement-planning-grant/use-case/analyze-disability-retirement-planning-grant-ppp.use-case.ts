import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { AnalyzeDisabilityRetirementPlanningGrantPppRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/analyze-disability-retirement-planning-grant-ppp.request.dto';
import {
  AnalyzeDisabilityRetirementPlanningGrantPppPeriodItemResponseDto,
  AnalyzeDisabilityRetirementPlanningGrantPppResponseDto,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/analyze-disability-retirement-planning-grant-ppp.response.dto';
import { InvalidDisabilityRetirementPlanningGrantPppAnalysisJsonError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/invalid-disability-retirement-planning-grant-ppp-analysis-json.error';
import { DisabilityRetirementPlanningGrantPppAnalysisResultInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/disability-retirement-planning-grant-ppp-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeDisabilityRetirementPlanningGrantPppUseCase {
  protected readonly _type =
    AnalyzeDisabilityRetirementPlanningGrantPppUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: AnalyzeDisabilityRetirementPlanningGrantPppRequestDto,
  ): Promise<AnalyzeDisabilityRetirementPlanningGrantPppResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS,
        organizationMember.id,
      );

    const fileBuffers = [dto.document.base64.decodeToBuffer()];

    const analysisResult =
      await this.analysisProcessorGateway.getDisabilityRetirementPlanningGrantPppAnalysis(
        promptResponse.prompt,
        fileBuffers,
      );

    if (analysisResult === null) {
      throw new InvalidDisabilityRetirementPlanningGrantPppAnalysisJsonError();
    }

    const parsedResult = this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeDisabilityRetirementPlanningGrantPppResponseDto.build({
      periods: parsedResult.periods.map((period) =>
        AnalyzeDisabilityRetirementPlanningGrantPppPeriodItemResponseDto.build({
          startDate: new Date(period.startDate),
          ...(period.endDate !== null && { endDate: new Date(period.endDate) }),
          category: period.category,
          isPendency: period.isPendency,
          competenceBelowTheMinimum: period.competenceBelowTheMinimum,
          ...(period.pendencyReason !== null && {
            pendencyReason: period.pendencyReason,
          }),
          ...(period.typeOfContribution !== null && {
            typeOfContribution: period.typeOfContribution,
          }),
          status: period.status,
          ...(period.contributionAverage !== null && {
            contributionAverage: period.contributionAverage,
          }),
          ...(period.disabilityStatus !== null && {
            disabilityStatus: period.disabilityStatus,
          }),
          ...(period.periodConsideration !== null && {
            periodConsideration: period.periodConsideration,
          }),
          ...(period.bondOrigin !== null && { bondOrigin: period.bondOrigin }),
        }),
      ),
    });
  }

  private parseAnalysisResult(
    analysisResult: string,
  ): DisabilityRetirementPlanningGrantPppAnalysisResultInterface {
    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    return JSON.parse(
      cleanedJson,
    ) as DisabilityRetirementPlanningGrantPppAnalysisResultInterface;
  }
}
