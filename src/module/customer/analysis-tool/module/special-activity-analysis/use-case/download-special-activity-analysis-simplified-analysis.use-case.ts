import { Inject, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/special-activity-result.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialActivityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-result/command/special-activity-analysis-result.command.repository.gateway';
import { SpecialActivityAnalysisDocumentsNotFoundError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-documents-not-found.errors';
import { SpecialActivityAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-does-not-contain-complete-analysis.error';
import { SpecialActivityAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-does-not-contain-simplified-analysis.error';
import { SpecialActivityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class DownloadSpecialActivityAnalysisSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadSpecialActivityAnalysisSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialActivityAnalysisResultCommandRepositoryGateway)
    private readonly specialActivityResultCommandRepositoryGateway: SpecialActivityAnalysisResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
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
        PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS_DOWNLOAD,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS_DOWNLOAD,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialActivityAnalysisNotFoundError,
      );

    const specialActivityQueryResult =
      analysisToolRecordQueryResult.specialActivity;

    if (specialActivityQueryResult === null) {
      throw new SpecialActivityAnalysisNotFoundError();
    }

    if (
      specialActivityQueryResult.specialActivityResult
        ?.specialActivityCompleteAnalysis === null ||
      !specialActivityQueryResult.specialActivityResult
    ) {
      if (specialActivityQueryResult.specialActivityDocuments.length === 0) {
        throw new SpecialActivityAnalysisDocumentsNotFoundError();
      }

      const promptCompleteAnalysisResponse =
        await this.getPaymentPlanPaidResourcePromptUseCase.execute(
          PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_COMPLETE_ANALYSIS,
        );

      const consumeCompleteAnalysisCreditTransaction =
        await this.consumeOrganizationCreditUseCase.execute(
          organizationSessionData.organizationId,
          PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_COMPLETE_ANALYSIS,
          organizationMember.id,
        );

      const clientDataBuffer = Buffer.from(
        JSON.stringify(
          analysisToolRecordQueryResult.analysisToolClient,
          null,
          2,
        ),
        'utf-8',
      );

      const documentBuffers = await Promise.all(
        specialActivityQueryResult.specialActivityDocuments.map(async (doc) => {
          const buffer = await this.fileProcessorGateway.getFileBuffer(
            doc.document,
          );
          return buffer;
        }),
      );

      const allBuffers = [clientDataBuffer, ...documentBuffers];

      const specialActivityCompleteAnalysisJson =
        await this.analysisProcessorGateway.getSpecialActivityCompleteAnalysis(
          promptCompleteAnalysisResponse.prompt,
          allBuffers,
        );

      let resultEntity: SpecialActivityResultEntity;
      let saveCompleteAnalysisTransaction;

      if (!specialActivityQueryResult.specialActivityResult) {
        resultEntity = new SpecialActivityResultEntity({
          specialActivityCompleteAnalysis: specialActivityCompleteAnalysisJson,
          specialActivitySimplifiedAnalysis: null,
          specialActivityCompleteAnalysisDownload: null,
          specialActivitySimplifiedAnalysisDownload: null,
        });

        saveCompleteAnalysisTransaction =
          this.specialActivityResultCommandRepositoryGateway.createSpecialActivityResult(
            resultEntity,
          );
      } else {
        resultEntity = new SpecialActivityResultEntity({
          ...specialActivityQueryResult.specialActivityResult,
          specialActivityCompleteAnalysis: specialActivityCompleteAnalysisJson,
        });

        saveCompleteAnalysisTransaction =
          this.specialActivityResultCommandRepositoryGateway.updateSpecialActivityResult(
            specialActivityQueryResult.specialActivityResult.id,
            resultEntity,
          );
      }

      const transactionCompleteAnalysis =
        await this.baseTransactionRepositoryGateway.execute([
          consumeCompleteAnalysisCreditTransaction,
          saveCompleteAnalysisTransaction,
        ]);
      await transactionCompleteAnalysis.commit();

      const updatedAnalysisToolRecordQueryResult =
        await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
          specialActivityId,
          organizationSessionData.organizationId,
          sessionData.authIdentityId,
          SpecialActivityAnalysisNotFoundError,
        );

      if (
        !updatedAnalysisToolRecordQueryResult.specialActivity
          ?.specialActivityResult
      ) {
        throw new SpecialActivityAnalysisDoesNotContainCompleteAnalysisError();
      }

      const currentResult =
        updatedAnalysisToolRecordQueryResult.specialActivity
          .specialActivityResult;

      if (currentResult.specialActivitySimplifiedAnalysis === null) {
        const promptSimplifiedAnalysisResponse =
          await this.getPaymentPlanPaidResourcePromptUseCase.execute(
            PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS,
          );

        const consumeSimplifiedAnalysisCreditTransaction =
          await this.consumeOrganizationCreditUseCase.execute(
            organizationSessionData.organizationId,
            PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS,
            organizationMember.id,
          );

        const specialActivitySimplifiedAnalysisJson =
          await this.analysisProcessorGateway.getSpecialActivitySimplifiedAnalysis(
            promptSimplifiedAnalysisResponse.prompt,
            [
              Buffer.from(
                currentResult.specialActivityCompleteAnalysis as string,
                'utf-8',
              ),
            ],
          );

        const simplifiedResultEntity = new SpecialActivityResultEntity({
          ...currentResult,
          specialActivitySimplifiedAnalysis:
            specialActivitySimplifiedAnalysisJson,
        });

        const saveSimplifiedAnalysisTransaction =
          this.specialActivityResultCommandRepositoryGateway.updateSpecialActivityResult(
            currentResult.id,
            simplifiedResultEntity,
          );

        const transactionSimplifiedAnalysis =
          await this.baseTransactionRepositoryGateway.execute([
            consumeSimplifiedAnalysisCreditTransaction,
            saveSimplifiedAnalysisTransaction,
          ]);
        await transactionSimplifiedAnalysis.commit();
      }

      const finalAnalysisToolRecordQueryResult =
        await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
          specialActivityId,
          organizationSessionData.organizationId,
          sessionData.authIdentityId,
          SpecialActivityAnalysisNotFoundError,
        );

      if (
        !finalAnalysisToolRecordQueryResult.specialActivity
          ?.specialActivityResult
      ) {
        throw new SpecialActivityAnalysisDoesNotContainSimplifiedAnalysisError();
      }

      const finalResult =
        finalAnalysisToolRecordQueryResult.specialActivity
          .specialActivityResult;

      const specialActivitySimplifiedAnalysisDownload =
        await this.analysisProcessorGateway.getSpecialActivitySimplifiedAnalysisDownload(
          promptResponse.prompt,
          [
            Buffer.from(
              finalResult.specialActivityCompleteAnalysis as string,
              'utf-8',
            ),
          ],
        );

      const downloadResultEntity = new SpecialActivityResultEntity({
        ...finalResult,
        specialActivitySimplifiedAnalysisDownload,
      });

      const specialActivityResultTransaction =
        this.specialActivityResultCommandRepositoryGateway.updateSpecialActivityResult(
          finalResult.id,
          downloadResultEntity,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        specialActivityResultTransaction,
      ]);
      await transaction.commit();

      const responseAi = specialActivitySimplifiedAnalysisDownload;

      if (responseAi === null) {
        throw new SpecialActivityAnalysisDoesNotContainSimplifiedAnalysisError();
      }

      return this.exportDocumentGateway.downloadFileAsStreamable(
        responseAi,
        format,
        'analise_simplificada_atividade_especial',
      );
    }
    const currentResult = specialActivityQueryResult.specialActivityResult;
    if (currentResult.specialActivityCompleteAnalysis === null) {
      throw new SpecialActivityAnalysisDoesNotContainCompleteAnalysisError();
    }

    if (currentResult.specialActivitySimplifiedAnalysis === null) {
      const promptSimplifiedAnalysisResponse =
        await this.getPaymentPlanPaidResourcePromptUseCase.execute(
          PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS,
        );

      const consumeSimplifiedAnalysisCreditTransaction =
        await this.consumeOrganizationCreditUseCase.execute(
          organizationSessionData.organizationId,
          PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS,
          organizationMember.id,
        );

      const specialActivitySimplifiedAnalysisJson =
        await this.analysisProcessorGateway.getSpecialActivitySimplifiedAnalysis(
          promptSimplifiedAnalysisResponse.prompt,
          [Buffer.from(currentResult.specialActivityCompleteAnalysis, 'utf-8')],
        );

      const simplifiedResultEntity = new SpecialActivityResultEntity({
        ...currentResult,
        specialActivitySimplifiedAnalysis:
          specialActivitySimplifiedAnalysisJson,
      });

      const saveSimplifiedAnalysisTransaction =
        this.specialActivityResultCommandRepositoryGateway.updateSpecialActivityResult(
          currentResult.id,
          simplifiedResultEntity,
        );

      const transactionSimplifiedAnalysis =
        await this.baseTransactionRepositoryGateway.execute([
          consumeSimplifiedAnalysisCreditTransaction,
          saveSimplifiedAnalysisTransaction,
        ]);
      await transactionSimplifiedAnalysis.commit();
    }

    const updatedAnalysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialActivityAnalysisNotFoundError,
      );

    if (
      !updatedAnalysisToolRecordQueryResult.specialActivity
        ?.specialActivityResult
    ) {
      throw new SpecialActivityAnalysisDoesNotContainSimplifiedAnalysisError();
    }

    const finalResult =
      updatedAnalysisToolRecordQueryResult.specialActivity
        .specialActivityResult;

    let responseAi = finalResult.specialActivitySimplifiedAnalysisDownload;

    if (responseAi === null) {
      const specialActivitySimplifiedAnalysisDownload =
        await this.analysisProcessorGateway.getSpecialActivitySimplifiedAnalysisDownload(
          promptResponse.prompt,
          [
            Buffer.from(
              finalResult.specialActivityCompleteAnalysis ?? '',
              'utf-8',
            ),
          ],
        );

      const specialActivityResult = new SpecialActivityResultEntity({
        ...finalResult,
        specialActivitySimplifiedAnalysisDownload,
      });

      const specialActivityResultTransaction =
        this.specialActivityResultCommandRepositoryGateway.updateSpecialActivityResult(
          finalResult.id,
          specialActivityResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        specialActivityResultTransaction,
      ]);
      await transaction.commit();

      responseAi = specialActivitySimplifiedAnalysisDownload;
    }

    if (responseAi === null) {
      throw new SpecialActivityAnalysisDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_atividade_especial',
    );
  }
}
