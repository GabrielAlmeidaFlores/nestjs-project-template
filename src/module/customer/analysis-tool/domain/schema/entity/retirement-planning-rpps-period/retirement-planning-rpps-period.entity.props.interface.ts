import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import type { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import type { RetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/value-object/retirement-planning-rpps-period-id.value-object';

export interface RetirementPlanningRppsPeriodEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRppsPeriodId> {
  startDate: Date;
  endDate: Date;
  jobPosition: string;
  career: string;
  serviceType: RetirementPlanningPeriodServiceTypeEnum;
  department: string;
  retirementPlanningRpps: RetirementPlanningRppsEntity;
}
