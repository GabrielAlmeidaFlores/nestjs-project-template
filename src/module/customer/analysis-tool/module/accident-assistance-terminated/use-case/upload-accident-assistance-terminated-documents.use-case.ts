import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentAssistanceTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/accident-assistance-terminated.query.repository.gateway';
import { AccidentAssistanceTerminatedDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-document/command/accident-assistance-terminated-document.command.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/accident-assistance-terminated-document.entity';
import { AccidentAssistanceTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/enum/accident-assistance-terminated-document-type.enum';
import { AccidentAssistanceTerminatedDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/value-object/accident-assistance-terminated-document-id/accident-assistance-terminated-document-id.value-object';
import { UploadAccidentAssistanceTerminatedDocumentsRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/upload-accident-assistance-terminated-documents.request.dto';
import { UploadAccidentAssistanceTerminatedDocumentsResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/upload-accident-assistance-terminated-documents.response.dto';
import { AccidentAssistanceTerminatedDocumentRequiredError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-document-required.error';
import { AccidentAssistanceTerminatedDocumentTypeNotAllowedError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-document-type-not-allowed.error';
import { AccidentAssistanceTerminatedNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadAccidentAssistanceTerminatedDocumentsUseCase {
  protected readonly _type =
    UploadAccidentAssistanceTerminatedDocumentsUseCase.name;

  private readonly allowedDocumentTypes = [
    AccidentAssistanceTerminatedDocumentTypeEnum.DENIED_ADMINISTRATIVE_PROCEDURE,
    AccidentAssistanceTerminatedDocumentTypeEnum.CNIS,
    AccidentAssistanceTerminatedDocumentTypeEnum.SUSPENSION_CESSATION_ADMINISTRATIVE_PROCEDURE,
    AccidentAssistanceTerminatedDocumentTypeEnum.MEDICAL_REPORTS,
  ];

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedQueryRepositoryGateway)
    private readonly accidentAssistanceTerminatedQueryRepositoryGateway: AccidentAssistanceTerminatedQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedDocumentCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedDocumentCommandRepositoryGateway: AccidentAssistanceTerminatedDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    dto: UploadAccidentAssistanceTerminatedDocumentsRequestDto,
  ): Promise<UploadAccidentAssistanceTerminatedDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const hasDisallowedType = dto.documents.some(
      (doc) => !this.allowedDocumentTypes.includes(doc.type),
    );

    if (hasDisallowedType) {
      throw new AccidentAssistanceTerminatedDocumentTypeNotAllowedError();
    }

    const isCnisPresent = dto.documents.some(
      (doc) => doc.type === AccidentAssistanceTerminatedDocumentTypeEnum.CNIS,
    );

    if (!isCnisPresent) {
      throw new AccidentAssistanceTerminatedDocumentRequiredError();
    }

    await this.accidentAssistanceTerminatedQueryRepositoryGateway.findOneAccidentAssistanceTerminatedByIdOrFail(
      accidentAssistanceTerminatedId,
      AccidentAssistanceTerminatedNotFoundError,
    );

    const documentEntities = await this.buildDocumentEntities(dto);

    const deleteExistingTransaction =
      this.accidentAssistanceTerminatedDocumentCommandRepositoryGateway.deleteAccidentAssistanceTerminatedDocumentByAccidentAssistanceTerminatedId(
        accidentAssistanceTerminatedId,
      );

    const createDocumentTransactions = documentEntities.map((entity) =>
      this.accidentAssistanceTerminatedDocumentCommandRepositoryGateway.createAccidentAssistanceTerminatedDocument(
        accidentAssistanceTerminatedId,
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteExistingTransaction,
      ...createDocumentTransactions,
    ]);

    await transaction.commit();

    return UploadAccidentAssistanceTerminatedDocumentsResponseDto.build({
      accidentAssistanceTerminatedId,
    });
  }

  private async buildDocumentEntities(
    dto: UploadAccidentAssistanceTerminatedDocumentsRequestDto,
  ): Promise<AccidentAssistanceTerminatedDocumentEntity[]> {
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

        return new AccidentAssistanceTerminatedDocumentEntity({
          id: new AccidentAssistanceTerminatedDocumentId(),
          document: documentUrl,
          type: documentDto.type,
        });
      }),
    );
  }
}
