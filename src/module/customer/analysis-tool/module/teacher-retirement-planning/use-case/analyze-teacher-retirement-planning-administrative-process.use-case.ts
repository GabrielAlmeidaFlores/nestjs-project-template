import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { AnalyzeTeacherRetirementPlanningAdministrativeProcessRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/analyze-teacher-retirement-planning-administrative-process.request.dto';
import { AnalyzeTeacherRetirementPlanningAdministrativeProcessResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/analyze-teacher-retirement-planning-administrative-process.response.dto';
import { FailedToGenerateTeacherRetirementPlanningAnalysisError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/failed-to-generate-teacher-retirement-planning-analysis.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeTeacherRetirementPlanningAdministrativeProcessUseCase {
  protected readonly _type =
    AnalyzeTeacherRetirementPlanningAdministrativeProcessUseCase.name;

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
    dto: AnalyzeTeacherRetirementPlanningAdministrativeProcessRequestDto,
  ): Promise<AnalyzeTeacherRetirementPlanningAdministrativeProcessResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS,
        organizationMember.id,
      );

    const fileBuffers: Buffer[] = [];

    dto.administrativeDocuments.forEach((fileBuffer) => {
      fileBuffers.push(fileBuffer.buffer);
    });

    const result =
      await this.analysisProcessorGateway.getTeacherRetirementPlanningAdministrativeProcessAnalysis(
        promptResponse.prompt,
        fileBuffers,
      );

    if (result === null) {
      throw new FailedToGenerateTeacherRetirementPlanningAnalysisError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeTeacherRetirementPlanningAdministrativeProcessResponseDto.build(
      { result },
    );
  }
}
