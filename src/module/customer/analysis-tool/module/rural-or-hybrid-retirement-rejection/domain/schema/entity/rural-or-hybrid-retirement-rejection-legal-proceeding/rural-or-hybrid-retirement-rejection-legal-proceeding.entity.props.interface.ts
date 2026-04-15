import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { RuralOrHybridRetirementRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/value-object/rural-or-hybrid-retirement-rejection-legal-proceeding-id.value-object';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';

export interface RuralOrHybridRetirementRejectionLegalProceedingEntityPropsInterface
  extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionLegalProceedingId> {
  legalProceedingNumber?: string | null;
  ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;
}
