import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionDocumentId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/value-object/special-retirement-rejection-document-id.value-object';

export interface SpecialRetirementRejectionDocumentEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionDocumentId> {
  fileName?: string | null;
  type?: string | null;
  specialRetirementRejectionId?: SpecialRetirementRejectionId | null;
}
