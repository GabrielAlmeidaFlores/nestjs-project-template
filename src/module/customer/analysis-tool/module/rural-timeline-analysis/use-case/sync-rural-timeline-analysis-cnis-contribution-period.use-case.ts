import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/command/rural-timeline-analysis-cnis-contribution-period.command.repository.gateway';
import { ListRuralTimelineAnalysisCnisContributionPeriodQueryParam } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/param/list-rural-timeline-analysis-cnis-contribution-period.query.param';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { SyncRuralTimelineAnalysisCnisContributionPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/sync-rural-timeline-analysis-cnis-contribution-period.request.dto';
import { SyncRuralTimelineAnalysisCnisContributionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/sync-rural-timeline-analysis-cnis-contribution-period.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SyncRuralTimelineAnalysisCnisContributionPeriodUseCase {
  protected readonly _type =
    SyncRuralTimelineAnalysisCnisContributionPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway,
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
    dto: SyncRuralTimelineAnalysisCnisContributionPeriodRequestDto,
  ): Promise<SyncRuralTimelineAnalysisCnisContributionPeriodResponseDto> {
    await this.validateOrganizationMember(sessionData, organizationSessionData);

    await this.validateAnalysisExists(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
    );

    await this.deleteAllExistingPeriods(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
    );

    const cnisDocumentLocation = await this.uploadCnisDocumentIfProvided(dto);

    const contributionPeriodId = await this.createNewPeriod(
      ruralTimelineAnalysisId,
      dto,
      cnisDocumentLocation,
    );

    return SyncRuralTimelineAnalysisCnisContributionPeriodResponseDto.buildFromEntity(
      contributionPeriodId,
    );
  }

  private async validateOrganizationMember(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<void> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }
  }

  private async validateAnalysisExists(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<void> {
    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralTimelineAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralTimelineAnalysisNotFoundError,
    );
  }

  private async deleteAllExistingPeriods(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<void> {
    const existingPeriods =
      await this.ruralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway.listByRuralTimelineAnalysisId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        new ListRuralTimelineAnalysisCnisContributionPeriodQueryParam({
          ruralTimelineAnalysis: ruralTimelineAnalysisId,
        }),
      );

    if (existingPeriods.resource.length === 0) {
      return;
    }

    const batchSize = 10;
    for (let i = 0; i < existingPeriods.resource.length; i += batchSize) {
      const batch = existingPeriods.resource.slice(i, i + batchSize);
      const deleteOperations = batch.map((period) =>
        this.ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway.deleteRuralTimelineAnalysisCnisContributionPeriod(
          period.id,
        ),
      );

      const deleteTransaction =
        await this.baseTransactionRepositoryGateway.execute(deleteOperations);
      await deleteTransaction.commit();
    }
  }

  private async uploadCnisDocumentIfProvided(
    dto: SyncRuralTimelineAnalysisCnisContributionPeriodRequestDto,
  ): Promise<string | null> {
    if (dto.cnisDocument === undefined) {
      return null;
    }

    const fileBuffer = dto.cnisDocument.base64.decodeToBuffer();
    const fileModel = FileModel.build({
      buffer: fileBuffer,
      originalName: dto.cnisDocument.originalFileName,
      size: fileBuffer.length,
      encoding: 'base64',
    });

    return await this.fileProcessorGateway.uploadFile(fileModel);
  }

  private async createNewPeriod(
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    dto: SyncRuralTimelineAnalysisCnisContributionPeriodRequestDto,
    cnisDocumentLocation: string | null,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodId> {
    const contributionPeriodId =
      new RuralTimelineAnalysisCnisContributionPeriodId();

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
      shouldConsiderPeriod: true,
      shouldConsiderLastRemunerationAsEndDate: false,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway.createRuralTimelineAnalysisCnisContributionPeriod(
        newEntity,
      ),
    );

    await transaction.commit();

    return contributionPeriodId;
  }
}
