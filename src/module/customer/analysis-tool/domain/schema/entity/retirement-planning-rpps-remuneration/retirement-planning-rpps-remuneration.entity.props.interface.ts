import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import type { RetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/value-object/retirement-planning-rpps-remuneration-id.value-object';

export interface RetirementPlanningRppsRemunerationEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRppsRemunerationId> {
  remunerationDate: Date;
  remunerationAmount: DecimalValue;
  retirementPlanningRpps: RetirementPlanningRppsEntity;
}
