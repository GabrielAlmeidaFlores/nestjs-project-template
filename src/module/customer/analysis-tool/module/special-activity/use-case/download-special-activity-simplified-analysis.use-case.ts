import { Inject, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-result/command/special-activity-result.command.repository.gateway';
import { SpecialActivityResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/special-activity-result.entity';
import { SpecialActivityNotFoundError } from '@module/customer/analysis-tool/module/special-activity/error/special-activity-not-found.error';
import { SpecialActivityDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/special-activity/error/special-activity-does-not-contain-complete-analysis.error';
import { SpecialActivityDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/special-activity/error/special-activity-does-not-contain-simplified-analysis.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class DownloadSpecialActivitySimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadSpecialActivitySimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialActivityResultCommandRepositoryGateway)
    private readonly specialActivityResultCommandRepositoryGateway: SpecialActivityResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialActivityId: SpecialActivityId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
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
        PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialActivityNotFoundError,
      );

    const specialActivityQueryResult =
      analysisToolRecordQueryResult.specialActivity;

    if (specialActivityQueryResult === null) {
      throw new SpecialActivityNotFoundError();
    }

    if (!specialActivityQueryResult.specialActivityResult) {
      throw new SpecialActivityDoesNotContainCompleteAnalysisError();
    }

    if (
      specialActivityQueryResult.specialActivityResult
        .specialActivityCompleteAnalysis === null
    ) {
      throw new SpecialActivityDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      specialActivityQueryResult.specialActivityResult
        .specialActivitySimplifiedAnalysis;

    if (responseAi === null) {
      const specialActivitySimplifiedAnalysis =
        await this.analysisProcessorGateway.getSpecialActivitySimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              specialActivityQueryResult.specialActivityResult
                .specialActivityCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const specialActivityResult = new SpecialActivityResultEntity({
        ...specialActivityQueryResult.specialActivityResult,
        specialActivitySimplifiedAnalysis,
      });

      const specialActivityResultTransaction =
        this.specialActivityResultCommandRepositoryGateway.updateSpecialActivityResult(
          specialActivityQueryResult.specialActivityResult.id,
          specialActivityResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        specialActivityResultTransaction,
      ]);
      await transaction.commit();

      responseAi = specialActivitySimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new SpecialActivityDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_atividade_especial',
    );
  }
}
