import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/value-object/rural-or-hybrid-retirement-analysis-period-member-id.value-object';
import type { RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/enum/rural-or-hybrid-retirement-analysis-period-member-document-type.enum';
import type { RuralOrHybridRetirementAnalysisPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/value-object/rural-or-hybrid-retirement-analysis-period-member-document-id.value-object';

export interface RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisPeriodMemberDocumentId> {
  document?: string | null;
  type?: RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeEnum | null;
  ruralOrHybridRetirementAnalysisPeriodMemberId: RuralOrHybridRetirementAnalysisPeriodMemberId;
}
