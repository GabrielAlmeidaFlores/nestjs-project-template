import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { MarkdownConverterGateway } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { AnalyzeSpecialCategoryRetirementAdministrativeProcedureRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/analyze-special-category-retirement-administrative-procedure.request.dto';
import { AnalyzeSpecialCategoryRetirementAdministrativeProcedureResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/analyze-special-category-retirement-administrative-procedure.response.dto';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeSpecialCategoryRetirementAdministrativeProcedureUseCase {
  protected readonly _type =
    AnalyzeSpecialCategoryRetirementAdministrativeProcedureUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(MarkdownConverterGateway)
    private readonly markdownConverterGateway: MarkdownConverterGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: AnalyzeSpecialCategoryRetirementAdministrativeProcedureRequestDto,
  ): Promise<AnalyzeSpecialCategoryRetirementAdministrativeProcedureResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS,
      );

    await this.consumeOrganizationCreditUseCase.execute(
      organizationSessionData.organizationId,
      PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS,
      organizationMember.id,
    );

    const files: Buffer[] = dto.files.map((f) => f.buffer);

    const markdownResult =
      await this.analysisProcessorGateway.getSpecialCategoryRetirementAdministrativeProcedureAnalysis(
        promptResponse.prompt,
        files,
      );

    const htmlResult = await this.markdownConverterGateway.convertToHtml(
      markdownResult ?? '',
    );

    return AnalyzeSpecialCategoryRetirementAdministrativeProcedureResponseDto.build(
      {
        result: htmlResult,
      },
    );
  }
}
