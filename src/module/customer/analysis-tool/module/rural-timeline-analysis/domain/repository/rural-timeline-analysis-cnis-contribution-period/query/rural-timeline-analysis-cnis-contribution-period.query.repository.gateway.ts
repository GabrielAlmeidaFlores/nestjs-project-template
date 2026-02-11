import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListRuralTimelineAnalysisCnisContributionPeriodQueryParam } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/param/list-rural-timeline-analysis-cnis-contribution-period.query.param';
import type { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisCnisContributionPeriodId,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodEntity | null>;

  public abstract listByRuralTimelineAnalysisId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListRuralTimelineAnalysisCnisContributionPeriodQueryParam,
  ): Promise<
    ListDataOutputModel<RuralTimelineAnalysisCnisContributionPeriodTypeormEntity>
  >;
}
