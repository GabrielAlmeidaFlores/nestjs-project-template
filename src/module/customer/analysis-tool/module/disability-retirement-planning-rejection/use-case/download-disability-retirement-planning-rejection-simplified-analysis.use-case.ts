import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { DisabilityRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/disability-retirement-planning-rejection.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-result/command/disability-retirement-planning-rejection-result.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';
import { DisabilityRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-complete-analysis-download-not-found.error';
import { DisabilityRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-not-found.error';
import { DisabilityRetirementPlanningRejectionSimplifiedAnalysisNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-simplified-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadDisabilityRetirementPlanningRejectionSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadDisabilityRetirementPlanningRejectionSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionQueryRepositoryGateway: DisabilityRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionResultCommandRepositoryGateway: DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway,
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
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      disabilityRetirementPlanningRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      DisabilityRetirementPlanningRejectionNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const analysisQueryResult =
      await this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
        disabilityRetirementPlanningRejectionId,
        DisabilityRetirementPlanningRejectionNotFoundError,
      );

    const disabilityRetirementPlanningRejectionResult =
      analysisQueryResult.disabilityRetirementPlanningRejectionResult;

    if (disabilityRetirementPlanningRejectionResult === null) {
      throw new DisabilityRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError();
    }

    if (disabilityRetirementPlanningRejectionResult.completeAnalysis === null) {
      throw new DisabilityRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError();
    }

    let responseAi =
      disabilityRetirementPlanningRejectionResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getDisabilityRetirementPlanningRejectionSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              disabilityRetirementPlanningRejectionResult.completeAnalysisDownload ??
                disabilityRetirementPlanningRejectionResult.completeAnalysis,
              'utf-8',
            ),
          ],
        );

      const updatedResultEntity =
        new DisabilityRetirementPlanningRejectionResultEntity({
          ...disabilityRetirementPlanningRejectionResult,
          simplifiedAnalysis,
        });

      const updateResultTransaction =
        this.disabilityRetirementPlanningRejectionResultCommandRepositoryGateway.updateDisabilityRetirementPlanningRejectionResult(
          disabilityRetirementPlanningRejectionResult.id,
          updatedResultEntity,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        updateResultTransaction,
      ]);
      await transaction.commit();

      responseAi = simplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new DisabilityRetirementPlanningRejectionSimplifiedAnalysisNotFoundError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_indeferimento_aposentadoria_pessoa_com_deficiencia',
    );
  }
}
