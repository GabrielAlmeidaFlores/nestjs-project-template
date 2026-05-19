import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { DisabilityRetirementPlanningRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-category.enum';
import { DisabilityRetirementPlanningRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-consideration.enum';
import { DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pcd-status.enum';
import { DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pendency-reason.enum';
import { DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-work-type.enum';
import { AnalyzeDisabilityRetirementPlanningRejectionPppRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/analyze-disability-retirement-planning-rejection-ppp.request.dto';
import {
  AnalyzeDisabilityRetirementPlanningRejectionPppPeriodItemResponseDto,
  AnalyzeDisabilityRetirementPlanningRejectionPppResponseDto,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/analyze-disability-retirement-planning-rejection-ppp.response.dto';
import { InvalidDisabilityRetirementPlanningRejectionPppAnalysisJsonError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/invalid-disability-retirement-planning-rejection-ppp-analysis-json.error';
import { DisabilityRetirementPlanningRejectionPppAnalysisResultInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/model/interface/disability-retirement-planning-rejection-ppp-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeDisabilityRetirementPlanningRejectionPppUseCase {
  protected readonly _type =
    AnalyzeDisabilityRetirementPlanningRejectionPppUseCase.name;

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
    dto: AnalyzeDisabilityRetirementPlanningRejectionPppRequestDto,
  ): Promise<AnalyzeDisabilityRetirementPlanningRejectionPppResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_PPP_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_PPP_ANALYSIS,
        organizationMember.id,
      );

    const fileBuffers = [dto.document.base64.decodeToBuffer()];

    const analysisResult =
      await this.analysisProcessorGateway.getDisabilityRetirementPlanningRejectionPppAnalysis(
        promptResponse.prompt,
        fileBuffers,
      );

    if (analysisResult === null) {
      throw new InvalidDisabilityRetirementPlanningRejectionPppAnalysisJsonError();
    }

    const parsedResult = this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeDisabilityRetirementPlanningRejectionPppResponseDto.build({
      periods: parsedResult.periods.map((period) =>
        AnalyzeDisabilityRetirementPlanningRejectionPppPeriodItemResponseDto.build(
          {
            ...(this.hasValue(period.bondOrigin) && {
              bondOrigin: period.bondOrigin,
            }),
            category:
              DisabilityRetirementPlanningRejectionPeriodCategoryEnum[
                period.category as keyof typeof DisabilityRetirementPlanningRejectionPeriodCategoryEnum
              ],
            ...(this.hasValue(period.activityDescription) && {
              activityDescription: period.activityDescription,
            }),
            startDate: new Date(period.startDate),
            ...(this.hasValue(period.endDate) && {
              endDate: new Date(period.endDate),
            }),
            workType:
              DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum[
                period.workType as keyof typeof DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum
              ],
            ...(this.hasValue(period.impactMonths) && {
              impactMonths: period.impactMonths,
            }),
            ...(this.hasValue(period.graceMonths) && {
              graceMonths: period.graceMonths,
            }),
            isPendency: period.isPendency,
            competenceBelowTheMinimum: period.competenceBelowTheMinimum,
            ...(this.hasValue(period.contributionAverage) && {
              contributionAverage: new DecimalValue(period.contributionAverage),
            }),
            ...(this.hasValue(period.pendencyReason) && {
              pendencyReason:
                DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum[
                  period.pendencyReason as keyof typeof DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum
                ],
            }),
            ...(this.hasValue(period.periodConsideration) && {
              periodConsideration:
                DisabilityRetirementPlanningRejectionPeriodConsiderationEnum[
                  period.periodConsideration as keyof typeof DisabilityRetirementPlanningRejectionPeriodConsiderationEnum
                ],
            }),
            ...(this.hasValue(period.wantsToComplementViaMeuINSS) && {
              wantsToComplementViaMeuINSS: period.wantsToComplementViaMeuINSS,
            }),
            status: period.status,
            ...(this.hasValue(period.pcdStatus) && {
              pcdStatus:
                DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum[
                  period.pcdStatus as keyof typeof DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum
                ],
            }),
          },
        ),
      ),
    });
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  private parseAnalysisResult(
    analysisResult: string,
  ): DisabilityRetirementPlanningRejectionPppAnalysisResultInterface {
    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    return JSON.parse(
      cleanedJson,
    ) as DisabilityRetirementPlanningRejectionPppAnalysisResultInterface;
  }
}
