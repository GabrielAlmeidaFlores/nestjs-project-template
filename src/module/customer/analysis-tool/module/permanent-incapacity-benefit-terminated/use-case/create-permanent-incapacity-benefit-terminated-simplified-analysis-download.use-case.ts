import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-result/command/permanent-incapacity-benefit-terminated-result.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedResultEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/permanent-incapacity-benefit-terminated-result.entity';
import { PermanentIncapacityBenefitTerminatedResultId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/value-object/permanent-incapacity-benefit-terminated-result-id.value-object';
import { PermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-complete-analysis-download-not-found.error';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import { PermanentIncapacityBenefitTerminatedSimplifiedAnalysisNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-simplified-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreatePermanentIncapacityBenefitTerminatedSimplifiedAnalysisDownloadUseCase {
  protected readonly _type =
    CreatePermanentIncapacityBenefitTerminatedSimplifiedAnalysisDownloadUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedQueryRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedQueryRepositoryGateway: PermanentIncapacityBenefitTerminatedQueryRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedResultCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway,
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
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByPermanentIncapacityBenefitTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
      permanentIncapacityBenefitTerminatedId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      PermanentIncapacityBenefitTerminatedNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const analysisQueryResult =
      await this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
        permanentIncapacityBenefitTerminatedId,
        PermanentIncapacityBenefitTerminatedNotFoundError,
      );

    const permanentIncapacityBenefitTerminatedResult =
      analysisQueryResult.result;

    if (permanentIncapacityBenefitTerminatedResult === null) {
      throw new PermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadNotFoundError();
    }

    if (permanentIncapacityBenefitTerminatedResult.completeAnalysis === null) {
      throw new PermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadNotFoundError();
    }

    let responseAi =
      permanentIncapacityBenefitTerminatedResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getPermanentIncapacityBenefitTerminatedSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              permanentIncapacityBenefitTerminatedResult.completeAnalysis,
              'utf-8',
            ),
          ],
        );

      const updatedResultEntity =
        new PermanentIncapacityBenefitTerminatedResultEntity({
          ...permanentIncapacityBenefitTerminatedResult,
          id: new PermanentIncapacityBenefitTerminatedResultId(
            permanentIncapacityBenefitTerminatedResult.id,
          ),
          simplifiedAnalysis,
        });

      const updateResultTransaction =
        this.permanentIncapacityBenefitTerminatedResultCommandRepositoryGateway.updatePermanentIncapacityBenefitTerminatedResult(
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
      throw new PermanentIncapacityBenefitTerminatedSimplifiedAnalysisNotFoundError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_cessacao_aposentadoria_incapacidade_permanente',
    );
  }
}
