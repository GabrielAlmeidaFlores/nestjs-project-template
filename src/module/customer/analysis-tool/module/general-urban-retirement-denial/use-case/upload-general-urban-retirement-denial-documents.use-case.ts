import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-document/command/general-urban-retirement-denial-document.command.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';
import { GeneralUrbanRetirementDenialDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/general-urban-retirement-denial-document.entity';
import { GeneralUrbanRetirementDenialDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/value-object/general-urban-retirement-denial-document-id/general-urban-retirement-denial-document-id.value-object';
import { UploadGeneralUrbanRetirementDenialDocumentsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/upload-general-urban-retirement-denial-documents.request.dto';
import { UploadGeneralUrbanRetirementDenialDocumentsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/upload-general-urban-retirement-denial-documents.response.dto';
import { GeneralUrbanRetirementDenialAdministrativeProcedureNotPresentError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-administrative-procedure-not-present.error';
import { GeneralUrbanRetirementDenialCnisNotPresentError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-cnis-not-present.error';
import { GeneralUrbanRetirementDenialDocumentInvalidError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-document-invalid.error';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadGeneralUrbanRetirementDenialDocumentsUseCase {
  protected readonly _type =
    UploadGeneralUrbanRetirementDenialDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialQueryRepositoryGateway: GeneralUrbanRetirementDenialQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialDocumentCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialDocumentCommandRepositoryGateway: GeneralUrbanRetirementDenialDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    dto: UploadGeneralUrbanRetirementDenialDocumentsRequestDto,
  ): Promise<UploadGeneralUrbanRetirementDenialDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    if (dto.documents.length === 0) {
      throw new GeneralUrbanRetirementDenialDocumentInvalidError();
    }

    const isCnisPresent = dto.documents.some(
      (document) =>
        document.type === GeneralUrbanRetirementDenialDocumentTypeEnum.CNIS,
    );

    if (!isCnisPresent) {
      throw new GeneralUrbanRetirementDenialCnisNotPresentError();
    }

    const isAdministrativeProcedurePresent = dto.documents.some(
      (document) =>
        document.type ===
        GeneralUrbanRetirementDenialDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
    );

    if (!isAdministrativeProcedurePresent) {
      throw new GeneralUrbanRetirementDenialAdministrativeProcedureNotPresentError();
    }

    await this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
      generalUrbanRetirementDenialId,
      GeneralUrbanRetirementDenialNotFoundError,
    );

    const deleteExistingTransaction =
      this.generalUrbanRetirementDenialDocumentCommandRepositoryGateway.deleteAllByGeneralUrbanRetirementDenialId(
        generalUrbanRetirementDenialId,
      );

    const documentEntities = await this.buildDocumentEntities(
      generalUrbanRetirementDenialId,
      dto,
    );

    const createDocumentTransactions = documentEntities.map((entity) =>
      this.generalUrbanRetirementDenialDocumentCommandRepositoryGateway.createGeneralUrbanRetirementDenialDocument(
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteExistingTransaction,
      ...createDocumentTransactions,
    ]);

    await transaction.commit();

    return UploadGeneralUrbanRetirementDenialDocumentsResponseDto.build({
      generalUrbanRetirementDenialId,
    });
  }

  private async buildDocumentEntities(
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    dto: UploadGeneralUrbanRetirementDenialDocumentsRequestDto,
  ): Promise<GeneralUrbanRetirementDenialDocumentEntity[]> {
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

        return new GeneralUrbanRetirementDenialDocumentEntity({
          id: new GeneralUrbanRetirementDenialDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          generalUrbanRetirementDenialId,
        });
      }),
    );
  }
}
