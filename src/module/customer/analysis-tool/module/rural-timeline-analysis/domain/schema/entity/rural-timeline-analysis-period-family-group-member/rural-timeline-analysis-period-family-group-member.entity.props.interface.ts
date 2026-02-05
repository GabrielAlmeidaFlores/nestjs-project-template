import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import type { RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/enum/rural-timeline-analysis-period-family-group-member-kinship-type.enum';
import type { RuralTimelineAnalysisPeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/value-object/rural-timeline-analysis-period-family-group-member-id/rural-timeline-analysis-period-family-group-member-id.value-object';

export interface RuralTimelineAnalysisPeriodFamilyGroupMemberEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisPeriodFamilyGroupMemberId> {
  name: string;
  federalDocument: string;
  kinship: RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum;
  receivesRuralBenefit: boolean;
  benefitNumber: string;
  cnisDocument?: string | null;
  ruralTimelinePeriodId: RuralTimelineAnalysisPeriodId;
}
