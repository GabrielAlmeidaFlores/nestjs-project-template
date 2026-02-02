import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FullOpinionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/command/full-opinion-generator.command.repository.gateway';
import { FullOpinionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/full-opinion-generator.entity';
import { CreateFullOpinionGeneratorRequestDto } from '@module/customer/documents-to-be-generated/module/full-opinion/dto/request/create-full-opinion-generator-analysis-result.request.dto';
import { CreateFullOpinionGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/full-opinion/dto/response/create-full-opinion-generator-analysis-result.response.dto';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';

@Injectable()
export class CreateFullOpinionGeneratorUseCase {
  protected readonly _type = CreateFullOpinionGeneratorUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FullOpinionGeneratorCommandRepositoryGateway)
    private readonly fullOpinionGeneratorCommandRepositoryGateway: FullOpinionGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    requestDto: CreateFullOpinionGeneratorRequestDto,
  ): Promise<CreateFullOpinionGeneratorResponseDto> {
    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS,
      );

    const resultTextBuffer = Buffer.from(requestDto.resultText, 'utf-8');

    const fullOpinionGeneratorCompleteAnalysis =
      await this.analysisProcessorGateway.getFullOpinionGeneratorAnalysisCompleteAnalysis(
        promptResponse.prompt,
        [resultTextBuffer],
      );

    const fullOpinionGenerator = new FullOpinionGeneratorEntity({
      fullOpinionGeneratorCompleteAnalysis:
        fullOpinionGeneratorCompleteAnalysis,
    });

    const createTransaction =
      this.fullOpinionGeneratorCommandRepositoryGateway.createFullOpinionGenerator(
        fullOpinionGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createTransaction,
    ]);
    await transaction.commit();

    return CreateFullOpinionGeneratorResponseDto.build({
      fullOpinionGeneratorId: fullOpinionGenerator.id,
      fullOpinionGeneratorCompleteAnalysis:
        fullOpinionGenerator.fullOpinionGeneratorCompleteAnalysis,
    });
  }
}
