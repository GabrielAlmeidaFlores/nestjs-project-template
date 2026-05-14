import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPermanentDisabilityRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/retirement-permanent-disability-rejection.query.repository.gateway';
import { RetirementPermanentDisabilityRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-document/command/retirement-permanent-disability-rejection-document.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/enum/retirement-permanent-disability-rejection-document-type.enum';
import { RetirementPermanentDisabilityRejectionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/retirement-permanent-disability-rejection-document.entity';
import { RetirementPermanentDisabilityRejectionDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/value-object/retirement-permanent-disability-rejection-document-id/retirement-permanent-disability-rejection-document-id.value-object';
import { UploadRetirementPermanentDisabilityRejectionDocumentsRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/upload-retirement-permanent-disability-rejection-documents.request.dto';
import { UploadRetirementPermanentDisabilityRejectionDocumentsResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/upload-retirement-permanent-disability-rejection-documents.response.dto';
import { RetirementPermanentDisabilityRejectionAdministrativeProcedureDenialNotPresentError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-administrative-procedure-denial-not-present.error';
import { RetirementPermanentDisabilityRejectionCnisNotPresentError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-cnis-not-present.error';
import { RetirementPermanentDisabilityRejectionDocumentInvalidError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-document-invalid.error';
import { RetirementPermanentDisabilityRejectionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadRetirementPermanentDisabilityRejectionDocumentsUseCase {
  protected readonly _type =
    UploadRetirementPermanentDisabilityRejectionDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionQueryRepositoryGateway: RetirementPermanentDisabilityRejectionQueryRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionDocumentCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionDocumentCommandRepositoryGateway: RetirementPermanentDisabilityRejectionDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    dto: UploadRetirementPermanentDisabilityRejectionDocumentsRequestDto,
  ): Promise<UploadRetirementPermanentDisabilityRejectionDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    if (dto.documents.length === 0) {
      throw new RetirementPermanentDisabilityRejectionDocumentInvalidError();
    }

    const isCnisPresent = dto.documents.some(
      (document) =>
        document.type ===
        RetirementPermanentDisabilityRejectionDocumentTypeEnum.CNIS,
    );

    if (!isCnisPresent) {
      throw new RetirementPermanentDisabilityRejectionCnisNotPresentError();
    }

    const isAdministrativeProcedureDenialPresent = dto.documents.some(
      (document) =>
        document.type ===
        RetirementPermanentDisabilityRejectionDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE_DENIAL,
    );

    if (!isAdministrativeProcedureDenialPresent) {
      throw new RetirementPermanentDisabilityRejectionAdministrativeProcedureDenialNotPresentError();
    }

    await this.retirementPermanentDisabilityRejectionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations(
      retirementPermanentDisabilityRejectionId,
      RetirementPermanentDisabilityRejectionNotFoundError,
    );

    const deleteExistingTransaction =
      this.retirementPermanentDisabilityRejectionDocumentCommandRepositoryGateway.deleteAllRetirementPermanentDisabilityRejectionDocumentsByRetirementPermanentDisabilityRejectionId(
        retirementPermanentDisabilityRejectionId,
      );

    const documentEntities = await this.buildDocumentEntities(
      retirementPermanentDisabilityRejectionId,
      dto,
    );

    const createDocumentTransactions = documentEntities.map((entity) =>
      this.retirementPermanentDisabilityRejectionDocumentCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionDocument(
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteExistingTransaction,
      ...createDocumentTransactions,
    ]);

    await transaction.commit();

    return UploadRetirementPermanentDisabilityRejectionDocumentsResponseDto.build(
      {
        retirementPermanentDisabilityRejectionId,
      },
    );
  }

  private async buildDocumentEntities(
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    dto: UploadRetirementPermanentDisabilityRejectionDocumentsRequestDto,
  ): Promise<RetirementPermanentDisabilityRejectionDocumentEntity[]> {
    return Promise.all(
      dto.documents.map(async (documentDto) => {
        const buffer = documentDto.file.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: documentDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentUrl =
          await this.fileProcessorGateway.uploadFile(fileModel);

        return new RetirementPermanentDisabilityRejectionDocumentEntity({
          id: new RetirementPermanentDisabilityRejectionDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          retirementPermanentDisabilityRejectionId,
        });
      }),
    );
  }
}
