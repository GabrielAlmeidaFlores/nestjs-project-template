import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryIncapacityBenefitTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/temporary-incapacity-benefit-termination.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-document/command/temporary-incapacity-benefit-termination-document.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/enum/temporary-incapacity-benefit-termination-document-type.enum';
import { TemporaryIncapacityBenefitTerminationDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/temporary-incapacity-benefit-termination-document.entity';
import { TemporaryIncapacityBenefitTerminationDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/value-object/temporary-incapacity-benefit-termination-document-id.value-object';
import { UploadTemporaryIncapacityBenefitTerminationDocumentsRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/upload-temporary-incapacity-benefit-termination-documents.request.dto';
import { UploadTemporaryIncapacityBenefitTerminationDocumentsResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/upload-temporary-incapacity-benefit-termination-documents.response.dto';
import { TemporaryIncapacityBenefitTerminationAdministrativeProcedureNotPresentError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-administrative-procedure-not-present.error';
import { TemporaryIncapacityBenefitTerminationCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-cnis-document-not-found.error';
import { TemporaryIncapacityBenefitTerminationNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadTemporaryIncapacityBenefitTerminationDocumentsUseCase {
  protected readonly _type =
    UploadTemporaryIncapacityBenefitTerminationDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitTerminationQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationQueryRepositoryGateway: TemporaryIncapacityBenefitTerminationQueryRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitTerminationDocumentCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitTerminationDocumentCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    dto: UploadTemporaryIncapacityBenefitTerminationDocumentsRequestDto,
  ): Promise<UploadTemporaryIncapacityBenefitTerminationDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    this.validateDocuments(dto);

    await this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
      temporaryIncapacityBenefitTerminationId,
      TemporaryIncapacityBenefitTerminationNotFoundError,
    );

    const deleteExistingTransaction =
      this.temporaryIncapacityBenefitTerminationDocumentCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitTerminationId(
        temporaryIncapacityBenefitTerminationId,
      );

    const documentEntities = await this.buildDocumentEntities(
      temporaryIncapacityBenefitTerminationId,
      dto,
    );

    const createDocumentTransactions = documentEntities.map((entity) =>
      this.temporaryIncapacityBenefitTerminationDocumentCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationDocument(
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteExistingTransaction,
      ...createDocumentTransactions,
    ]);

    await transaction.commit();

    return UploadTemporaryIncapacityBenefitTerminationDocumentsResponseDto.build(
      {
        temporaryIncapacityBenefitTerminationId,
      },
    );
  }

  private validateDocuments(
    dto: UploadTemporaryIncapacityBenefitTerminationDocumentsRequestDto,
  ): void {
    const isCnisPresent = dto.documents.some(
      (document) =>
        document.type ===
        TemporaryIncapacityBenefitTerminationDocumentTypeEnum.CNIS,
    );

    if (!isCnisPresent) {
      throw new TemporaryIncapacityBenefitTerminationCnisDocumentNotFoundError();
    }

    const isAdministrativeProcedurePresent = dto.documents.some(
      (document) =>
        document.type ===
        TemporaryIncapacityBenefitTerminationDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
    );

    if (!isAdministrativeProcedurePresent) {
      throw new TemporaryIncapacityBenefitTerminationAdministrativeProcedureNotPresentError();
    }
  }

  private async buildDocumentEntities(
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    dto: UploadTemporaryIncapacityBenefitTerminationDocumentsRequestDto,
  ): Promise<TemporaryIncapacityBenefitTerminationDocumentEntity[]> {
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

        return new TemporaryIncapacityBenefitTerminationDocumentEntity({
          id: new TemporaryIncapacityBenefitTerminationDocumentId(),
          fileName: documentUrl,
          type: documentDto.type,
          temporaryIncapacityBenefitTerminationId,
        });
      }),
    );
  }
}
