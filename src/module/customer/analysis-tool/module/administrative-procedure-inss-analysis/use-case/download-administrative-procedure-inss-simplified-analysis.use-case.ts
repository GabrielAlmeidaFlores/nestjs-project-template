import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { AdministrativeProcedureInssAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/administrative-procedure-inss-analysis.query.repository.gateway';
import { AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-result/command/administrative-procedure-inss-analysis-result.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { AdministrativeProcedureInssAnalysisResultEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.entity';
import { AdministrativeProcedureInssAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/error/administrative-procedure-inss-analysis-does-not-contain-complete-analysis.error';
import { AdministrativeProcedureInssAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/error/administrative-procedure-inss-analysis-does-not-contain-simplified-analysis.error';
import { AdministrativeProcedureInssAnalysisNotFoundError } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/error/administrative-procedure-inss-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadAdministrativeProcedureInssSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadAdministrativeProcedureInssSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AdministrativeProcedureInssAnalysisQueryRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisQueryRepositoryGateway: AdministrativeProcedureInssAnalysisQueryRepositoryGateway,
    @Inject(AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisResultCommandRepositoryGateway: AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway,
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
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
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

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const administrativeProcedureInssAnalysisQueryResult =
      await this.administrativeProcedureInssAnalysisQueryRepositoryGateway.findOneByAdministrativeProcedureInssAnalysisIdAndOrganizationIdOrFail(
        administrativeProcedureInssAnalysisId,
        organizationSessionData.organizationId,
        AdministrativeProcedureInssAnalysisNotFoundError,
      );

    if (
      !administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisResult
    ) {
      throw new AdministrativeProcedureInssAnalysisDoesNotContainCompleteAnalysisError();
    }

    if (
      administrativeProcedureInssAnalysisQueryResult
        .administrativeProcedureInssAnalysisResult
        .administrativeProcedureInssCompleteAnalysis === null
    ) {
      throw new AdministrativeProcedureInssAnalysisDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      administrativeProcedureInssAnalysisQueryResult
        .administrativeProcedureInssAnalysisResult
        .administrativeProcedureInssSimplifiedAnalysis;

    if (responseAi === null) {
      const administrativeProcedureSimplifiedAnalysis =
        await this.analysisProcessorGateway.getAdministrativeProcedureInssAnalysisSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              administrativeProcedureInssAnalysisQueryResult
                .administrativeProcedureInssAnalysisResult
                .administrativeProcedureInssCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const administrativeProcedureInssAnalysisResult =
        new AdministrativeProcedureInssAnalysisResultEntity({
          ...administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisResult,
          administrativeProcedureInssSimplifiedAnalysis:
            administrativeProcedureSimplifiedAnalysis,
        });

      const administrativeProcedureInssAnalysisResultTransaction =
        this.administrativeProcedureInssAnalysisResultCommandRepositoryGateway.updateAdministrativeProcedureInssAnalysisResult(
          administrativeProcedureInssAnalysisQueryResult
            .administrativeProcedureInssAnalysisResult.id,
          administrativeProcedureInssAnalysisResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        administrativeProcedureInssAnalysisResultTransaction,
      ]);
      await transaction.commit();

      responseAi = administrativeProcedureSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new AdministrativeProcedureInssAnalysisDoesNotContainSimplifiedAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_procedimento_administrativo_inss',
      exportOptions,
    );
  }
}
