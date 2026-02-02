import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { AdministrativeRequestGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/command/administrative-request-generator.command.repository.gateway';
import { AdministrativeRequestGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/query/administrative-request-generator.query.repository.gateway';
import { AdministrativeRequestGeneratorEntity } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/administrative-request-generator.entity';
import { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';
import { AdministrativeRequestGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/administrative-request/error/administrative-request-generator-does-not-contain-complete-analysis.error';
import { AdministrativeRequestGeneratorDoesNotContainSimplifiedAnalysisError } from '@module/customer/documents-to-be-generated/module/administrative-request/error/administrative-request-generator-does-not-contain-simplified-analysis.error';
import { AdministrativeRequestGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/administrative-request/error/administrative-request-generator-not-found.error';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';

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
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
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
      administrativeRequestGenerator.administrativeRequestGeneratorCompleteAnalysis === null
    ) {
      throw new AdministrativeRequestGeneratorDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      administrativeRequestGenerator.administrativeRequestGeneratorSimplifiedAnalysis;

    if (responseAi === null) {
      const administrativeRequestGeneratorSimplifiedAnalysis =
        await this.analysisProcessorGateway.getAdministrativeRequestGeneratorAnalysisSimplifiedAnalysis(
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

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_gerador_requerimento_administrativo',
    );
  }
}
