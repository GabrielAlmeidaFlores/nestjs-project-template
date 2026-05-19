import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { SpecialActivityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-result/command/special-activity-analysis-result.command.repository.gateway';
import { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityResultEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-result/special-activity-result.entity';
import { SpecialActivityAnalysisDocumentsNotFoundError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-documents-not-found.errors';
import { SpecialActivityAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-does-not-contain-complete-analysis.error';
import { SpecialActivityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadSpecialActivityAnalysisCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadSpecialActivityAnalysisCompleteAnalysisUseCase.name;

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
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
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

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_COMPLETE_ANALYSIS,
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

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

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

      const responseAi =
        currentResult.specialActivityCompleteAnalysisDownload ??
        this.extractDownloadContentFromCompleteAnalysis(
          currentResult.specialActivityCompleteAnalysis as string,
        );

      if (responseAi === null) {
        throw new SpecialActivityAnalysisDoesNotContainCompleteAnalysisError();
      }

      if (currentResult.specialActivityCompleteAnalysisDownload === null) {
        const specialActivityCompleteAnalysisDownload = responseAi;

        const specialActivityResult = new SpecialActivityResultEntity({
          ...currentResult,
          specialActivityCompleteAnalysisDownload,
        });

        const specialActivityResultTransaction =
          this.specialActivityResultCommandRepositoryGateway.updateSpecialActivityResult(
            currentResult.id,
            specialActivityResult,
          );

        const transaction = await this.baseTransactionRepositoryGateway.execute(
          [consumeCreditTransaction, specialActivityResultTransaction],
        );
        await transaction.commit();
      }

      return this.exportDocumentGateway.downloadFileAsStreamable(
        responseAi,
        format,
        'analise_completa_atividade_especial',
        exportOptions,
      );
    }

    const currentResult = specialActivityQueryResult.specialActivityResult;
    if (currentResult.specialActivityCompleteAnalysis === null) {
      throw new SpecialActivityAnalysisDoesNotContainCompleteAnalysisError();
    }

    const responseAi =
      currentResult.specialActivityCompleteAnalysisDownload ??
      this.extractDownloadContentFromCompleteAnalysis(
        currentResult.specialActivityCompleteAnalysis,
      );

    if (responseAi === null) {
      throw new SpecialActivityAnalysisDoesNotContainCompleteAnalysisError();
    }

    if (currentResult.specialActivityCompleteAnalysisDownload === null) {
      const specialActivityCompleteAnalysisDownload = responseAi;

      const specialActivityResult = new SpecialActivityResultEntity({
        ...currentResult,
        specialActivityCompleteAnalysisDownload,
      });

      const specialActivityResultTransaction =
        this.specialActivityResultCommandRepositoryGateway.updateSpecialActivityResult(
          currentResult.id,
          specialActivityResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        specialActivityResultTransaction,
      ]);
      await transaction.commit();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_completa_atividade_especial',
      exportOptions,
    );
  }

  private extractDownloadContentFromCompleteAnalysis(
    specialActivityCompleteAnalysis: string,
  ): string | null {
    const trimmedAnalysis = specialActivityCompleteAnalysis.trim();

    if (trimmedAnalysis.length === 0) {
      return null;
    }

    try {
      const parsedAnalysis = JSON.parse(trimmedAnalysis) as Record<
        string,
        unknown
      >;
      const analysisResult = parsedAnalysis['analysisResult'];

      return typeof analysisResult === 'string' &&
        analysisResult.trim().length > 0
        ? analysisResult
        : null;
    } catch {
      return trimmedAnalysis;
    }
  }
}
