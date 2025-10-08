import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingAddressCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/command/legal-pleading-address.repository.gateway';
import { LegalPleadingDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/command/legal-pleading-document.repository.gateway';
import { LegalPleadingDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document-analysis/command/legal-pleading-document-analysis.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';
import { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';
import { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import { LegalPleadingDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/legal-pleading-document.entity';
import { LegalPleadingDocumentAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document-analysis/legal-pleading-document-analysis.entity';
import {
  CreateLegalPleadingDataRequestDto,
  CreateLegalPleadingRequestDto,
} from '@module/customer/analysis-tool/dto/request/create-legal-pleading.request.dto';
import { CreateLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateLegalPleadingUseCase {
  protected readonly _type = CreateLegalPleadingUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(LegalPleadingDocumentCommandRepositoryGateway)
    private readonly legalPleadingDocumentCommandRepositoryGateway: LegalPleadingDocumentCommandRepositoryGateway,
    @Inject(LegalPleadingAddressCommandRepositoryGateway)
    private readonly legalPleadingAddressCommandRepositoryGateway: LegalPleadingAddressCommandRepositoryGateway,
    @Inject(LegalPleadingCommandRepositoryGateway)
    private readonly legalPleadingCommandRepositoryGateway: LegalPleadingCommandRepositoryGateway,
    @Inject(LegalPleadingDocumentAnalysisCommandRepositoryGateway)
    private readonly legalPleadingDocumentAnalysisCommandRepositoryGateway: LegalPleadingDocumentAnalysisCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateLegalPleadingRequestDto,
  ): Promise<CreateLegalPleadingResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail(
        dto.json.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const legalPleadingAddress =
      dto.json.legalPleadingAddress !== undefined
        ? new LegalPleadingAddressEntity({
            ...dto.json.legalPleadingAddress,
          })
        : null;

    const legalPleading = new LegalPleadingEntity({
      ...dto.json,
      legalPleadingAddress,
      analysisToolClient,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const legalPleadingAddressTransaction =
      legalPleadingAddress !== null
        ? this.legalPleadingAddressCommandRepositoryGateway.createLegalPleadingAddress(
            legalPleadingAddress,
          )
        : null;

    const legalPleadingTransaction =
      this.legalPleadingCommandRepositoryGateway.createLegalPleading(
        legalPleading,
      );

    const legalPleadingDocumentTransaction =
      await this.createLegalPleadingDocuments(legalPleading, dto);

    const transactions: Array<TransactionType> = [
      legalPleadingTransaction,
      ...legalPleadingDocumentTransaction,
    ];

    if (legalPleadingAddressTransaction !== null) {
      transactions.push(legalPleadingAddressTransaction);
    }

    const transactionResult =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await transactionResult.commit();

    return CreateLegalPleadingResponseDto.build({
      legalPleadingId: legalPleading.id,
    });
  }

  private async createLegalPleadingDocuments(
    legalPleading: LegalPleadingEntity,
    dto: CreateLegalPleadingRequestDto,
  ): Promise<TransactionType[]> {
    const dtoDocumentMap: Array<{
      documentKey: keyof CreateLegalPleadingRequestDto;
      documentType: LegalPleadingDocumentTypeEnum;
    }> = [
      {
        documentKey: 'cnis',
        documentType: LegalPleadingDocumentTypeEnum.CNIS,
      },
      {
        documentKey: 'ctps',
        documentType: LegalPleadingDocumentTypeEnum.CTPS,
      },
      {
        documentKey: 'ruralDocument',
        documentType: LegalPleadingDocumentTypeEnum.RURAL_DOCUMENT,
      },
      {
        documentKey: 'specialWorkPeriodRecognitionDocument',
        documentType:
          LegalPleadingDocumentTypeEnum.SPECIAL_WORK_PERIOD_RECOGNITION_DOCUMENT,
      },
      {
        documentKey: 'personalDocument',
        documentType: LegalPleadingDocumentTypeEnum.PERSONAL_DOCUMENT,
      },
      {
        documentKey: 'relevantPriorAdministrativeProceeding',
        documentType:
          LegalPleadingDocumentTypeEnum.RELEVANT_PRIOR_ADMINISTRATIVE_PROCEEDING,
      },
      {
        documentKey: 'relatedCourtCase',
        documentType: LegalPleadingDocumentTypeEnum.RELATED_COURT_CASE,
      },
      {
        documentKey: 'supportingDocument',
        documentType: LegalPleadingDocumentTypeEnum.SUPPORTING_DOCUMENT,
      },
    ];

    const documentTransaction: TransactionType[] = [];

    const documentPromises = dtoDocumentMap.map(async (dtoDocumentMapItem) => {
      const documentFile = dto[dtoDocumentMapItem.documentKey];

      if (documentFile === undefined) {
        return;
      }

      if (documentFile instanceof CreateLegalPleadingDataRequestDto) {
        return;
      }

      const parsedDocumentFile = Array.isArray(documentFile)
        ? documentFile
        : [documentFile];

      const analysis =
        await this.analysisProcessorGateway.createLegalPleadingQuickDocumentAnalysis(
          parsedDocumentFile.map((file) => file.buffer),
        );

      const legalPleadingDocumentAnalysis =
        new LegalPleadingDocumentAnalysisEntity({
          analysis,
        });

      const legalPleadingDocumentAnalysisTransaction =
        this.legalPleadingDocumentAnalysisCommandRepositoryGateway.createLegalPleadingDocumentAnalysis(
          legalPleadingDocumentAnalysis,
        );

      documentTransaction.push(legalPleadingDocumentAnalysisTransaction);

      await Promise.all(
        parsedDocumentFile.map(async (document) => {
          const uploadDocument = await this.fileProcessorGateway.uploadDocument(
            document.buffer,
          );

          const legalPleadingDocument = new LegalPleadingDocumentEntity({
            type: dtoDocumentMapItem.documentType,
            document: uploadDocument,
            legalPleading,
            legalPleadingDocumentAnalysis,
          });

          const legalPleadingDocumentTransaction =
            this.legalPleadingDocumentCommandRepositoryGateway.createLegalPleadingDocument(
              legalPleadingDocument,
            );

          documentTransaction.push(legalPleadingDocumentTransaction);
        }),
      );
    });

    await Promise.all(documentPromises);

    return documentTransaction;
  }
}
