import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/command/rural-timeline-analysis-cnis-contribution-period.command.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { CreateRuralTimelineAnalysisCnisContributionPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis-cnis-contribution-period.request.dto';
import { CreateRuralTimelineAnalysisCnisContributionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/create-rural-timeline-analysis-cnis-contribution-period.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateRuralTimelineAnalysisCnisContributionPeriodUseCase {
  protected readonly _type =
    CreateRuralTimelineAnalysisCnisContributionPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    dto: CreateRuralTimelineAnalysisCnisContributionPeriodRequestDto,
  ): Promise<CreateRuralTimelineAnalysisCnisContributionPeriodResponseDto> {
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

    let cnisDocumentLocation: string | null = null;

    if (dto.cnisDocument !== undefined) {
      const fileBuffer = dto.cnisDocument.base64.decodeToBuffer();
      const fileModel = FileModel.build({
        buffer: fileBuffer,
        originalName: dto.cnisDocument.originalFileName,
        size: fileBuffer.length,
        encoding: 'base64',
      });

      cnisDocumentLocation =
        await this.fileProcessorGateway.uploadFile(fileModel);
    }

    const contributionPeriodId =
      new RuralTimelineAnalysisCnisContributionPeriodId(new Guid());

    const newEntity = new RuralTimelineAnalysisCnisContributionPeriodEntity({
      id: contributionPeriodId,
      ruralTimelineId: ruralTimelineAnalysisId,
      employmentRelationshipSource: dto.employmentRelationshipSource ?? null,
      startDate: dto.startDate ?? null,
      endDate: dto.endDate ?? null,
      category: dto.category ?? null,
      qualifyingPeriod: dto.qualifyingPeriod ?? null,
      status: dto.status ?? null,
      averageContributionAmount: dto.averageContributionAmount ?? null,
      contributionAdjustmentIntent: dto.contributionAdjustmentIntent,
      externalSupplementationIntent: dto.externalSupplementationIntent,
      cnisDocument: cnisDocumentLocation,
    });

    await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway.createRuralTimelineAnalysisCnisContributionPeriod(
        newEntity,
      ),
    );

    return CreateRuralTimelineAnalysisCnisContributionPeriodResponseDto.buildFromEntity(
      contributionPeriodId,
    );
  }
}
