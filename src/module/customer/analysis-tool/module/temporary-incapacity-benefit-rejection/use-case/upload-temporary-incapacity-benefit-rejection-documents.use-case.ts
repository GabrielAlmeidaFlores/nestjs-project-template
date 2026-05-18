import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryIncapacityBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/temporary-incapacity-benefit-rejection.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-document/command/temporary-incapacity-benefit-rejection-document.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/enum/temporary-incapacity-benefit-rejection-document-type.enum';
import { TemporaryIncapacityBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/temporary-incapacity-benefit-rejection-document.entity';
import { TemporaryIncapacityBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/value-object/temporary-incapacity-benefit-rejection-document-id.value-object';
import { UploadTemporaryIncapacityBenefitRejectionDocumentsRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/upload-temporary-incapacity-benefit-rejection-documents.request.dto';
import { UploadTemporaryIncapacityBenefitRejectionDocumentsResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/upload-temporary-incapacity-benefit-rejection-documents.response.dto';
import { TemporaryIncapacityBenefitRejectionAdministrativeProcedureNotPresentError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-administrative-procedure-not-present.error';
import { TemporaryIncapacityBenefitRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-cnis-document-not-found.error';
import { TemporaryIncapacityBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadTemporaryIncapacityBenefitRejectionDocumentsUseCase {
  protected readonly _type =
    UploadTemporaryIncapacityBenefitRejectionDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionQueryRepositoryGateway: TemporaryIncapacityBenefitRejectionQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionDocumentCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionDocumentCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    dto: UploadTemporaryIncapacityBenefitRejectionDocumentsRequestDto,
  ): Promise<UploadTemporaryIncapacityBenefitRejectionDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    this.validateDocuments(dto);

    await this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations(
      temporaryIncapacityBenefitRejectionId,
      TemporaryIncapacityBenefitRejectionNotFoundError,
    );

    const deleteExistingTransaction =
      this.temporaryIncapacityBenefitRejectionDocumentCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitRejectionId(
        temporaryIncapacityBenefitRejectionId,
      );

    const documentEntities = await this.buildDocumentEntities(
      temporaryIncapacityBenefitRejectionId,
      dto,
    );

    const createDocumentTransactions = documentEntities.map((entity) =>
      this.temporaryIncapacityBenefitRejectionDocumentCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionDocument(
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteExistingTransaction,
      ...createDocumentTransactions,
    ]);

    await transaction.commit();

    return UploadTemporaryIncapacityBenefitRejectionDocumentsResponseDto.build({
      temporaryIncapacityBenefitRejectionId,
    });
  }

  private validateDocuments(
    dto: UploadTemporaryIncapacityBenefitRejectionDocumentsRequestDto,
  ): void {
    const isCnisPresent = dto.documents.some(
      (document) =>
        document.type ===
        TemporaryIncapacityBenefitRejectionDocumentTypeEnum.CNIS,
    );

    if (!isCnisPresent) {
      throw new TemporaryIncapacityBenefitRejectionCnisDocumentNotFoundError();
    }

    const isAdministrativeProcedurePresent = dto.documents.some(
      (document) =>
        document.type ===
        TemporaryIncapacityBenefitRejectionDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
    );

    if (!isAdministrativeProcedurePresent) {
      throw new TemporaryIncapacityBenefitRejectionAdministrativeProcedureNotPresentError();
    }
  }

  private async buildDocumentEntities(
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    dto: UploadTemporaryIncapacityBenefitRejectionDocumentsRequestDto,
  ): Promise<TemporaryIncapacityBenefitRejectionDocumentEntity[]> {
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

        return new TemporaryIncapacityBenefitRejectionDocumentEntity({
          id: new TemporaryIncapacityBenefitRejectionDocumentId(),
          fileName: documentUrl,
          type: documentDto.type,
          temporaryIncapacityBenefitRejectionId,
        });
      }),
    );
  }
}
