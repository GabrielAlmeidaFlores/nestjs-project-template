import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/disability-retirement-planning-rejection.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-document/command/disability-retirement-planning-rejection-document.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/disability-retirement-planning-rejection-document.entity';
import { DisabilityRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/enum/disability-retirement-planning-rejection-document-type.enum';
import { DisabilityRetirementPlanningRejectionDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/value-object/disability-retirement-planning-rejection-document-id/disability-retirement-planning-rejection-document-id.value-object';
import { UploadDisabilityRetirementPlanningRejectionDocumentsRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/upload-disability-retirement-planning-rejection-documents.request.dto';
import { UploadDisabilityRetirementPlanningRejectionDocumentsResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/upload-disability-retirement-planning-rejection-documents.response.dto';
import { DisabilityRetirementPlanningRejectionAdministrativeProcedureNotPresentError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-administrative-procedure-not-present.error';
import { DisabilityRetirementPlanningRejectionCnisNotPresentError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-cnis-not-present.error';
import { DisabilityRetirementPlanningRejectionDocumentInvalidError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-document-invalid.error';
import { DisabilityRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadDisabilityRetirementPlanningRejectionDocumentsUseCase {
  protected readonly _type =
    UploadDisabilityRetirementPlanningRejectionDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionQueryRepositoryGateway: DisabilityRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningRejectionDocumentCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningRejectionDocumentCommandRepositoryGateway: DisabilityRetirementPlanningRejectionDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    dto: UploadDisabilityRetirementPlanningRejectionDocumentsRequestDto,
  ): Promise<UploadDisabilityRetirementPlanningRejectionDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    if (dto.documents.length === 0) {
      throw new DisabilityRetirementPlanningRejectionDocumentInvalidError();
    }

    const isCnisPresent = dto.documents.some(
      (document) =>
        document.type ===
        DisabilityRetirementPlanningRejectionDocumentTypeEnum.CNIS,
    );

    if (!isCnisPresent) {
      throw new DisabilityRetirementPlanningRejectionCnisNotPresentError();
    }

    const isAdministrativeProcedurePresent = dto.documents.some(
      (document) =>
        document.type ===
        DisabilityRetirementPlanningRejectionDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
    );

    if (!isAdministrativeProcedurePresent) {
      throw new DisabilityRetirementPlanningRejectionAdministrativeProcedureNotPresentError();
    }

    await this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
      disabilityRetirementPlanningRejectionId,
      DisabilityRetirementPlanningRejectionNotFoundError,
    );

    const deleteExistingTransaction =
      this.disabilityRetirementPlanningRejectionDocumentCommandRepositoryGateway.deleteAllByDisabilityRetirementPlanningRejectionId(
        disabilityRetirementPlanningRejectionId,
      );

    const documentEntities = await this.buildDocumentEntities(
      disabilityRetirementPlanningRejectionId,
      dto,
    );

    const createDocumentTransactions = documentEntities.map((entity) =>
      this.disabilityRetirementPlanningRejectionDocumentCommandRepositoryGateway.createDisabilityRetirementPlanningRejectionDocument(
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteExistingTransaction,
      ...createDocumentTransactions,
    ]);

    await transaction.commit();

    return UploadDisabilityRetirementPlanningRejectionDocumentsResponseDto.build(
      {
        disabilityRetirementPlanningRejectionId,
      },
    );
  }

  private async buildDocumentEntities(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    dto: UploadDisabilityRetirementPlanningRejectionDocumentsRequestDto,
  ): Promise<DisabilityRetirementPlanningRejectionDocumentEntity[]> {
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

        return new DisabilityRetirementPlanningRejectionDocumentEntity({
          id: new DisabilityRetirementPlanningRejectionDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          disabilityRetirementPlanningRejectionId,
        });
      }),
    );
  }
}
