import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-document/command/permanent-incapacity-benefit-terminated-document.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/enum/permanent-incapacity-benefit-terminated-document-type.enum';
import { PermanentIncapacityBenefitTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/permanent-incapacity-benefit-terminated-document.entity';
import { PermanentIncapacityBenefitTerminatedDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/value-object/permanent-incapacity-benefit-terminated-document-id.value-object';
import { UploadPermanentIncapacityBenefitTerminatedDocumentsRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/upload-permanent-incapacity-benefit-terminated-documents.request.dto';
import { UploadPermanentIncapacityBenefitTerminatedDocumentsResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/upload-permanent-incapacity-benefit-terminated-documents.response.dto';
import { PermanentIncapacityBenefitTerminatedAdministrativeProcedureNotPresentError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-administrative-procedure-not-present.error';
import { PermanentIncapacityBenefitTerminatedCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-cnis-document-not-found.error';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadPermanentIncapacityBenefitTerminatedDocumentsUseCase {
  protected readonly _type =
    UploadPermanentIncapacityBenefitTerminatedDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedQueryRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedQueryRepositoryGateway: PermanentIncapacityBenefitTerminatedQueryRepositoryGateway,
    @Inject(
      PermanentIncapacityBenefitTerminatedDocumentCommandRepositoryGateway,
    )
    private readonly permanentIncapacityBenefitTerminatedDocumentCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    dto: UploadPermanentIncapacityBenefitTerminatedDocumentsRequestDto,
  ): Promise<UploadPermanentIncapacityBenefitTerminatedDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    this.validateDocuments(dto);

    await this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
      permanentIncapacityBenefitTerminatedId,
      PermanentIncapacityBenefitTerminatedNotFoundError,
    );

    const deleteExistingTransaction =
      this.permanentIncapacityBenefitTerminatedDocumentCommandRepositoryGateway.deleteAllByPermanentIncapacityBenefitTerminatedId(
        permanentIncapacityBenefitTerminatedId,
      );

    const documentEntities = await this.buildDocumentEntities(
      permanentIncapacityBenefitTerminatedId,
      dto,
    );

    const createDocumentTransactions = documentEntities.map((entity) =>
      this.permanentIncapacityBenefitTerminatedDocumentCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedDocument(
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteExistingTransaction,
      ...createDocumentTransactions,
    ]);

    await transaction.commit();

    return UploadPermanentIncapacityBenefitTerminatedDocumentsResponseDto.build(
      {
        permanentIncapacityBenefitTerminatedId,
      },
    );
  }

  private validateDocuments(
    dto: UploadPermanentIncapacityBenefitTerminatedDocumentsRequestDto,
  ): void {
    const isCnisPresent = dto.documents.some(
      (document) =>
        document.type ===
        PermanentIncapacityBenefitTerminatedDocumentTypeEnum.CNIS,
    );

    if (!isCnisPresent) {
      throw new PermanentIncapacityBenefitTerminatedCnisDocumentNotFoundError();
    }

    const isAdministrativeProcedurePresent = dto.documents.some(
      (document) =>
        document.type ===
        PermanentIncapacityBenefitTerminatedDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
    );

    if (!isAdministrativeProcedurePresent) {
      throw new PermanentIncapacityBenefitTerminatedAdministrativeProcedureNotPresentError();
    }
  }

  private async buildDocumentEntities(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    dto: UploadPermanentIncapacityBenefitTerminatedDocumentsRequestDto,
  ): Promise<PermanentIncapacityBenefitTerminatedDocumentEntity[]> {
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

        return new PermanentIncapacityBenefitTerminatedDocumentEntity({
          id: new PermanentIncapacityBenefitTerminatedDocumentId(),
          fileName: documentUrl,
          type: documentDto.type,
          permanentIncapacityBenefitTerminatedId,
        });
      }),
    );
  }
}
