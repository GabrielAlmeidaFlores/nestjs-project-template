import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-timeline-classification.enum';
import { AnalyzeTeacherRetirementPlanningRejectionPppRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/analyze-teacher-retirement-planning-rejection-ppp.request.dto';
import {
  AnalyzeTeacherRetirementPlanningRejectionPppPeriodItemResponseDto,
  AnalyzeTeacherRetirementPlanningRejectionPppResponseDto,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/analyze-teacher-retirement-planning-rejection-ppp.response.dto';
import { InvalidTeacherRetirementPlanningRejectionPppAnalysisJsonError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/invalid-teacher-retirement-planning-rejection-ppp-analysis-json.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { TeacherRetirementPlanningRejectionPppAnalysisResultInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/interface/teacher-retirement-planning-rejection-ppp-analysis-result.interface';

@Injectable()
export class AnalyzeTeacherRetirementPlanningRejectionPppUseCase {
  protected readonly _type =
    AnalyzeTeacherRetirementPlanningRejectionPppUseCase.name;

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
    dto: AnalyzeTeacherRetirementPlanningRejectionPppRequestDto,
  ): Promise<AnalyzeTeacherRetirementPlanningRejectionPppResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_PPP_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_PPP_ANALYSIS,
        organizationMember.id,
      );

    const fileBuffers = [dto.document.base64.decodeToBuffer()];

    const analysisResult =
      await this.analysisProcessorGateway.getTeacherRetirementPlanningRejectionPppAnalysis(
        promptResponse.prompt,
        fileBuffers,
      );

    if (analysisResult === null) {
      throw new InvalidTeacherRetirementPlanningRejectionPppAnalysisJsonError();
    }

    const parsedResult = this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeTeacherRetirementPlanningRejectionPppResponseDto.build({
      periods: parsedResult.periods.map((period) =>
        AnalyzeTeacherRetirementPlanningRejectionPppPeriodItemResponseDto.build(
          {
            ...(this.hasValue(period.bondOrigin) && {
              bondOrigin: period.bondOrigin,
            }),
            ...(this.hasValue(period.category) && {
              category: period.category,
            }),
            ...(this.hasValue(period.activityDescription) && {
              activityDescription: period.activityDescription,
            }),
            startDate: new Date(period.startDate),
            ...(this.hasValue(period.endDate) && {
              endDate: new Date(period.endDate),
            }),
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
              pendencyReason: period.pendencyReason,
            }),
            ...(this.hasValue(period.periodConsideration) && {
              periodConsideration: period.periodConsideration,
            }),
            ...(this.hasValue(period.wantsToComplementViaMeuINSS) && {
              wantsToComplementViaMeuINSS: period.wantsToComplementViaMeuINSS,
            }),
            status: period.status,
            ...(this.hasValue(period.hasSpecialPeriod) && {
              hasSpecialPeriod: period.hasSpecialPeriod,
            }),
            ...(this.hasValue(period.timelineClassification) && {
              timelineClassification:
                TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum[
                  period.timelineClassification as keyof typeof TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum
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
  ): TeacherRetirementPlanningRejectionPppAnalysisResultInterface {
    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    return JSON.parse(
      cleanedJson,
    ) as TeacherRetirementPlanningRejectionPppAnalysisResultInterface;
  }
}
