import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { MaternityPayGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/maternity-pay-grant.query.repository.gateway';
import { MaternityPayGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-result/command/maternity-pay-grant-result.command.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/maternity-pay-grant-result.entity';
import { MaternityPayGrantCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-complete-analysis-download-not-found.error';
import { MaternityPayGrantNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-not-found.error';
import { MaternityPayGrantSimplifiedAnalysisNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-simplified-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadMaternityPayGrantSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadMaternityPayGrantSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(MaternityPayGrantQueryRepositoryGateway)
    private readonly maternityPayGrantQueryRepositoryGateway: MaternityPayGrantQueryRepositoryGateway,
    @Inject(MaternityPayGrantResultCommandRepositoryGateway)
    private readonly maternityPayGrantResultCommandRepositoryGateway: MaternityPayGrantResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayGrantId: MaternityPayGrantId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMaternityPayGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
      maternityPayGrantId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      MaternityPayGrantNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_GRANT_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_GRANT_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const analysisQueryResult =
      await this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations(
        maternityPayGrantId,
        MaternityPayGrantNotFoundError,
      );

    const maternityPayGrantResult = analysisQueryResult.maternityPayGrantResult;

    if (maternityPayGrantResult === null) {
      throw new MaternityPayGrantCompleteAnalysisDownloadNotFoundError();
    }

    if (maternityPayGrantResult.completeAnalysis === null) {
      throw new MaternityPayGrantCompleteAnalysisDownloadNotFoundError();
    }

    let responseAi = maternityPayGrantResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getMaternityPayGrantSimplifiedAnalysis(
          promptResponse.prompt,
          [Buffer.from(maternityPayGrantResult.completeAnalysis, 'utf-8')],
        );

      const updatedResultEntity = new MaternityPayGrantResultEntity({
        ...maternityPayGrantResult,
        simplifiedAnalysis,
      });

      const updateResultTransaction =
        this.maternityPayGrantResultCommandRepositoryGateway.updateMaternityPayGrantResult(
          updatedResultEntity,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        updateResultTransaction,
      ]);

      await transaction.commit();

      responseAi = simplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new MaternityPayGrantSimplifiedAnalysisNotFoundError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_salario_maternidade',
    );
  }
}
