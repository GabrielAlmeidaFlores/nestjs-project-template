import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { AnalyzeGeneralUrbanRetirementDenialPppRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/analyze-general-urban-retirement-denial-ppp.request.dto';
import {
  AnalyzeGeneralUrbanRetirementDenialPppPeriodItemResponseDto,
  AnalyzeGeneralUrbanRetirementDenialPppResponseDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/analyze-general-urban-retirement-denial-ppp.response.dto';
import { InvalidGeneralUrbanRetirementDenialPppAnalysisJsonError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/invalid-general-urban-retirement-denial-ppp-analysis-json.error';
import { GeneralUrbanRetirementDenialPppAnalysisResultInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/interface/general-urban-retirement-denial-ppp-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeGeneralUrbanRetirementDenialPppUseCase {
  protected readonly _type = AnalyzeGeneralUrbanRetirementDenialPppUseCase.name;

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
    dto: AnalyzeGeneralUrbanRetirementDenialPppRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementDenialPppResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_PPP_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_PPP_ANALYSIS,
        organizationMember.id,
      );

    const fileBuffers = [dto.document.base64.decodeToBuffer()];

    const analysisResult =
      await this.analysisProcessorGateway.getGeneralUrbanRetirementDenialPppAnalysis(
        promptResponse.prompt,
        fileBuffers,
      );

    if (analysisResult === null) {
      throw new InvalidGeneralUrbanRetirementDenialPppAnalysisJsonError();
    }

    const parsedResult = this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeGeneralUrbanRetirementDenialPppResponseDto.build({
      periods: parsedResult.periods.map((period) =>
        AnalyzeGeneralUrbanRetirementDenialPppPeriodItemResponseDto.build({
          ...(this.hasValue(period.insuredName) && {
            insuredName: period.insuredName,
          }),
          ...(this.hasValue(period.companyName) && {
            companyName: period.companyName,
          }),
          ...(this.hasValue(period.position) && {
            position: period.position,
          }),
          ...(this.hasValue(period.bondOrigin) && {
            bondOrigin: period.bondOrigin,
          }),
          category: period.category,
          ...(this.hasValue(period.activityDescription) && {
            activityDescription: period.activityDescription,
          }),
          startDate: new Date(period.startDate),
          ...(this.hasValue(period.endDate) && {
            endDate: new Date(period.endDate),
          }),
          workType: period.workType,
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
          ...(this.hasValue(period.hazardousAgents) && {
            hazardousAgents: period.hazardousAgents,
          }),
          ...(this.hasValue(period.specialTimeViability) && {
            specialTimeViability: period.specialTimeViability,
          }),
          ...(this.hasValue(period.inssRecognition) && {
            inssRecognition: period.inssRecognition,
          }),
          ...(this.hasValue(period.judicialRecognition) && {
            judicialRecognition: period.judicialRecognition,
          }),
          ...(this.hasValue(period.technicalObservation) && {
            technicalObservation: period.technicalObservation,
          }),
        }),
      ),
    });
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  private parseAnalysisResult(
    analysisResult: string,
  ): GeneralUrbanRetirementDenialPppAnalysisResultInterface {
    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    return JSON.parse(
      cleanedJson,
    ) as GeneralUrbanRetirementDenialPppAnalysisResultInterface;
  }
}
