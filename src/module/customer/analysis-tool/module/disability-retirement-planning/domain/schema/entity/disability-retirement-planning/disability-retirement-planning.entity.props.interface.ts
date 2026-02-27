import type { FederativeEntityEnum } from './enum/federative-entity.enum';
import type { DisabilityRetirementPlanningId } from './value-object/disability-retirement-planning-id.value-object';
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
