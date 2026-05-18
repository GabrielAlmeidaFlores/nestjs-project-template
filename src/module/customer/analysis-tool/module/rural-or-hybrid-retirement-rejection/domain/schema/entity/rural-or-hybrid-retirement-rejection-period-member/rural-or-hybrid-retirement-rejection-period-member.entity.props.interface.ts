import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';
import type { RuralOrHybridRetirementRejectionKinshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/enum/rural-or-hybrid-retirement-rejection-kinship.enum';
import type { RuralOrHybridRetirementRejectionPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/value-object/rural-or-hybrid-retirement-rejection-period-member-id.value-object';

export interface RuralOrHybridRetirementRejectionPeriodMemberEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionPeriodMemberId> {
  name?: string | null;
  federalDocument?: string | null;
  kinship?: RuralOrHybridRetirementRejectionKinshipEnum | null;
  hasReceivedRuralBenefit?: boolean | null;
  benefitNumber?: string | null;
  ruralOrHybridRetirementRejectionPeriodId: RuralOrHybridRetirementRejectionPeriodId;
}
