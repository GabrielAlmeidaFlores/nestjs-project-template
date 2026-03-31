import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { DocumentGeneratorProcessorGateway } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.gateway';
import { FullOpinionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/command/full-opinion-generator.command.repository.gateway';
import { FullOpinionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/query/full-opinion-generator.query.repository.gateway';
import { FullOpinionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/full-opinion-generator.entity';
import { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';
import { FullOpinionGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/full-opinion/error/full-opinion-generator-does-not-contain-complete-analysis.error';
import { FullOpinionGeneratorDoesNotContainSimplifiedAnalysisError } from '@module/customer/documents-to-be-generated/module/full-opinion/error/full-opinion-generator-does-not-contain-simplified-analysis.error';
import { FullOpinionGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/full-opinion/error/full-opinion-generator-not-found.error';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class DownloadFullOpinionGeneratorSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadFullOpinionGeneratorSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(FullOpinionGeneratorQueryRepositoryGateway)
    private readonly fullOpinionGeneratorQueryRepositoryGateway: FullOpinionGeneratorQueryRepositoryGateway,
    @Inject(FullOpinionGeneratorCommandRepositoryGateway)
    private readonly fullOpinionGeneratorCommandRepositoryGateway: FullOpinionGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(DocumentGeneratorProcessorGateway)
    private readonly documentGeneratorProcessorGateway: DocumentGeneratorProcessorGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    fullOpinionGeneratorId: FullOpinionGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS,
      );

    const fullOpinionGenerator =
      await this.fullOpinionGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        fullOpinionGeneratorId,
        FullOpinionGeneratorNotFoundError,
      );

    if (fullOpinionGenerator.fullOpinionGeneratorCompleteAnalysis === null) {
      throw new FullOpinionGeneratorDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      fullOpinionGenerator.fullOpinionGeneratorSimplifiedAnalysis;

    if (responseAi === null) {
      const fullOpinionGeneratorSimplifiedAnalysis =
        await this.documentGeneratorProcessorGateway.getFullOpinionGeneratorSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              fullOpinionGenerator.fullOpinionGeneratorCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const updatedFullOpinionGenerator = new FullOpinionGeneratorEntity({
        ...fullOpinionGenerator,
        fullOpinionGeneratorSimplifiedAnalysis,
      });

      const updateTransaction =
        this.fullOpinionGeneratorCommandRepositoryGateway.updateFullOpinionGenerator(
          fullOpinionGenerator.id,
          updatedFullOpinionGenerator,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transaction.commit();

      responseAi = fullOpinionGeneratorSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new FullOpinionGeneratorDoesNotContainSimplifiedAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_gerador_parecer_completo',
      exportOptions,
    );
  }
}
