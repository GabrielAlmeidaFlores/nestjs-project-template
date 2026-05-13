import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-result/command/retirement-permanent-disability-revision-result.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/retirement-permanent-disability-revision-result.entity';
import { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';
import { RetirementPermanentDisabilityRevisionDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-does-not-contain-simplified-analysis.error';
import { RetirementPermanentDisabilityRevisionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadRetirementPermanentDisabilityRevisionSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadRetirementPermanentDisabilityRevisionSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionQueryRepositoryGateway: RetirementPermanentDisabilityRevisionQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionResultCommandRepositoryGateway: RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway,
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
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPermanentDisabilityRevisionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      retirementPermanentDisabilityRevisionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RetirementPermanentDisabilityRevisionNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const analysisQueryResult =
      await this.retirementPermanentDisabilityRevisionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionNotFoundError,
      );

    const existingResult = analysisQueryResult.result;

    if (existingResult === null) {
      throw new RetirementPermanentDisabilityRevisionDoesNotContainSimplifiedAnalysisError();
    }

    if (
      existingResult.retirementPermanentDisabilityRevisionCompleteAnalysis ===
      null
    ) {
      throw new RetirementPermanentDisabilityRevisionDoesNotContainSimplifiedAnalysisError();
    }

    let simplifiedAnalysisJson =
      existingResult.retirementPermanentDisabilityRevisionSimplifiedAnalysis;

    if (simplifiedAnalysisJson === null) {
      const generated =
        await this.analysisProcessorGateway.getRetirementPermanentDisabilityRevisionSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              existingResult.retirementPermanentDisabilityRevisionCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const updatedResultEntity =
        new RetirementPermanentDisabilityRevisionResultEntity({
          id: new RetirementPermanentDisabilityRevisionResultId(
            existingResult.id.toString(),
          ),
          retirementPermanentDisabilityRevisionFirstAnalysis:
            existingResult.retirementPermanentDisabilityRevisionFirstAnalysis,
          retirementPermanentDisabilityRevisionCompleteAnalysis:
            existingResult.retirementPermanentDisabilityRevisionCompleteAnalysis,
          retirementPermanentDisabilityRevisionCompleteAnalysisDownload:
            existingResult.retirementPermanentDisabilityRevisionCompleteAnalysisDownload,
          retirementPermanentDisabilityRevisionSimplifiedAnalysis: generated,
        });

      const updateResultTransaction =
        this.retirementPermanentDisabilityRevisionResultCommandRepositoryGateway.updateRetirementPermanentDisabilityRevisionResult(
          updatedResultEntity.id,
          updatedResultEntity,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        updateResultTransaction,
      ]);

      await transaction.commit();

      simplifiedAnalysisJson = generated;
    }

    if (simplifiedAnalysisJson === null) {
      throw new RetirementPermanentDisabilityRevisionDoesNotContainSimplifiedAnalysisError();
    }

    const htmlContent = await this.exportDocumentGateway.convertMarkdownToHtml(
      simplifiedAnalysisJson,
    );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_simplificada_revisao_aposentadoria_invalidez_permanente',
    );
  }
}
