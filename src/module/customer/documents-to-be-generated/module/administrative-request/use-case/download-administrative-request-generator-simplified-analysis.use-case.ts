import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { DocumentGeneratorProcessorGateway } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.gateway';
import { AdministrativeRequestGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/command/administrative-request-generator.command.repository.gateway';
import { AdministrativeRequestGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/query/administrative-request-generator.query.repository.gateway';
import { AdministrativeRequestGeneratorEntity } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/administrative-request-generator.entity';
import { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';
import { AdministrativeRequestGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/administrative-request/error/administrative-request-generator-does-not-contain-complete-analysis.error';
import { AdministrativeRequestGeneratorDoesNotContainSimplifiedAnalysisError } from '@module/customer/documents-to-be-generated/module/administrative-request/error/administrative-request-generator-does-not-contain-simplified-analysis.error';
import { AdministrativeRequestGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/administrative-request/error/administrative-request-generator-not-found.error';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class DownloadAdministrativeRequestGeneratorSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadAdministrativeRequestGeneratorSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(AdministrativeRequestGeneratorQueryRepositoryGateway)
    private readonly administrativeRequestGeneratorQueryRepositoryGateway: AdministrativeRequestGeneratorQueryRepositoryGateway,
    @Inject(AdministrativeRequestGeneratorCommandRepositoryGateway)
    private readonly administrativeRequestGeneratorCommandRepositoryGateway: AdministrativeRequestGeneratorCommandRepositoryGateway,
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
    administrativeRequestGeneratorId: AdministrativeRequestGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS,
      );

    const administrativeRequestGenerator =
      await this.administrativeRequestGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        administrativeRequestGeneratorId,
        AdministrativeRequestGeneratorNotFoundError,
      );

    if (
      administrativeRequestGenerator.administrativeRequestGeneratorCompleteAnalysis ===
      null
    ) {
      throw new AdministrativeRequestGeneratorDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      administrativeRequestGenerator.administrativeRequestGeneratorSimplifiedAnalysis;

    if (responseAi === null) {
      const administrativeRequestGeneratorSimplifiedAnalysis =
        await this.documentGeneratorProcessorGateway.getAdministrativeRequestGeneratorSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              administrativeRequestGenerator.administrativeRequestGeneratorCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const updatedAdministrativeRequestGenerator =
        new AdministrativeRequestGeneratorEntity({
          ...administrativeRequestGenerator,
          administrativeRequestGeneratorSimplifiedAnalysis,
        });

      const updateTransaction =
        this.administrativeRequestGeneratorCommandRepositoryGateway.updateAdministrativeRequestGenerator(
          administrativeRequestGenerator.id,
          updatedAdministrativeRequestGenerator,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transaction.commit();

      responseAi = administrativeRequestGeneratorSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new AdministrativeRequestGeneratorDoesNotContainSimplifiedAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_gerador_requerimento_administrativo',
      exportOptions,
    );
  }
}
