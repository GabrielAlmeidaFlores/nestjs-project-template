import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import type { SpecialRetirementGrantPeriodObservationId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/value-object/special-retirement-grant-period-observation-id/special-retirement-grant-period-observation-id.value-object';

export interface SpecialRetirementGrantPeriodObservationEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantPeriodObservationId> {
  observation: string;
  specialRetirementGrantPeriod: SpecialRetirementGrantPeriodEntity;
}
