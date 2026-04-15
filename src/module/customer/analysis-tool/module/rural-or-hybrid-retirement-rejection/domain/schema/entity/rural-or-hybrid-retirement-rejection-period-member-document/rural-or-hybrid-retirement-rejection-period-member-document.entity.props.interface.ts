import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { RuralOrHybridRetirementRejectionPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/value-object/rural-or-hybrid-retirement-rejection-period-member-document-id.value-object';
import type { RuralOrHybridRetirementRejectionPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/value-object/rural-or-hybrid-retirement-rejection-period-member-id.value-object';
import type { RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/enum/rural-or-hybrid-retirement-rejection-period-member-document-type.enum';

export interface RuralOrHybridRetirementRejectionPeriodMemberDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionPeriodMemberDocumentId> {
  document?: string | null;
  type?: RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeEnum | null;
  ruralOrHybridRetirementRejectionPeriodMemberId: RuralOrHybridRetirementRejectionPeriodMemberId;
}
