import type { RuralTimelineAnalysisPeriodFamilyGroupMemberEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.entity';
import type { RuralTimelineAnalysisPeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/value-object/rural-timeline-analysis-period-family-group-member-id/rural-timeline-analysis-period-family-group-member-id.value-object';

export abstract class RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisPeriodFamilyGroupMemberId,
  ): Promise<RuralTimelineAnalysisPeriodFamilyGroupMemberEntity | null>;
}
