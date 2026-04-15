import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-result/command/special-retirement-grant-result.command.repository.gateway';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity';
import { SpecialRetirementGrantDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-does-not-contain-simplified-analysis.error';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadSpecialRetirementGrantSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadSpecialRetirementGrantSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantResultCommandRepositoryGateway)
    private readonly specialRetirementGrantResultCommandRepositoryGateway: SpecialRetirementGrantResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
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
    specialRetirementGrantId: SpecialRetirementGrantId,
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
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    const specialRetirementGrant =
      analysisToolRecordQueryResult.specialRetirementGrant;
    if (!specialRetirementGrant?.specialRetirementGrantResult) {
      throw new SpecialRetirementGrantDoesNotContainSimplifiedAnalysisError();
    }

    const currentResult = specialRetirementGrant.specialRetirementGrantResult;
    let simplified = currentResult.specialRetirementGrantSimplifiedAnalysis;

    if (simplified === null) {
      const clientDataBuffer = Buffer.from(
        JSON.stringify(
          analysisToolRecordQueryResult.analysisToolClient,
          null,
          2,
        ),
        'utf-8',
      );

      const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
        specialRetirementGrant.cnisDocument,
      );

      const docBuffers = await Promise.all(
        specialRetirementGrant.specialRetirementGrantDocument.map(
          async (doc) =>
            await this.fileProcessorGateway.getFileBuffer(doc.document),
        ),
      );

      const allBuffers = [clientDataBuffer, cnisBuffer, ...docBuffers];

      simplified =
        await this.analysisProcessorGateway.getSpecialRetirementGrantSimplifiedAnalysis(
          promptResponse.prompt,
          allBuffers,
        );

      const updatedResult = new SpecialRetirementGrantResultEntity({
        ...currentResult,
        specialRetirementGrantSimplifiedAnalysis: simplified,
      });

      const updateTransaction =
        this.specialRetirementGrantResultCommandRepositoryGateway.updateSpecialRetirementGrantResult(
          updatedResult.id,
          updatedResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        updateTransaction,
      ]);
      await transaction.commit();
    } else {
      const resultEntity = new SpecialRetirementGrantResultEntity({
        ...currentResult,
      });
      const updateTransaction =
        this.specialRetirementGrantResultCommandRepositoryGateway.updateSpecialRetirementGrantResult(
          resultEntity.id,
          resultEntity,
        );
      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        updateTransaction,
      ]);
      await transaction.commit();
    }

    if (simplified === null) {
      throw new SpecialRetirementGrantDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      simplified,
      format,
      'analise_simplificada_concessao_aposentadoria_especial',
    );
  }
}
