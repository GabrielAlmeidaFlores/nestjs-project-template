import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';
import type { RuralOrHybridRetirementAnalysisKinshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/enum/rural-or-hybrid-retirement-analysis-kinship.enum';
import type { RuralOrHybridRetirementAnalysisPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/value-object/rural-or-hybrid-retirement-analysis-period-member-id.value-object';

export interface RuralOrHybridRetirementAnalysisPeriodMemberEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisPeriodMemberId> {
  name?: string | null;
  federalDocument?: string | null;
  kinship?: RuralOrHybridRetirementAnalysisKinshipEnum | null;
  hasReceivedRuralBenefit?: boolean | null;
  benefitNumber?: string | null;
  ruralOrHybridRetirementAnalysisPeriodId: RuralOrHybridRetirementAnalysisPeriodId;
}
