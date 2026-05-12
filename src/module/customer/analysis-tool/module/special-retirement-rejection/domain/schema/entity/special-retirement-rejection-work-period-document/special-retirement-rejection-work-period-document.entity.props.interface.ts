import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import type { SpecialRetirementRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/value-object/special-retirement-rejection-work-period-document-id.value-object';

export interface SpecialRetirementRejectionWorkPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionWorkPeriodDocumentId> {
  fileName?: string | null;
  type?: string | null;
  specialRetirementRejectionWorkPeriodId?: SpecialRetirementRejectionWorkPeriodId | null;
}
