import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { PaymentPlanPaidResourceNotFoundError } from '@module/admin/payment-plan/error/payment-plan-paid-resource-not-found.error';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/command/legal-pleading-document.repository.gateway';
import { LegalPleadingDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/legal-pleading-document.query.repository.gateway';
import { LegalPleadingDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document-analysis/command/legal-pleading-document-analysis.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';
import { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import { LegalPleadingDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/legal-pleading-document.entity';
import { LegalPleadingDocumentAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document-analysis/legal-pleading-document-analysis.entity';
import { LegalPleadingResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';
import {
  CreateLegalPleadingDocumentAnalysisResponseDto,
  CreateLegalPleadingDocumentTypeAnalysisResponseDto,
} from '@module/customer/analysis-tool/dto/response/create-legal-pleading-document-analysis.response.dto';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateLegalPleadingDocumentAnalysisUseCase {
  protected readonly _type = CreateLegalPleadingDocumentAnalysisUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    protected readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    protected readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(LegalPleadingDocumentCommandRepositoryGateway)
    private readonly legalPleadingDocumentCommandRepositoryGateway: LegalPleadingDocumentCommandRepositoryGateway,
    @Inject(LegalPleadingDocumentAnalysisCommandRepositoryGateway)
    private readonly legalPleadingDocumentAnalysisCommandRepositoryGateway: LegalPleadingDocumentAnalysisCommandRepositoryGateway,
    @Inject(LegalPleadingDocumentQueryRepositoryGateway)
    private readonly legalPleadingDocumentQueryRepositoryGateway: LegalPleadingDocumentQueryRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepositoryGateway: PaymentPlanPaidResourceQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    legalPleadingId: LegalPleadingId,
  ): Promise<CreateLegalPleadingDocumentAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const paymentPlanPaidResource =
      await this.paymentPlanPaidResourceQueryRepositoryGateway.findOnePaymentPlanPaidResourceByResourceType(
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS,
      );

    if (paymentPlanPaidResource === null) {
      throw new PaymentPlanPaidResourceNotFoundError();
    }

    const legalPleadingQueryResult =
      await this.legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
        legalPleadingId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        LegalPleadingNotFoundError,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS,
        organizationMember.id,
        {
          explicitCreditCost:
            paymentPlanPaidResource.creditCost *
            legalPleadingQueryResult.legalPleadingDocument.length,
        },
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...legalPleadingQueryResult.analysisToolClient,
      createdBy: legalPleadingQueryResult.createdBy.id,
      updatedBy: legalPleadingQueryResult.updatedBy.id,
    });

    const legalPleadingAddress =
      legalPleadingQueryResult.legalPleadingAddress !== null
        ? new LegalPleadingAddressEntity({
            ...legalPleadingQueryResult.legalPleadingAddress,
          })
        : null;

    const legalPleadingResult =
      legalPleadingQueryResult.legalPleadingResult !== null
        ? new LegalPleadingResultEntity({
            ...legalPleadingQueryResult.legalPleadingResult,
          })
        : null;

    const legalPleading = new LegalPleadingEntity({
      ...legalPleadingQueryResult,
      legalPleadingAddress,
      analysisToolClient,
      legalPleadingResult,
      createdBy: legalPleadingQueryResult.createdBy.id,
      updatedBy: legalPleadingQueryResult.updatedBy.id,
    });

    const documentGroup: {
      [key: string]: Array<Buffer>;
    } = {};

    await Promise.all(
      legalPleadingQueryResult.legalPleadingDocument.map(async (document) => {
        const fileBuffer = await this.fileProcessorGateway.getFileBuffer(
          document.document,
        );

        documentGroup[document.type] ??= [];

        documentGroup[document.type]?.push(fileBuffer);
      }),
    );

    const transactions: TransactionType[] = [consumeCreditTransaction];
    const responseData: CreateLegalPleadingDocumentTypeAnalysisResponseDto[] =
      [];

    const legalPleadingQuickDocumentAnalysisPrompt =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS,
      );

    await Promise.all(
      Object.keys(documentGroup).map(async (key) => {
        const documentType = key as LegalPleadingDocumentTypeEnum;
        const documents = documentGroup[documentType] as Buffer[];

        const documentAnalysis =
          await this.analysisProcessorGateway.getLegalPleadingQuickDocumentAnalysis(
            legalPleadingQuickDocumentAnalysisPrompt.prompt,
            documents,
          );

        const legalPleadingDocumentAnalysis =
          new LegalPleadingDocumentAnalysisEntity({
            analysis: documentAnalysis,
          });

        const analysis =
          documentAnalysis !== null
            ? await this.exportDocumentGateway.convertMarkdownToHtml(
                documentAnalysis,
              )
            : null;

        const documentAnalysisResponseData =
          CreateLegalPleadingDocumentTypeAnalysisResponseDto.build({
            analysis,
            type: documentType,
          });

        responseData.push(documentAnalysisResponseData);

        const legalPleadingDocumentAnalysisTransaction =
          this.legalPleadingDocumentAnalysisCommandRepositoryGateway.createLegalPleadingDocumentAnalysis(
            legalPleadingDocumentAnalysis,
          );

        transactions.push(legalPleadingDocumentAnalysisTransaction);

        const legalPleadingDocumentsToUpdate =
          await this.legalPleadingDocumentQueryRepositoryGateway.findByDocumentTypeAndOrganizationIdAndLegalPleadingId(
            legalPleadingId,
            documentType,
            organizationSessionData.organizationId,
          );

        legalPleadingDocumentsToUpdate.map((document) => {
          const legalPleadingDocument = new LegalPleadingDocumentEntity({
            ...document,
            legalPleadingDocumentAnalysis,
            legalPleading,
          });

          const legalPleadingDocumentTransaction =
            this.legalPleadingDocumentCommandRepositoryGateway.updateLegalPleadingDocument(
              legalPleadingDocument.id,
              legalPleadingDocument,
            );

          transactions.push(legalPleadingDocumentTransaction);
        });
      }),
    );

    const executeTransaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await executeTransaction.commit();

    return CreateLegalPleadingDocumentAnalysisResponseDto.build({
      data: responseData,
    });
  }
}
