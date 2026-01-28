import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';
import type { RuralTimelinePeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/enum/rural-timeline-period-family-group-member-kinship-type.enum';
import type { RuralTimelinePeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/value-object/rural-timeline-period-family-group-member-id/rural-timeline-period-family-group-member-id.value-object';

export interface RuralTimelinePeriodFamilyGroupMemberEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelinePeriodFamilyGroupMemberId> {
  name: string;
  federalDocument: string;
  kinship: RuralTimelinePeriodFamilyGroupMemberKinshipTypeEnum;
  receivesRuralBenefit: boolean;
  benefitNumber: string;
  cnisDocument?: string | null;
  ruralTimelinePeriodId: RuralTimelinePeriodId;
}
