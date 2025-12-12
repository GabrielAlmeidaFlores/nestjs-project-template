import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import type { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';

export interface RetirementPlanningRgpsEntityPropsInterface
  extends BaseEntityPropsInterface<RetirementPlanningRgpsId> {
  cnisDocument?: string | null;
  retirementPlanningRgpsResult?: RetirementPlanningRgpsResultEntity | null;
}
