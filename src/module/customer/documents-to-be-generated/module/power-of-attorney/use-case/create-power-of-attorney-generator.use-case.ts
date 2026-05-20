import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { DocumentGeneratorProcessorGateway } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.gateway';
import { PowerOfAttorneyGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/repository/power-of-attorney-generator-analysis-result/command/power-of-attorney-generator.command.repository.gateway';
import { PowerOfAttorneyGeneratorEntity } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/power-of-attorney-generator.entity';
import { CreatePowerOfAttorneyGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/power-of-attorney/dto/response/create-power-of-attorney-generator-analysis-result.response.dto';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CreatePowerOfAttorneyGeneratorUseCase {
  protected readonly _type = CreatePowerOfAttorneyGeneratorUseCase.name;

  public constructor(
    @Inject(DocumentGeneratorProcessorGateway)
    private readonly documentGeneratorProcessorGateway: DocumentGeneratorProcessorGateway,
    @Inject(PowerOfAttorneyGeneratorCommandRepositoryGateway)
    private readonly powerOfAttorneyGeneratorCommandRepositoryGateway: PowerOfAttorneyGeneratorCommandRepositoryGateway,
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
  ): Promise<CreatePowerOfAttorneyGeneratorResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.POWER_OF_ATTORNEY_GENERATOR_COMPLETE_ANALYSIS,
      );

    const clientDataBuffer = Buffer.from(clientDataText, 'utf-8');

    const powerOfAttorneyGeneratorCompleteAnalysis =
      await this.documentGeneratorProcessorGateway.getPowerOfAttorneyGeneratorCompleteAnalysis(
        promptResponse.prompt,
        [clientDataBuffer],
      );

    const powerOfAttorneyGenerator = new PowerOfAttorneyGeneratorEntity({
      powerOfAttorneyGeneratorCompleteAnalysis,
    });

    const createTransaction =
      this.powerOfAttorneyGeneratorCommandRepositoryGateway.createPowerOfAttorneyGenerator(
        powerOfAttorneyGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createTransaction,
    ]);
    await transaction.commit();

    return CreatePowerOfAttorneyGeneratorResponseDto.build({
      powerOfAttorneyGeneratorId: powerOfAttorneyGenerator.id,
      powerOfAttorneyGeneratorCompleteAnalysis:
        powerOfAttorneyGenerator.powerOfAttorneyGeneratorCompleteAnalysis,
    });
  }
}
