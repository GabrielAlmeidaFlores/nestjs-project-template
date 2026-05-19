import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { DocumentGeneratorProcessorGateway } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.gateway';
import { PovertyDeclarationGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/repository/poverty-declaration-generator-analysis-result/command/poverty-declaration-generator.command.repository.gateway';
import { PovertyDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/poverty-declaration-generator.entity';
import { CreatePovertyDeclarationGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/poverty-declaration/dto/response/create-poverty-declaration-generator-analysis-result.response.dto';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CreatePovertyDeclarationGeneratorUseCase {
  protected readonly _type = CreatePovertyDeclarationGeneratorUseCase.name;

  public constructor(
    @Inject(DocumentGeneratorProcessorGateway)
    private readonly documentGeneratorProcessorGateway: DocumentGeneratorProcessorGateway,
    @Inject(PovertyDeclarationGeneratorCommandRepositoryGateway)
    private readonly povertyDeclarationGeneratorCommandRepositoryGateway: PovertyDeclarationGeneratorCommandRepositoryGateway,
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
  ): Promise<CreatePovertyDeclarationGeneratorResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.POVERTY_DECLARATION_GENERATOR_COMPLETE_ANALYSIS,
      );

    const clientDataBuffer = Buffer.from(clientDataText, 'utf-8');

    const povertyDeclarationGeneratorCompleteAnalysis =
      await this.documentGeneratorProcessorGateway.getPovertyDeclarationGeneratorCompleteAnalysis(
        promptResponse.prompt,
        [clientDataBuffer],
      );

    const povertyDeclarationGenerator = new PovertyDeclarationGeneratorEntity({
      povertyDeclarationGeneratorCompleteAnalysis,
    });

    const createTransaction =
      this.povertyDeclarationGeneratorCommandRepositoryGateway.createPovertyDeclarationGenerator(
        povertyDeclarationGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createTransaction,
    ]);
    await transaction.commit();

    return CreatePovertyDeclarationGeneratorResponseDto.build({
      povertyDeclarationGeneratorId: povertyDeclarationGenerator.id,
      povertyDeclarationGeneratorCompleteAnalysis:
        povertyDeclarationGenerator.povertyDeclarationGeneratorCompleteAnalysis,
    });
  }
}
