import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { InitialPetitionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/command/initial-petition-generator.command.repository.gateway';
import { InitialPetitionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/query/initial-petition-generator.query.repository.gateway';
import { InitialPetitionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/initial-petition-generator.entity';
import { InitialPetitionGeneratorId } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';
import { InitialPetitionGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/initial-petition/error/initial-petition-generator-does-not-contain-complete-analysis.error';
import { InitialPetitionGeneratorDoesNotContainSimplifiedAnalysisError } from '@module/customer/documents-to-be-generated/module/initial-petition/error/initial-petition-generator-does-not-contain-simplified-analysis.error';
import { InitialPetitionGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/initial-petition/error/initial-petition-generator-not-found.error';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';

@Injectable()
export class DownloadInitialPetitionGeneratorSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadInitialPetitionGeneratorSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(InitialPetitionGeneratorQueryRepositoryGateway)
    private readonly initialPetitionGeneratorQueryRepositoryGateway: InitialPetitionGeneratorQueryRepositoryGateway,
    @Inject(InitialPetitionGeneratorCommandRepositoryGateway)
    private readonly initialPetitionGeneratorCommandRepositoryGateway: InitialPetitionGeneratorCommandRepositoryGateway,
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
    initialPetitionGeneratorId: InitialPetitionGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS,
      );

    const initialPetitionGenerator =
      await this.initialPetitionGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        initialPetitionGeneratorId,
        InitialPetitionGeneratorNotFoundError,
      );

    if (
      initialPetitionGenerator.initialPetitionGeneratorCompleteAnalysis === null
    ) {
      throw new InitialPetitionGeneratorDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      initialPetitionGenerator.initialPetitionGeneratorSimplifiedAnalysis;

    if (responseAi === null) {
      const initialPetitionGeneratorSimplifiedAnalysis =
        await this.analysisProcessorGateway.getInitialPetitionGeneratorAnalysisSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              initialPetitionGenerator.initialPetitionGeneratorCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const updatedInitialPetitionGenerator =
        new InitialPetitionGeneratorEntity({
          ...initialPetitionGenerator,
          initialPetitionGeneratorSimplifiedAnalysis,
        });

      const updateTransaction =
        this.initialPetitionGeneratorCommandRepositoryGateway.updateInitialPetitionGenerator(
          initialPetitionGenerator.id,
          updatedInitialPetitionGenerator,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transaction.commit();

      responseAi = initialPetitionGeneratorSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new InitialPetitionGeneratorDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_gerador_peticao_inicial',
    );
  }
}
