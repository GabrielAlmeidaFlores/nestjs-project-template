import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { AdministrativeRequestGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/command/administrative-request-generator.command.repository.gateway';
import { AdministrativeRequestGeneratorEntity } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/administrative-request-generator.entity';
import { CreateAdministrativeRequestGeneratorRequestDto } from '@module/customer/documents-to-be-generated/module/administrative-request/dto/request/create-administrative-request-generator-analysis-result.request.dto';
import { CreateAdministrativeRequestGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/administrative-request/dto/response/create-administrative-request-generator-analysis-result.response.dto';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';

@Injectable()
export class CreateAdministrativeRequestGeneratorUseCase {
  protected readonly _type = CreateAdministrativeRequestGeneratorUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(AdministrativeRequestGeneratorCommandRepositoryGateway)
    private readonly administrativeRequestGeneratorCommandRepositoryGateway: AdministrativeRequestGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    requestDto: CreateAdministrativeRequestGeneratorRequestDto,
  ): Promise<CreateAdministrativeRequestGeneratorResponseDto> {
    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS,
      );

    const resultTextBuffer = Buffer.from(requestDto.resultText, 'utf-8');

    const administrativeRequestGeneratorCompleteAnalysis =
      await this.analysisProcessorGateway.getAdministrativeRequestGeneratorAnalysisCompleteAnalysis(
        promptResponse.prompt,
        [resultTextBuffer],
      );

    const administrativeRequestGenerator = new AdministrativeRequestGeneratorEntity({
      administrativeRequestGeneratorCompleteAnalysis:
        administrativeRequestGeneratorCompleteAnalysis,
    });

    const createTransaction =
      this.administrativeRequestGeneratorCommandRepositoryGateway.createAdministrativeRequestGenerator(
        administrativeRequestGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createTransaction,
    ]);
    await transaction.commit();

    return CreateAdministrativeRequestGeneratorResponseDto.build({
      administrativeRequestGeneratorId: administrativeRequestGenerator.id,
      administrativeRequestGeneratorCompleteAnalysis:
        administrativeRequestGenerator.administrativeRequestGeneratorCompleteAnalysis,
    });
  }
}
