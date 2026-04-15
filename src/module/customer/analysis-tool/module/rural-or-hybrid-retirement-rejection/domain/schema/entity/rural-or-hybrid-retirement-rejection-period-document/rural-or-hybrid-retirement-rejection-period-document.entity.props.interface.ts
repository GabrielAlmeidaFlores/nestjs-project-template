import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { RuralOrHybridRetirementRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/value-object/rural-or-hybrid-retirement-rejection-period-document-id.value-object';
import type { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';
import type { RuralOrHybridRetirementRejectionPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/enum/rural-or-hybrid-retirement-rejection-period-document-type.enum';

export interface RuralOrHybridRetirementRejectionPeriodDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionPeriodDocumentId> {
  document?: string | null;
  type?: RuralOrHybridRetirementRejectionPeriodDocumentTypeEnum | null;
  ruralOrHybridRetirementRejectionPeriodId: RuralOrHybridRetirementRejectionPeriodId;
}
