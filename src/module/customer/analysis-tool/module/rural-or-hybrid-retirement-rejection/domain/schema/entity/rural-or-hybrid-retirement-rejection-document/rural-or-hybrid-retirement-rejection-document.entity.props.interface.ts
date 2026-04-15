import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { RuralOrHybridRetirementRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/enum/rural-or-hybrid-retirement-rejection-document-type.enum';
import type { RuralOrHybridRetirementRejectionDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/value-object/rural-or-hybrid-retirement-rejection-document-id.value-object';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';

export interface RuralOrHybridRetirementRejectionDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionDocumentId> {
  document?: string | null;
  type?: RuralOrHybridRetirementRejectionDocumentTypeEnum | null;
  ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;
}
