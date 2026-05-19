import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { DocumentGeneratorProcessorGateway } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.gateway';
import { JefWaiverDeclarationGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/repository/jef-waiver-declaration-generator-analysis-result/command/jef-waiver-declaration-generator.command.repository.gateway';
import { JefWaiverDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/jef-waiver-declaration-generator.entity';
import { CreateJefWaiverDeclarationGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/dto/response/create-jef-waiver-declaration-generator-analysis-result.response.dto';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CreateJefWaiverDeclarationGeneratorUseCase {
  protected readonly _type = CreateJefWaiverDeclarationGeneratorUseCase.name;

  public constructor(
    @Inject(DocumentGeneratorProcessorGateway)
    private readonly documentGeneratorProcessorGateway: DocumentGeneratorProcessorGateway,
    @Inject(JefWaiverDeclarationGeneratorCommandRepositoryGateway)
    private readonly jefWaiverDeclarationGeneratorCommandRepositoryGateway: JefWaiverDeclarationGeneratorCommandRepositoryGateway,
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
  ): Promise<CreateJefWaiverDeclarationGeneratorResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.JEF_WAIVER_DECLARATION_GENERATOR_COMPLETE_ANALYSIS,
      );

    const clientDataBuffer = Buffer.from(clientDataText, 'utf-8');

    const jefWaiverDeclarationGeneratorCompleteAnalysis =
      await this.documentGeneratorProcessorGateway.getJefWaiverDeclarationGeneratorCompleteAnalysis(
        promptResponse.prompt,
        [clientDataBuffer],
      );

    const jefWaiverDeclarationGenerator = new JefWaiverDeclarationGeneratorEntity({
      jefWaiverDeclarationGeneratorCompleteAnalysis,
    });

    const createTransaction =
      this.jefWaiverDeclarationGeneratorCommandRepositoryGateway.createJefWaiverDeclarationGenerator(
        jefWaiverDeclarationGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createTransaction,
    ]);
    await transaction.commit();

    return CreateJefWaiverDeclarationGeneratorResponseDto.build({
      jefWaiverDeclarationGeneratorId: jefWaiverDeclarationGenerator.id,
      jefWaiverDeclarationGeneratorCompleteAnalysis:
        jefWaiverDeclarationGenerator.jefWaiverDeclarationGeneratorCompleteAnalysis,
    });
  }
}
