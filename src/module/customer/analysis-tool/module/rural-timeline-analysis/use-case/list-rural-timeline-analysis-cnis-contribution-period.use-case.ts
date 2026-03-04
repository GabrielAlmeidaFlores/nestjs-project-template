import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { ListRuralTimelineAnalysisCnisContributionPeriodQueryParam } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/param/list-rural-timeline-analysis-cnis-contribution-period.query.param';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import {
  GetRuralTimelineAnalysisCnisContributionPeriodLateContributionResponseDto,
  GetRuralTimelineAnalysisCnisContributionPeriodResponseDto,
  GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto,
  GetRuralTimelineAnalysisPeriodPendingExitDateResponseDto,
} from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/get-rural-timeline-analysis-cnis-contribution-period.response.dto';
import { ListRuralTimelineAnalysisCnisContributionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/list-rural-timeline-analysis-cnis-contribution-period.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListRuralTimelineAnalysisCnisContributionPeriodUseCase {
  protected readonly _type =
    ListRuralTimelineAnalysisCnisContributionPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    pagination: ListDataInputModel,
  ): Promise<ListRuralTimelineAnalysisCnisContributionPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const listParam =
      new ListRuralTimelineAnalysisCnisContributionPeriodQueryParam({
        ...pagination,
        ruralTimelineAnalysis: ruralTimelineAnalysisId,
      });

    const listQueryResult =
      await this.ruralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway.listByRuralTimelineAnalysisId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        listParam,
      );

    const resource = listQueryResult.resource.map(async (item) => {
      const underMinimumPeriods =
        item.ruralTimelineCnisContributionPeriodUnderMinimum.map((underMin) =>
          GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto.build(
            {
              contributionDate: underMin.contributionDate,
              contributionAmount: underMin.contributionAmount,
            },
          ),
        );

      const pendingExitDates =
        item.ruralTimelineCnisContributionPeriodPendingExitDate.map(
          (pendingExit) =>
            GetRuralTimelineAnalysisPeriodPendingExitDateResponseDto.build({
              pendingDate: pendingExit.pendingDate,
              pendingAmount: pendingExit.pendingAmount,
            }),
        );

      const lateContributions =
        item.ruralTimelineCnisContributionPeriodOverdueContribution.map((overdue) =>
          GetRuralTimelineAnalysisCnisContributionPeriodLateContributionResponseDto.build({
            competence: overdue.overdueDate.toISOString(),
            ...(overdue.paymentDate !== null && {
              paymentDate: overdue.paymentDate.toISOString(),
            }),
          }),
        );

      let cnisDocumentUrl: string | undefined;
      let cnisDocumentOriginalFileName: string | undefined;

      if (item.cnisDocument !== null) {
        cnisDocumentUrl = (
          await this.fileProcessorGateway.getFileSignedUrl(item.cnisDocument)
        ).toString();
        cnisDocumentOriginalFileName =
          await this.fileProcessorGateway.getOriginalFileName(
            item.cnisDocument,
          );
      }

      return GetRuralTimelineAnalysisCnisContributionPeriodResponseDto.build({
        id: item.id,
        ...(item.sequencial !== null && { sequencial: item.sequencial }),
        ...(item.employmentRelationshipSource !== null && {
          employmentRelationshipSource: item.employmentRelationshipSource,
        }),
        ...(item.startDate !== null && { startDate: item.startDate }),
        ...(item.endDate !== null && { endDate: item.endDate }),
        ...(item.category !== null && { category: item.category }),
        ...(item.qualifyingPeriod !== null && {
          qualifyingPeriod: item.qualifyingPeriod,
        }),
        ...(item.status !== null && { status: item.status }),
        ...(item.averageContributionAmount !== null && {
          averageContributionAmount: item.averageContributionAmount,
        }),
        contributionAdjustmentIntent: item.contributionAdjustmentIntent,
        externalSupplementationIntent: item.externalSupplementationIntent,
        ...(cnisDocumentUrl !== undefined && { cnisDocumentUrl }),
        ...(cnisDocumentOriginalFileName !== undefined && {
          cnisDocumentOriginalFileName,
        }),
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        ...(underMinimumPeriods.length > 0 && { underMinimumPeriods }),
        ...(pendingExitDates.length > 0 && { pendingExitDates }),
        ...(lateContributions.length > 0 && { lateContributions }),
      });
    });

    const resolvedResource = await Promise.all(resource);

    return ListRuralTimelineAnalysisCnisContributionPeriodResponseDto.build({
      ...listQueryResult,
      resource: resolvedResource,
    });
  }
}
