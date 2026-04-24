import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentAssistanceTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/command/accident-assistance-terminated.command.repository.gateway';
import { AccidentAssistanceTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/accident-assistance-terminated.query.repository.gateway';
import { AccidentAssistanceTerminatedCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-cid/command/accident-assistance-terminated-cid.command.repository.gateway';
import { AccidentAssistanceTerminatedDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-document/command/accident-assistance-terminated-document.command.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedCidEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-cid/accident-assistance-terminated-cid.entity';
import { AccidentAssistanceTerminatedCidId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-cid/value-object/accident-assistance-terminated-cid-id/accident-assistance-terminated-cid-id.value-object';
import { AccidentAssistanceTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/accident-assistance-terminated-document.entity';
import { AccidentAssistanceTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/enum/accident-assistance-terminated-document-type.enum';
import { AccidentAssistanceTerminatedDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/value-object/accident-assistance-terminated-document-id/accident-assistance-terminated-document-id.value-object';
import { CreateAccidentAssistanceTerminatedEventRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/create-accident-assistance-terminated-event.request.dto';
import { CreateAccidentAssistanceTerminatedEventResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated-event.response.dto';
import { AccidentAssistanceTerminatedNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { FileModel } from '@shared/system/model/generic/file.model';

interface DocumentUploadResultInterface {
  entity: AccidentAssistanceTerminatedDocumentEntity;
}

@Injectable()
export class CreateAccidentAssistanceTerminatedEventUseCase {
  protected readonly _type =
    CreateAccidentAssistanceTerminatedEventUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedQueryRepositoryGateway)
    private readonly accidentAssistanceTerminatedQueryRepositoryGateway: AccidentAssistanceTerminatedQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedCommandRepositoryGateway: AccidentAssistanceTerminatedCommandRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedCidCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedCidCommandRepositoryGateway: AccidentAssistanceTerminatedCidCommandRepositoryGateway,
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
    dto: CreateAccidentAssistanceTerminatedEventRequestDto,
  ): Promise<CreateAccidentAssistanceTerminatedEventResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.accidentAssistanceTerminatedQueryRepositoryGateway.findOneAccidentAssistanceTerminatedByIdOrFail(
      accidentAssistanceTerminatedId,
      AccidentAssistanceTerminatedNotFoundError,
    );

    const documentEntities = await this.uploadDocuments(dto);

    const cidEntities = this.buildCidEntities(dto.cids);

    const updateEventContextTransaction: TransactionType =
      this.accidentAssistanceTerminatedCommandRepositoryGateway.updateAccidentAssistanceTerminatedEventContext(
        accidentAssistanceTerminatedId,
        dto.accidentDate,
        dto.accidentDescription,
        organizationMember.id,
      );

    const deleteCidsTransaction: TransactionType =
      this.accidentAssistanceTerminatedCidCommandRepositoryGateway.deleteAccidentAssistanceTerminatedCidByAccidentAssistanceTerminatedId(
        accidentAssistanceTerminatedId,
      );

    const deleteDocumentsTransaction =
      this.accidentAssistanceTerminatedDocumentCommandRepositoryGateway.deleteAccidentAssistanceTerminatedDocumentByAccidentAssistanceTerminatedId(
        accidentAssistanceTerminatedId,
      );

    const createCidTransactions: TransactionType[] = cidEntities.map((entity) =>
      this.accidentAssistanceTerminatedCidCommandRepositoryGateway.createAccidentAssistanceTerminatedCid(
        accidentAssistanceTerminatedId,
        entity,
      ),
    );

    const createDocumentTransactions: TransactionType[] = documentEntities.map(
      ({ entity }) =>
        this.accidentAssistanceTerminatedDocumentCommandRepositoryGateway.createAccidentAssistanceTerminatedDocument(
          accidentAssistanceTerminatedId,
          entity,
        ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateEventContextTransaction,
      deleteCidsTransaction,
      deleteDocumentsTransaction,
      ...createCidTransactions,
      ...createDocumentTransactions,
    ]);

    await transaction.commit();

    return CreateAccidentAssistanceTerminatedEventResponseDto.build({
      accidentAssistanceTerminatedId,
    });
  }

  private buildCidEntities(
    cids: string[],
  ): AccidentAssistanceTerminatedCidEntity[] {
    return cids.map(
      (name) =>
        new AccidentAssistanceTerminatedCidEntity({
          id: new AccidentAssistanceTerminatedCidId(),
          name,
        }),
    );
  }

  private async uploadDocuments(
    dto: CreateAccidentAssistanceTerminatedEventRequestDto,
  ): Promise<DocumentUploadResultInterface[]> {
    const allDocuments: Array<{
      file: Base64FileRequestDto;
      type: AccidentAssistanceTerminatedDocumentTypeEnum;
    }> = [
      ...dto.medicalDocuments.map((file) => ({
        file,
        type: AccidentAssistanceTerminatedDocumentTypeEnum.AVAILABLE_MEDICAL_DOCUMENTS,
      })),
      ...(dto.previousMedicalReports ?? []).map((file) => ({
        file,
        type: AccidentAssistanceTerminatedDocumentTypeEnum.PRIOR_INSS_JUDICIAL_MEDICAL_OPINION,
      })),
      ...(dto.administrativeProcessDocuments ?? []).map((file) => ({
        file,
        type: AccidentAssistanceTerminatedDocumentTypeEnum.PRIOR_DISABILITY_ADMINISTRATIVE_PROCEDURE,
      })),
    ];

    return Promise.all(
      allDocuments.map(async ({ file, type }) => {
        const buffer = file.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentUrl =
          await this.fileProcessorGateway.uploadFile(fileModel);

        const entity = new AccidentAssistanceTerminatedDocumentEntity({
          id: new AccidentAssistanceTerminatedDocumentId(),
          document: documentUrl,
          type,
        });

        return { entity };
      }),
    );
  }
}
