import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingAddressCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-address/command/legal-pleading-address.repository.gateway';
import { LegalPleadingDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document/command/legal-pleading-document.repository.gateway';
import { LegalPleadingEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/legal-pleading.entity';
import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';
import { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import { LegalPleadingDocumentEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document/legal-pleading-document.entity';
import { UpdateLegalPleadingRequestDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/request/update-legal-pleading.request.dto';
import { UpdateLegalPleadingResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/update-legal-pleading.response.dto';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/module/legal-pleading/error/legal-pleading-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateLegalPleadingUseCase {
  protected readonly _type = UpdateLegalPleadingUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(LegalPleadingDocumentCommandRepositoryGateway)
    private readonly legalPleadingDocumentCommandRepositoryGateway: LegalPleadingDocumentCommandRepositoryGateway,
    @Inject(LegalPleadingAddressCommandRepositoryGateway)
    private readonly legalPleadingAddressCommandRepositoryGateway: LegalPleadingAddressCommandRepositoryGateway,
    @Inject(LegalPleadingCommandRepositoryGateway)
    private readonly legalPleadingCommandRepositoryGateway: LegalPleadingCommandRepositoryGateway,
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    legalPleadingId: LegalPleadingId,
    dto: UpdateLegalPleadingRequestDto,
  ): Promise<UpdateLegalPleadingResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingLegalPleading =
      await this.legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
        legalPleadingId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        LegalPleadingNotFoundError,
      );

    let legalPleadingAddress: LegalPleadingAddressEntity | null = null;

    if (dto.json.legalPleadingAddress !== undefined) {
      if (existingLegalPleading.legalPleadingAddress !== null) {
        legalPleadingAddress = new LegalPleadingAddressEntity({
          id: existingLegalPleading.legalPleadingAddress.id,
          city:
            dto.json.legalPleadingAddress.city ??
            existingLegalPleading.legalPleadingAddress.city,
          neighborhood:
            dto.json.legalPleadingAddress.neighborhood ??
            existingLegalPleading.legalPleadingAddress.neighborhood,
          street:
            dto.json.legalPleadingAddress.street ??
            existingLegalPleading.legalPleadingAddress.street,
          stateCode:
            dto.json.legalPleadingAddress.stateCode ??
            existingLegalPleading.legalPleadingAddress.stateCode,
          postalCode:
            dto.json.legalPleadingAddress.postalCode ??
            existingLegalPleading.legalPleadingAddress.postalCode,
          addressNumber:
            dto.json.legalPleadingAddress.addressNumber ??
            existingLegalPleading.legalPleadingAddress.addressNumber,
          createdAt: existingLegalPleading.legalPleadingAddress.createdAt,
          updatedAt: new Date(),
        });
      } else {
        if (
          dto.json.legalPleadingAddress.city !== undefined &&
          dto.json.legalPleadingAddress.neighborhood !== undefined &&
          dto.json.legalPleadingAddress.street !== undefined &&
          dto.json.legalPleadingAddress.stateCode !== undefined &&
          dto.json.legalPleadingAddress.postalCode !== undefined &&
          dto.json.legalPleadingAddress.addressNumber !== undefined
        ) {
          legalPleadingAddress = new LegalPleadingAddressEntity({
            city: dto.json.legalPleadingAddress.city,
            neighborhood: dto.json.legalPleadingAddress.neighborhood,
            street: dto.json.legalPleadingAddress.street,
            stateCode: dto.json.legalPleadingAddress.stateCode,
            postalCode: dto.json.legalPleadingAddress.postalCode,
            addressNumber: dto.json.legalPleadingAddress.addressNumber,
          });
        }
      }
    } else {
      legalPleadingAddress = existingLegalPleading.legalPleadingAddress
        ? new LegalPleadingAddressEntity({
            id: existingLegalPleading.legalPleadingAddress.id,
            city: existingLegalPleading.legalPleadingAddress.city,
            neighborhood:
              existingLegalPleading.legalPleadingAddress.neighborhood,
            street: existingLegalPleading.legalPleadingAddress.street,
            stateCode: existingLegalPleading.legalPleadingAddress.stateCode,
            postalCode: existingLegalPleading.legalPleadingAddress.postalCode,
            addressNumber:
              existingLegalPleading.legalPleadingAddress.addressNumber,
            createdAt: existingLegalPleading.legalPleadingAddress.createdAt,
          })
        : null;
    }

    const analysisToolClient = new AnalysisToolClientEntity({
      ...existingLegalPleading.analysisToolClient,
      createdBy: existingLegalPleading.analysisToolClient.createdBy.id,
      updatedBy: existingLegalPleading.analysisToolClient.updatedBy.id,
    });

    const updatedLegalPleading = new LegalPleadingEntity({
      id: existingLegalPleading.id,
      code: existingLegalPleading.code,
      status: existingLegalPleading.status,
      statementOfFacts:
        dto.json.statementOfFacts ?? existingLegalPleading.statementOfFacts,
      additionalComments:
        dto.json.additionalComments ?? existingLegalPleading.additionalComments,
      securitySystem:
        dto.json.securitySystem ?? existingLegalPleading.securitySystem,
      benefitType: dto.json.benefitType ?? existingLegalPleading.benefitType,
      petitionType: dto.json.petitionType ?? existingLegalPleading.petitionType,
      benefitNumber:
        dto.json.benefitNumber ?? existingLegalPleading.benefitNumber,
      applicationSubmissionDate:
        dto.json.applicationSubmissionDate ??
        existingLegalPleading.applicationSubmissionDate,
      benefitTerminationDate:
        dto.json.benefitTerminationDate ??
        existingLegalPleading.benefitTerminationDate,
      benefitInitialMonthlyIncome:
        dto.json.benefitInitialMonthlyIncome ??
        existingLegalPleading.benefitInitialMonthlyIncome,
      benefitCurrentMonthlyIncome:
        dto.json.benefitCurrentMonthlyIncome ??
        existingLegalPleading.benefitCurrentMonthlyIncome,
      socialSecurityObjective:
        dto.json.socialSecurityObjective ??
        existingLegalPleading.socialSecurityObjective,
      legalPleadingWritOfMandamusObjective:
        dto.json.legalPleadingWritOfMandamusObjective ??
        existingLegalPleading.legalPleadingWritOfMandamusObjective,
      legalPleadingAddress,
      analysisToolClient,
      legalPleadingResult: null,
      createdAt: existingLegalPleading.createdAt,
      createdBy: existingLegalPleading.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const legalPleadingAddressTransaction =
      legalPleadingAddress !== null &&
      dto.json.legalPleadingAddress !== undefined
        ? this.legalPleadingAddressCommandRepositoryGateway.createLegalPleadingAddress(
            legalPleadingAddress,
          )
        : null;

    const legalPleadingTransaction =
      this.legalPleadingCommandRepositoryGateway.updateLegalPleading(
        legalPleadingId,
        updatedLegalPleading,
      );

    const transactions: Array<TransactionType> = [legalPleadingTransaction];

    if (legalPleadingAddressTransaction !== null) {
      transactions.unshift(legalPleadingAddressTransaction);
    }

    const legalPleadingDocumentTransaction =
      await this.updateLegalPleadingDocuments(updatedLegalPleading, dto);

    transactions.push(...legalPleadingDocumentTransaction);

    const transactionResult =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await transactionResult.commit();

    return UpdateLegalPleadingResponseDto.build({
      legalPleadingId: updatedLegalPleading.id,
    });
  }

  private async updateLegalPleadingDocuments(
    legalPleading: LegalPleadingEntity,
    dto: UpdateLegalPleadingRequestDto,
  ): Promise<TransactionType[]> {
    const hasDocuments =
      dto.cnis !== undefined ||
      dto.ctps !== undefined ||
      dto.ruralDocument !== undefined ||
      dto.specialWorkPeriodRecognitionDocument !== undefined ||
      dto.personalDocument !== undefined ||
      dto.relevantPriorAdministrativeProceeding !== undefined ||
      dto.relatedCourtCase !== undefined ||
      dto.judicialProcesses !== undefined ||
      dto.supportingDocument !== undefined;

    if (!hasDocuments) {
      return [];
    }

    const dtoDocumentMap: Array<{
      documentKey: keyof UpdateLegalPleadingRequestDto;
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
        documentKey: 'judicialProcesses',
        documentType: LegalPleadingDocumentTypeEnum.RELATED_COURT_CASE,
      },
      {
        documentKey: 'supportingDocument',
        documentType: LegalPleadingDocumentTypeEnum.SUPPORTING_DOCUMENT,
      },
    ];

    const documentPromises = dtoDocumentMap.flatMap((dtoDocumentMapItem) => {
      const documentFiles = dto[dtoDocumentMapItem.documentKey];

      if (documentFiles === undefined) {
        return [];
      }

      const parsedDocumentFiles = Array.isArray(documentFiles)
        ? documentFiles
        : [documentFiles];

      return parsedDocumentFiles.map(async (document) => {
        if ('buffer' in document === false) {
          return null;
        }

        const uploadDocument =
          await this.fileProcessorGateway.uploadFile(document);

        const legalPleadingDocument = new LegalPleadingDocumentEntity({
          type: dtoDocumentMapItem.documentType,
          document: uploadDocument,
          legalPleading,
        });

        return this.legalPleadingDocumentCommandRepositoryGateway.createLegalPleadingDocument(
          legalPleadingDocument,
        );
      });
    });

    const documentTransactions = (await Promise.all(documentPromises)).filter(
      (transaction): transaction is TransactionType => transaction !== null,
    );

    return documentTransactions;
  }
}
