import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/command/accident-benefit-rejection.command.repository.gateway';
import { AccidentBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/query/accident-benefit-rejection.query.repository.gateway';
import { AccidentBenefitRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-document/command/accident-benefit-rejection-document.command.repository.gateway';
import { AccidentBenefitRejectionEventCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-event/command/accident-benefit-rejection-event.command.repository.gateway';
import { AccidentBenefitRejectionEventDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-event-document/command/accident-benefit-rejection-event-document.command.repository.gateway';
import { AccidentBenefitRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-inss-benefit/command/accident-benefit-rejection-inss-benefit.command.repository.gateway';
import { AccidentBenefitRejectionEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/accident-benefit-rejection.entity';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/accident-benefit-rejection-document.entity';
import { AccidentBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/value-object/accident-benefit-rejection-document-id.value-object';
import { AccidentBenefitRejectionEventEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/accident-benefit-rejection-event.entity';
import { AccidentBenefitRejectionEventId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/value-object/accident-benefit-rejection-event-id.value-object';
import { AccidentBenefitRejectionEventDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/accident-benefit-rejection-event-document.entity';
import { AccidentBenefitRejectionEventDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/value-object/accident-benefit-rejection-event-document-id.value-object';
import { AccidentBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/accident-benefit-rejection-inss-benefit.entity';
import { AccidentBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/value-object/accident-benefit-rejection-inss-benefit-id.value-object';
import { UpdateAccidentBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/request/update-accident-benefit-rejection.request.dto';
import { UpdateAccidentBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/update-accident-benefit-rejection.response.dto';
import { AccidentBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/accident-benefit-rejection/error/accident-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

interface DocumentToPersistInterface {
  entity: AccidentBenefitRejectionDocumentEntity;
}

interface EventDocumentToPersistInterface {
  entity: AccidentBenefitRejectionEventDocumentEntity;
}

interface EventToPersistInterface {
  entity: AccidentBenefitRejectionEventEntity;
  documents: EventDocumentToPersistInterface[];
}

@Injectable()
export class UpdateAccidentBenefitRejectionUseCase {
  protected readonly _type = UpdateAccidentBenefitRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AccidentBenefitRejectionQueryRepositoryGateway)
    private readonly accidentBenefitRejectionQueryRepositoryGateway: AccidentBenefitRejectionQueryRepositoryGateway,
    @Inject(AccidentBenefitRejectionCommandRepositoryGateway)
    private readonly accidentBenefitRejectionCommandRepositoryGateway: AccidentBenefitRejectionCommandRepositoryGateway,
    @Inject(AccidentBenefitRejectionDocumentCommandRepositoryGateway)
    private readonly accidentBenefitRejectionDocumentCommandRepositoryGateway: AccidentBenefitRejectionDocumentCommandRepositoryGateway,
    @Inject(AccidentBenefitRejectionEventCommandRepositoryGateway)
    private readonly accidentBenefitRejectionEventCommandRepositoryGateway: AccidentBenefitRejectionEventCommandRepositoryGateway,
    @Inject(AccidentBenefitRejectionEventDocumentCommandRepositoryGateway)
    private readonly accidentBenefitRejectionEventDocumentCommandRepositoryGateway: AccidentBenefitRejectionEventDocumentCommandRepositoryGateway,
    @Inject(AccidentBenefitRejectionInssBenefitCommandRepositoryGateway)
    private readonly accidentBenefitRejectionInssBenefitCommandRepositoryGateway: AccidentBenefitRejectionInssBenefitCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    dto: UpdateAccidentBenefitRejectionRequestDto,
  ): Promise<UpdateAccidentBenefitRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingRejection =
      await this.accidentBenefitRejectionQueryRepositoryGateway.findOneByAccidentBenefitRejectionIdOrFailWithRelations(
        accidentBenefitRejectionId,
        AccidentBenefitRejectionNotFoundError,
      );

    const updatedRejection = new AccidentBenefitRejectionEntity({
      id: accidentBenefitRejectionId,
      analysisName: dto.analysisName ?? existingRejection.analysisName,
      requirementStartDate:
        dto.requirementStartDate ?? existingRejection.requirementStartDate,
      rejectionDate: dto.rejectionDate ?? existingRejection.rejectionDate,
      category: dto.category ?? existingRejection.category,
      mainAccidentBenefitRejectionReason:
        dto.mainAccidentBenefitRejectionReason ??
        existingRejection.mainAccidentBenefitRejectionReason,
      otherAccidentBenefitRejectionReason:
        dto.otherAccidentBenefitRejectionReason ??
        existingRejection.otherAccidentBenefitRejectionReason,
      hasPreviousGrantRelated:
        dto.hasPreviousGrantRelated ??
        existingRejection.hasPreviousGrantRelated,
      previousGrantBenefitNumber:
        dto.previousGrantBenefitNumber ??
        existingRejection.previousGrantBenefitNumber,
      previousGrantStartDate:
        dto.previousGrantStartDate ?? existingRejection.previousGrantStartDate,
      previousGrantTerminationDate:
        dto.previousGrantTerminationDate ??
        existingRejection.previousGrantTerminationDate,
      requestToExtendTemporaryDisabilityBenefit:
        dto.requestToExtendTemporaryDisabilityBenefit ??
        existingRejection.requestToExtendTemporaryDisabilityBenefit,
      accidentBenefitRejectionResultId:
        existingRejection.accidentBenefitRejectionResult?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.accidentBenefitRejectionCommandRepositoryGateway.updateAccidentBenefitRejection(
        accidentBenefitRejectionId,
        updatedRejection,
      ),
    ];

    const documentsToPersist: DocumentToPersistInterface[] = [];
    if (dto.documents !== undefined) {
      transactions.push(
        this.accidentBenefitRejectionDocumentCommandRepositoryGateway.deleteAllAccidentBenefitRejectionDocumentByAccidentBenefitRejectionId(
          accidentBenefitRejectionId,
        ),
      );

      if (dto.documents.length > 0) {
        const newDocs = await this.buildDocumentEntities(
          accidentBenefitRejectionId,
          dto.documents,
        );
        documentsToPersist.push(...newDocs);
        transactions.push(
          ...newDocs.map(({ entity }) =>
            this.accidentBenefitRejectionDocumentCommandRepositoryGateway.createAccidentBenefitRejectionDocument(
              entity,
            ),
          ),
        );
      }
    }

    if (dto.inssBenefits !== undefined) {
      transactions.push(
        this.accidentBenefitRejectionInssBenefitCommandRepositoryGateway.deleteAllAccidentBenefitRejectionInssBenefitByAccidentBenefitRejectionId(
          accidentBenefitRejectionId,
        ),
      );

      if (dto.inssBenefits.length > 0) {
        const inssBenefitEntities = this.buildInssBenefitEntities(
          accidentBenefitRejectionId,
          dto.inssBenefits,
        );
        transactions.push(
          ...inssBenefitEntities.map((entity) =>
            this.accidentBenefitRejectionInssBenefitCommandRepositoryGateway.createAccidentBenefitRejectionInssBenefit(
              entity,
            ),
          ),
        );
      }
    }

    const eventsToPersist: EventToPersistInterface[] = [];
    if (dto.events !== undefined) {
      transactions.push(
        this.accidentBenefitRejectionEventCommandRepositoryGateway.deleteAllAccidentBenefitRejectionEventByAccidentBenefitRejectionId(
          accidentBenefitRejectionId,
        ),
      );

      if (dto.events.length > 0) {
        const newEvents = await this.buildEventEntities(
          accidentBenefitRejectionId,
          dto.events,
        );
        eventsToPersist.push(...newEvents);
        transactions.push(
          ...newEvents.flatMap(({ entity, documents }) => [
            this.accidentBenefitRejectionEventCommandRepositoryGateway.createAccidentBenefitRejectionEvent(
              entity,
            ),
            ...documents.map(({ entity: docEntity }) =>
              this.accidentBenefitRejectionEventDocumentCommandRepositoryGateway.createAccidentBenefitRejectionEventDocument(
                docEntity,
              ),
            ),
          ]),
        );
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateAccidentBenefitRejectionResponseDto.build({
      accidentBenefitRejectionId,
    });
  }

  private async buildDocumentEntities(
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    documents: NonNullable<
      UpdateAccidentBenefitRejectionRequestDto['documents']
    >,
  ): Promise<DocumentToPersistInterface[]> {
    return Promise.all(
      documents.map(async (docDto) => {
        const buffer = docDto.file.base64.decodeToBuffer();
        const file = FileModel.build({
          buffer,
          originalName: docDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });
        const fileName = await this.fileProcessorGateway.uploadFile(file);

        const entity = new AccidentBenefitRejectionDocumentEntity({
          id: new AccidentBenefitRejectionDocumentId(),
          document: fileName,
          type: docDto.type,
          accidentBenefitRejectionId,
        });

        return { entity };
      }),
    );
  }

  private buildInssBenefitEntities(
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    inssBenefits: string[],
  ): AccidentBenefitRejectionInssBenefitEntity[] {
    return inssBenefits.map(
      (inssBenefit) =>
        new AccidentBenefitRejectionInssBenefitEntity({
          id: new AccidentBenefitRejectionInssBenefitId(),
          inssBenefit,
          accidentBenefitRejectionId,
        }),
    );
  }

  private async buildEventEntities(
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    events: NonNullable<UpdateAccidentBenefitRejectionRequestDto['events']>,
  ): Promise<EventToPersistInterface[]> {
    return Promise.all(
      events.map(async (eventDto) => {
        const eventId = new AccidentBenefitRejectionEventId();

        const eventEntity = new AccidentBenefitRejectionEventEntity({
          id: eventId,
          accidentDate: eventDto.accidentDate ?? null,
          accidentDescription: eventDto.accidentDescription ?? null,
          cidTenId: eventDto.cidTenId ?? null,
          accidentBenefitRejectionId,
        });

        const documents: EventDocumentToPersistInterface[] = await Promise.all(
          (eventDto.eventDocuments ?? []).map(async (docDto) => {
            const buffer = docDto.file.base64.decodeToBuffer();
            const file = FileModel.build({
              buffer,
              originalName: docDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });
            const fileName = await this.fileProcessorGateway.uploadFile(file);

            const docEntity = new AccidentBenefitRejectionEventDocumentEntity({
              id: new AccidentBenefitRejectionEventDocumentId(),
              document: fileName,
              type: docDto.type,
              accidentBenefitRejectionEventId: eventId,
            });

            return { entity: docEntity };
          }),
        );

        return { entity: eventEntity, documents };
      }),
    );
  }
}
