import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { InitialPetitionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/generate-initial-petition/domain/repository/initial-petition-generator-analysis-result/command/initial-petition-generator-analysis-result.command.repository.gateway';
import { InitialPetitionGeneratorEntity } from '@module/customer/analysis-tool/module/generate-initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/initial-petition-generator-analysis-result.entity';
import { CreateInitialPetitionGeneratorRequestDto } from '@module/customer/analysis-tool/module/generate-initial-petition/dto/request/create-initial-petition-generator-analysis-result.request.dto';
import { CreateInitialPetitionGeneratorResponseDto } from '@module/customer/analysis-tool/module/generate-initial-petition/dto/response/create-initial-petition-generator-analysis-result.response.dto';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';

@Injectable()
export class CreateInitialPetitionGeneratorUseCase {
  protected readonly _type =
    CreateInitialPetitionGeneratorUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(InitialPetitionGeneratorCommandRepositoryGateway)
    private readonly initialPetitionGeneratorCommandRepositoryGateway: InitialPetitionGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    requestDto: CreateInitialPetitionGeneratorRequestDto,
  ): Promise<CreateInitialPetitionGeneratorResponseDto> {
    // Buscar prompt do payment plan
    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS,
      );

    // Criar buffer com o texto recebido
    const resultTextBuffer = Buffer.from(requestDto.resultText, 'utf-8');

    // Processar com IA
    const initialPetitionGeneratorCompleteAnalysis =
      await this.analysisProcessorGateway.getInitialPetitionGeneratorAnalysisCompleteAnalysis(
        promptResponse.prompt,
        [resultTextBuffer],
      );

    // Criar entidade
    const initialPetitionGenerator =
      new InitialPetitionGeneratorEntity({
        initialPetitionGeneratorCompleteAnalysis:
          initialPetitionGeneratorCompleteAnalysis,
      });

    // Salvar no banco
    const createTransaction =
      this.initialPetitionGeneratorCommandRepositoryGateway.createInitialPetitionGenerator(
        initialPetitionGenerator,
      );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute([createTransaction]);
    await transaction.commit();

    // Retornar resposta
    return CreateInitialPetitionGeneratorResponseDto.build({
      initialPetitionGeneratorId: initialPetitionGenerator.id,
      initialPetitionGeneratorCompleteAnalysis:
        initialPetitionGenerator.initialPetitionGeneratorCompleteAnalysis,
    });
  }
}
