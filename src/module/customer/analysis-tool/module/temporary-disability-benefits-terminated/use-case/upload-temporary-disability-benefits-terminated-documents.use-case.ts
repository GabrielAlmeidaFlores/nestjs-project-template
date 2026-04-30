import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-document/command/temporary-disability-benefits-terminated-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/enum/temporary-disability-benefits-terminated-document-type.enum';
import { TemporaryDisabilityBenefitsTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/temporary-disability-benefits-terminated-document.entity';
import { TemporaryDisabilityBenefitsTerminatedDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/value-object/temporary-disability-benefits-terminated-document-id.value-object';
import { UploadTemporaryDisabilityBenefitsTerminatedDocumentsRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/upload-temporary-disability-benefits-terminated-documents.request.dto';
import { UploadTemporaryDisabilityBenefitsTerminatedDocumentsResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/upload-temporary-disability-benefits-terminated-documents.response.dto';
import { TemporaryDisabilityBenefitsTerminatedAdministrativeProcedureNotPresentError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-administrative-procedure-not-present.error';
import { TemporaryDisabilityBenefitsTerminatedCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-cnis-document-not-found.error';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadTemporaryDisabilityBenefitsTerminatedDocumentsUseCase {
  protected readonly _type =
    UploadTemporaryDisabilityBenefitsTerminatedDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway: TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedDocumentCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedDocumentCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    dto: UploadTemporaryDisabilityBenefitsTerminatedDocumentsRequestDto,
  ): Promise<UploadTemporaryDisabilityBenefitsTerminatedDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    this.validateDocuments(dto);

    await this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
      temporaryDisabilityBenefitsTerminatedId,
      TemporaryDisabilityBenefitsTerminatedNotFoundError,
    );

    const deleteExistingTransaction =
      this.temporaryDisabilityBenefitsTerminatedDocumentCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsTerminatedId(
        temporaryDisabilityBenefitsTerminatedId,
      );

    const documentEntities = await this.buildDocumentEntities(
      temporaryDisabilityBenefitsTerminatedId,
      dto,
    );

    const createDocumentTransactions = documentEntities.map((entity) =>
      this.temporaryDisabilityBenefitsTerminatedDocumentCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedDocument(
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteExistingTransaction,
      ...createDocumentTransactions,
    ]);

    await transaction.commit();

    return UploadTemporaryDisabilityBenefitsTerminatedDocumentsResponseDto.build(
      {
        temporaryDisabilityBenefitsTerminatedId,
      },
    );
  }

  private validateDocuments(
    dto: UploadTemporaryDisabilityBenefitsTerminatedDocumentsRequestDto,
  ): void {
    const isCnisPresent = dto.documents.some(
      (document) =>
        document.type ===
        TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum.CNIS,
    );

    if (!isCnisPresent) {
      throw new TemporaryDisabilityBenefitsTerminatedCnisDocumentNotFoundError();
    }

    const isAdministrativeProcedurePresent = dto.documents.some(
      (document) =>
        document.type ===
        TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE_DENIED,
    );

    if (!isAdministrativeProcedurePresent) {
      throw new TemporaryDisabilityBenefitsTerminatedAdministrativeProcedureNotPresentError();
    }
  }

  private async buildDocumentEntities(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    dto: UploadTemporaryDisabilityBenefitsTerminatedDocumentsRequestDto,
  ): Promise<TemporaryDisabilityBenefitsTerminatedDocumentEntity[]> {
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

        return new TemporaryDisabilityBenefitsTerminatedDocumentEntity({
          id: new TemporaryDisabilityBenefitsTerminatedDocumentId(),
          fileName: documentUrl,
          type: documentDto.type,
          temporaryDisabilityBenefitsTerminatedId,
        });
      }),
    );
  }
}
