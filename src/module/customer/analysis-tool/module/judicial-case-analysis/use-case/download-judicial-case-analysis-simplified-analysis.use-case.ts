import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { JudicialCaseAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/judicial-case-analysis.query.repository.gateway';
import { JudicialCaseAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-result/command/judicial-case-analysis-result.command.repository.gateway';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { JudicialCaseAnalysisResultEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity';
import { JudicialCaseAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/judicial-case-analysis/error/judicial-case-analysis-does-not-contain-complete-analysis.error';
import { JudicialCaseAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/judicial-case-analysis/error/judicial-case-analysis-does-not-contain-simplified-analysis.error';
import { JudicialCaseAnalysisNotFoundError } from '@module/customer/analysis-tool/module/judicial-case-analysis/error/judicial-case-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadJudicialCaseAnalysisSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadJudicialCaseAnalysisSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(JudicialCaseAnalysisQueryRepositoryGateway)
    private readonly judicialCaseAnalysisQueryRepositoryGateway: JudicialCaseAnalysisQueryRepositoryGateway,
    @Inject(JudicialCaseAnalysisResultCommandRepositoryGateway)
    private readonly judicialCaseAnalysisResultCommandRepositoryGateway: JudicialCaseAnalysisResultCommandRepositoryGateway,
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
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
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
        PaymentPlanPaidResourceTypeEnum.JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const judicialCaseAnalysisQueryResult =
      await this.judicialCaseAnalysisQueryRepositoryGateway.findOneByJudicialCaseAnalysisIdAndOrganizationIdOrFail(
        judicialCaseAnalysisId,
        organizationSessionData.organizationId,
        JudicialCaseAnalysisNotFoundError,
      );

    if (!judicialCaseAnalysisQueryResult.judicialCaseAnalysisResult) {
      throw new JudicialCaseAnalysisDoesNotContainCompleteAnalysisError();
    }

    if (
      judicialCaseAnalysisQueryResult.judicialCaseAnalysisResult
        .judicialCaseCompleteAnalysis === null
    ) {
      throw new JudicialCaseAnalysisDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      judicialCaseAnalysisQueryResult.judicialCaseAnalysisResult
        .judicialCaseSimplifiedAnalysis;

    if (responseAi === null) {
      const judicialCaseSimplifiedAnalysis =
        await this.analysisProcessorGateway.getJudicialCaseAnalysisSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              judicialCaseAnalysisQueryResult.judicialCaseAnalysisResult
                .judicialCaseCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const judicialCaseAnalysisResult = new JudicialCaseAnalysisResultEntity({
        ...judicialCaseAnalysisQueryResult.judicialCaseAnalysisResult,
        judicialCaseSimplifiedAnalysis: judicialCaseSimplifiedAnalysis,
      });

      const judicialCaseAnalysisResultTransaction =
        this.judicialCaseAnalysisResultCommandRepositoryGateway.updateJudicialCaseAnalysisResult(
          judicialCaseAnalysisQueryResult.judicialCaseAnalysisResult.id,
          judicialCaseAnalysisResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        judicialCaseAnalysisResultTransaction,
      ]);
      await transaction.commit();

      responseAi = judicialCaseSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new JudicialCaseAnalysisDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_caso_judicial',
    );
  }
}
