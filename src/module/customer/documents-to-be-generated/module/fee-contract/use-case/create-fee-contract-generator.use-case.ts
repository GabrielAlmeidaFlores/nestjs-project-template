import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { DocumentGeneratorProcessorGateway } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.gateway';
import { FeeContractGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/repository/fee-contract-generator-analysis-result/command/fee-contract-generator.command.repository.gateway';
import { FeeContractGeneratorEntity } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/fee-contract-generator.entity';
import { CreateFeeContractGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/fee-contract/dto/response/create-fee-contract-generator-analysis-result.response.dto';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CreateFeeContractGeneratorUseCase {
  protected readonly _type = CreateFeeContractGeneratorUseCase.name;

  public constructor(
    @Inject(DocumentGeneratorProcessorGateway)
    private readonly documentGeneratorProcessorGateway: DocumentGeneratorProcessorGateway,
    @Inject(FeeContractGeneratorCommandRepositoryGateway)
    private readonly feeContractGeneratorCommandRepositoryGateway: FeeContractGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
  ) {}

  public async execute(
    clientId: AnalysisToolClientId,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CreateFeeContractGeneratorResponseDto> {
    const clientResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        clientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const clientDataText = [
      `Nome: ${clientResult.name ?? 'Não informado'}`,
      `CPF: ${clientResult.federalDocument?.toString() ?? 'Não informado'}`,
      `Email: ${clientResult.email?.toString() ?? 'Não informado'}`,
      `Telefone: ${clientResult.phoneNumber?.toString() ?? 'Não informado'}`,
      `Data de Nascimento: ${clientResult.birthDate?.toISOString().split('T')[0] ?? 'Não informado'}`,
      `Gênero: ${clientResult.gender ?? 'Não informado'}`,
    ].join('\n');

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.FEE_CONTRACT_GENERATOR_COMPLETE_ANALYSIS,
      );

    const clientDataBuffer = Buffer.from(clientDataText, 'utf-8');

    const feeContractGeneratorCompleteAnalysis =
      await this.documentGeneratorProcessorGateway.getFeeContractGeneratorCompleteAnalysis(
        promptResponse.prompt,
        [clientDataBuffer],
      );

    const feeContractGenerator = new FeeContractGeneratorEntity({
      feeContractGeneratorCompleteAnalysis,
    });

    const createTransaction =
      this.feeContractGeneratorCommandRepositoryGateway.createFeeContractGenerator(
        feeContractGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createTransaction,
    ]);
    await transaction.commit();

    return CreateFeeContractGeneratorResponseDto.build({
      feeContractGeneratorId: feeContractGenerator.id,
      feeContractGeneratorCompleteAnalysis:
        feeContractGenerator.feeContractGeneratorCompleteAnalysis,
    });
  }
}
