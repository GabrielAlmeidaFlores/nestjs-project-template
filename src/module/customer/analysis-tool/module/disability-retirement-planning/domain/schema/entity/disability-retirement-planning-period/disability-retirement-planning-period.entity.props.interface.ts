import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import type { DisabilityRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/value-object/disability-retirement-planning-period-id.value-object';

export interface DisabilityRetirementPlanningPeriodEntityPropsInterface
  extends BaseEntityPropsInterface<DisabilityRetirementPlanningPeriodId> {
  disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  startDate: Date;
  endDate?: Date | null;
  jobPosition: string;
  careerName: string;
  serviceType: RetirementPlanningPeriodServiceTypeEnum;
  department: string;
}
