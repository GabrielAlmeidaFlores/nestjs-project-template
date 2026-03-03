import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/command/rural-timeline-analysis-cnis-contribution-period.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-cnis-contribution-period.request.dto';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-cnis-contribution-period.response.dto';
import { RuralTimelineAnalysisCnisContributionPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-cnis-contribution-period-not-found.error';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralTimelineAnalysisCnisContributionPeriodUseCase {
  protected readonly _type =
    UpdateRuralTimelineAnalysisCnisContributionPeriodUseCase.name;

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
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
    dto: UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisCnisContributionPeriodResponseDto> {
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

    const existingContributionPeriod =
      await this.ruralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway.findOneById(
        contributionPeriodId,
      );

    if (existingContributionPeriod === null) {
      throw new RuralTimelineAnalysisCnisContributionPeriodNotFoundError();
    }

    if (
      existingContributionPeriod.ruralTimelineId === null ||
      existingContributionPeriod.ruralTimelineId.toString() !==
        ruralTimelineAnalysisId.toString()
    ) {
      throw new RuralTimelineAnalysisCnisContributionPeriodNotFoundError();
    }

    const cnisDocumentLocation = await this.resolveCnisDocumentLocation(
      dto,
      existingContributionPeriod.cnisDocument ?? null,
    );

    const updatedEntity = new RuralTimelineAnalysisCnisContributionPeriodEntity(
      {
        id: contributionPeriodId,
        ruralTimelineId: existingContributionPeriod.ruralTimelineId,
        employmentRelationshipSource:
          dto.employmentRelationshipSource ??
          existingContributionPeriod.employmentRelationshipSource,
        startDate: dto.startDate ?? existingContributionPeriod.startDate,
        endDate: dto.endDate ?? existingContributionPeriod.endDate,
        category: dto.category ?? existingContributionPeriod.category,
        qualifyingPeriod:
          dto.qualifyingPeriod ?? existingContributionPeriod.qualifyingPeriod,
        status: dto.status ?? existingContributionPeriod.status,
        averageContributionAmount:
          dto.averageContributionAmount ??
          existingContributionPeriod.averageContributionAmount,
        contributionAdjustmentIntent:
          dto.contributionAdjustmentIntent ??
          existingContributionPeriod.contributionAdjustmentIntent,
        externalSupplementationIntent:
          dto.externalSupplementationIntent ??
          existingContributionPeriod.externalSupplementationIntent,
        shouldConsiderPeriod:
          dto.shouldConsiderPeriod ??
          existingContributionPeriod.shouldConsiderPeriod,
        shouldConsiderLastRemunerationAsExitDate:
          dto.shouldConsiderLastRemunerationAsExitDate ??
          existingContributionPeriod.shouldConsiderLastRemunerationAsExitDate,
        cnisDocument: cnisDocumentLocation,
        impactAnalysis: existingContributionPeriod.impactAnalysis,
        createdAt: existingContributionPeriod.createdAt,
        updatedAt: existingContributionPeriod.updatedAt,
        deletedAt: existingContributionPeriod.deletedAt,
      },
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway.updateRuralTimelineAnalysisCnisContributionPeriod(
        updatedEntity,
      ),
    );

    await transaction.commit();

    return UpdateRuralTimelineAnalysisCnisContributionPeriodResponseDto.build({
      ruralTimelineAnalysisCnisContributionPeriodId: updatedEntity.id,
    });
  }

  private async resolveCnisDocumentLocation(
    dto: UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto,
    existingCnisDocument: string | null,
  ): Promise<string | null> {
    if (dto.cnisDocument === undefined) {
      return existingCnisDocument;
    }

    const fileBuffer = dto.cnisDocument.base64.decodeToBuffer();
    const fileModel = FileModel.build({
      buffer: fileBuffer,
      originalName: dto.cnisDocument.originalFileName,
      size: fileBuffer.length,
      encoding: 'base64',
    });

    return await this.fileProcessorGateway.uploadFile(
      fileModel,
      existingCnisDocument ?? undefined,
    );
  }
}
