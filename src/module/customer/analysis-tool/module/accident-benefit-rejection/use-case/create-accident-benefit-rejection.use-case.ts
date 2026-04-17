import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/command/accident-benefit-rejection.command.repository.gateway';
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
import { CreateAccidentBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/request/create-accident-benefit-rejection.request.dto';
import { CreateAccidentBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/create-accident-benefit-rejection.response.dto';
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
export class CreateAccidentBenefitRejectionUseCase {
  protected readonly _type = CreateAccidentBenefitRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
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
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateAccidentBenefitRejectionRequestDto,
  ): Promise<CreateAccidentBenefitRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const accidentBenefitRejectionId = new AccidentBenefitRejectionId();

    const accidentBenefitRejection = new AccidentBenefitRejectionEntity({
      id: accidentBenefitRejectionId,
      analysisName: dto.analysisName ?? null,
      requirementStartDate: dto.requirementStartDate ?? null,
      rejectionDate: dto.rejectionDate ?? null,
      category: dto.category ?? null,
      mainAccidentBenefitRejectionReason:
        dto.mainAccidentBenefitRejectionReason ?? null,
      otherAccidentBenefitRejectionReason:
        dto.otherAccidentBenefitRejectionReason ?? null,
      hasPreviousGrantRelated: dto.hasPreviousGrantRelated ?? null,
      previousGrantBenefitNumber: dto.previousGrantBenefitNumber ?? null,
      previousGrantStartDate: dto.previousGrantStartDate ?? null,
      previousGrantTerminationDate: dto.previousGrantTerminationDate ?? null,
      requestToExtendTemporaryDisabilityBenefit:
        dto.requestToExtendTemporaryDisabilityBenefit ?? null,
      accidentBenefitRejectionResultId: null,
    });

    const documentsToPersist = await this.buildDocumentEntities(
      accidentBenefitRejectionId,
      dto,
    );

    const inssBenefitEntities = this.buildInssBenefitEntities(
      accidentBenefitRejectionId,
      dto,
    );

    const eventsToPersist = await this.buildEventEntities(
      accidentBenefitRejectionId,
      dto,
    );

    const transactions: TransactionType[] = [
      this.accidentBenefitRejectionCommandRepositoryGateway.createAccidentBenefitRejection(
        accidentBenefitRejection,
      ),
      ...documentsToPersist.map(({ entity }) =>
        this.accidentBenefitRejectionDocumentCommandRepositoryGateway.createAccidentBenefitRejectionDocument(
          entity,
        ),
      ),
      ...inssBenefitEntities.map((entity) =>
        this.accidentBenefitRejectionInssBenefitCommandRepositoryGateway.createAccidentBenefitRejectionInssBenefit(
          entity,
        ),
      ),
      ...eventsToPersist.flatMap(({ entity, documents }) => [
        this.accidentBenefitRejectionEventCommandRepositoryGateway.createAccidentBenefitRejectionEvent(
          entity,
        ),
        ...documents.map(({ entity: docEntity }) =>
          this.accidentBenefitRejectionEventDocumentCommandRepositoryGateway.createAccidentBenefitRejectionEventDocument(
            docEntity,
          ),
        ),
      ]),
    ];

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.ACCIDENT_BENEFIT_REJECTION,
      status: AnalysisStatusEnum.IN_PROGRESS,
      analysisToolClient,
      accidentBenefitRejection,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    transactions.push(
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateAccidentBenefitRejectionResponseDto.build({
      accidentBenefitRejectionId,
    });
  }

  private async buildDocumentEntities(
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    dto: CreateAccidentBenefitRejectionRequestDto,
  ): Promise<DocumentToPersistInterface[]> {
    if (!dto.documents || dto.documents.length === 0) {
      return [];
    }

    return Promise.all(
      dto.documents.map(async (docDto) => {
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
    dto: CreateAccidentBenefitRejectionRequestDto,
  ): AccidentBenefitRejectionInssBenefitEntity[] {
    if (!dto.inssBenefits || dto.inssBenefits.length === 0) {
      return [];
    }

    return dto.inssBenefits.map(
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
    dto: CreateAccidentBenefitRejectionRequestDto,
  ): Promise<EventToPersistInterface[]> {
    if (!dto.events || dto.events.length === 0) {
      return [];
    }

    return Promise.all(
      dto.events.map(async (eventDto) => {
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
