import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/command/rural-timeline-cnis-contribution-period-document.command.repository.gateway';
import { RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/query/rural-timeline-cnis-contribution-period-document.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineCnisContributionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.entity';
import { RuralTimelineCnisContributionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/value-object/rural-timeline-cnis-contribution-period-document-id/rural-timeline-cnis-contribution-period-document-id.value-object';
import { UpdateRuralTimelineCnisContributionPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-cnis-contribution-period-document.request.dto';
import { UpdateRuralTimelineCnisContributionPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-cnis-contribution-period-document.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineCnisContributionPeriodDocumentNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-cnis-contribution-period-document-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralTimelineCnisContributionPeriodDocumentUseCase {
  protected readonly _type =
    UpdateRuralTimelineCnisContributionPeriodDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway)
    private readonly ruralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway: RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway,
    @Inject(RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway)
    private readonly ruralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway: RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    documentId: RuralTimelineCnisContributionPeriodDocumentId,
    dto: UpdateRuralTimelineCnisContributionPeriodDocumentRequestDto,
  ): Promise<UpdateRuralTimelineCnisContributionPeriodDocumentResponseDto> {
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
      await this.ruralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway.findOneRuralTimelineCnisContributionPeriodDocumentById(
        documentId,
      );

    if (existingDocument === null) {
      throw new RuralTimelineCnisContributionPeriodDocumentNotFoundError();
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

    const updatedEntity = new RuralTimelineCnisContributionPeriodDocumentEntity(
      {
        id: documentId,
        ruralTimelineCnisContributionPeriodId:
          existingDocument.ruralTimelineCnisContributionPeriodId,
        type: dto.type ?? existingDocument.type,
        document: documentLocation,
        createdAt: existingDocument.createdAt,
        updatedAt: existingDocument.updatedAt,
        deletedAt: existingDocument.deletedAt,
      },
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway.updateRuralTimelineCnisContributionPeriodDocument(
        updatedEntity,
      ),
    );

    await transaction.commit();

    return UpdateRuralTimelineCnisContributionPeriodDocumentResponseDto.build({
      ruralTimelineCnisContributionPeriodDocumentId: updatedEntity.id,
    });
  }
}
