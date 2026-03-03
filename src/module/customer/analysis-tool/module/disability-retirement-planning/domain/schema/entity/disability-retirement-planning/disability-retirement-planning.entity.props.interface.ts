import type { FederativeEntityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/enum/federative-entity.enum';
import type { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';

export interface DisabilityRetirementPlanningEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningId> {
  currentPosition: string;
  federativeEntity: FederativeEntityEnum;
  state?: StateCodeEnum | null;
  municipality?: string | null;
  publicServiceStartDate: Date;
  careerStartDate: Date;
  analysisName?: string | null;
  longTimeDisability: boolean;
}
