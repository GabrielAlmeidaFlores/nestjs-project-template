import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-document/command/rural-timeline-analysis-period-document.command.repository.gateway';
import { RuralTimelineAnalysisPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-document/query/rural-timeline-analysis-period-document.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.entity';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';
import { UpdateRuralTimelineAnalysisPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-period-document.request.dto';
import { UpdateRuralTimelineAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-period-document.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineAnalysisPeriodDocumentNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-document-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralTimelineAnalysisPeriodDocumentUseCase {
  protected readonly _type =
    UpdateRuralTimelineAnalysisPeriodDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodDocumentQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodDocumentQueryRepositoryGateway: RuralTimelineAnalysisPeriodDocumentQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodDocumentCommandRepositoryGateway: RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    periodId: RuralTimelineAnalysisPeriodId,
    documentId: RuralTimelineAnalysisPeriodDocumentId,
    dto: UpdateRuralTimelineAnalysisPeriodDocumentRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisPeriodDocumentResponseDto> {
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
      await this.ruralTimelineAnalysisPeriodDocumentQueryRepositoryGateway.findOneById(
        documentId,
      );

    if (existingDocument === null) {
      throw new RuralTimelineAnalysisPeriodDocumentNotFoundError();
    }

    if (
      existingDocument.ruralTimelinePeriodId.toString() !== periodId.toString()
    ) {
      throw new RuralTimelineAnalysisPeriodDocumentNotFoundError();
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

    const updatedEntity = new RuralTimelineAnalysisPeriodDocumentEntity({
      id: documentId,
      ruralTimelinePeriodId: existingDocument.ruralTimelinePeriodId,
      documentYear: dto.documentYear ?? existingDocument.documentYear,
      documentHolderType:
        dto.documentHolderType ?? existingDocument.documentHolderType,
      selfOwned: dto.selfOwned ?? existingDocument.selfOwned,
      probatoryPurpose:
        dto.probatoryPurpose ?? existingDocument.probatoryPurpose,
      type: dto.type ?? existingDocument.type,
      document: documentLocation,
      analyzedAt:
        dto.document !== undefined ? null : existingDocument.analyzedAt,
      createdAt: existingDocument.createdAt,
      updatedAt: existingDocument.updatedAt,
      deletedAt: existingDocument.deletedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisPeriodDocumentCommandRepositoryGateway.updateRuralTimelineAnalysisPeriodDocument(
        updatedEntity,
      ),
    );

    await transaction.commit();

    return UpdateRuralTimelineAnalysisPeriodDocumentResponseDto.build({
      ruralTimelineAnalysisPeriodDocumentId: updatedEntity.id,
    });
  }
}
