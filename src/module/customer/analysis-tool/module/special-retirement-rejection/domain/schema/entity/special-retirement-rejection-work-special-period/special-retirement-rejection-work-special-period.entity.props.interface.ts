import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import type { SpecialRetirementRejectionWorkSpecialPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/value-object/special-retirement-rejection-work-special-period-id.value-object';

export interface SpecialRetirementRejectionWorkSpecialPeriodEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionWorkSpecialPeriodId> {
  startDate?: Date | null;
  endDate?: Date | null;
  harmfulAgents?: string[] | null;
  otherAgents?: string | null;
  companyName?: string | null;
  companyDocument?: FederalDocument | null;
  specialRetirementRejectionWorkPeriodId?: SpecialRetirementRejectionWorkPeriodId | null;
}
