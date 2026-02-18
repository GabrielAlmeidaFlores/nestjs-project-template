import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/command/rural-timeline-analysis-document.command.repository.gateway';
import { RuralTimelineAnalysisDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/query/rural-timeline-analysis-document.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/rural-timeline-analysis-document.entity';
import { RuralTimelineAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/value-object/rural-timeline-analysis-document-id/rural-timeline-analysis-document-id.value-object';
import { UpdateRuralTimelineAnalysisDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-document.request.dto';
import { UpdateRuralTimelineAnalysisDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-document.response.dto';
import { RuralTimelineAnalysisDocumentNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-document-not-found.error';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralTimelineAnalysisDocumentUseCase {
  protected readonly _type = UpdateRuralTimelineAnalysisDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisDocumentQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisDocumentQueryRepositoryGateway: RuralTimelineAnalysisDocumentQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisDocumentCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisDocumentCommandRepositoryGateway: RuralTimelineAnalysisDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    documentId: RuralTimelineAnalysisDocumentId,
    dto: UpdateRuralTimelineAnalysisDocumentRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralTimelineAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralTimelineAnalysisNotFoundError,
    );

    const existingDocument =
      await this.ruralTimelineAnalysisDocumentQueryRepositoryGateway.findOneById(
        documentId,
      );

    if (existingDocument === null) {
      throw new RuralTimelineAnalysisDocumentNotFoundError();
    }

    if (
      existingDocument.ruralTimelineId.toString() !==
      ruralTimelineAnalysisId.toString()
    ) {
      throw new RuralTimelineAnalysisDocumentNotFoundError();
    }

    let documentLocation: string = existingDocument.document;

    if (dto.document !== undefined) {
      const fileBuffer = dto.document.base64.decodeToBuffer();
      const fileModel = FileModel.build({
        buffer: fileBuffer,
        originalName: dto.document.originalFileName,
        size: fileBuffer.length,
        encoding: 'base64',
      });

      documentLocation = await this.fileProcessorGateway.uploadFile(
        fileModel,
        existingDocument.document,
      );
    }

    const updatedEntity = new RuralTimelineAnalysisDocumentEntity({
      id: documentId,
      ruralTimelineId: existingDocument.ruralTimelineId,
      type: dto.type ?? existingDocument.type,
      document: documentLocation,
      createdAt: existingDocument.createdAt,
      updatedAt: existingDocument.updatedAt,
      deletedAt: existingDocument.deletedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisDocumentCommandRepositoryGateway.updateRuralTimelineAnalysisDocument(
        updatedEntity,
      ),
    );

    await transaction.commit();

    return UpdateRuralTimelineAnalysisDocumentResponseDto.build({
      ruralTimelineAnalysisDocumentId: updatedEntity.id,
    });
  }
}
