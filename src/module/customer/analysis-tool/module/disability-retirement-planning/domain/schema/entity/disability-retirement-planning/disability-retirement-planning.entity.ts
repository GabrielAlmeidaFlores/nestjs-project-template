import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { DisabilityRetirementPlanningEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity.props.interface';
import type { FederativeEntityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/enum/federative-entity.enum';

export class DisabilityRetirementPlanningEntity extends BaseEntity<DisabilityRetirementPlanningId> {
  public readonly currentPosition: string;
  public readonly federativeEntity: FederativeEntityEnum;
  public readonly state: StateCodeEnum | null;
  public readonly municipality: string | null;
  public readonly publicServiceStartDate: Date;
  public readonly careerStartDate: Date;
  public readonly analysisName: string | null;
  public readonly longTimeDisability: boolean;

  protected readonly _type = DisabilityRetirementPlanningEntity.name;

  public constructor(props: DisabilityRetirementPlanningEntityPropsInterface) {
    super(DisabilityRetirementPlanningId, props);
    this.currentPosition = props.currentPosition;
    this.federativeEntity = props.federativeEntity;
    this.state = props.state ?? null;
    this.municipality = props.municipality ?? null;
    this.publicServiceStartDate = props.publicServiceStartDate;
    this.careerStartDate = props.careerStartDate;
    this.analysisName = props.analysisName ?? null;
    this.longTimeDisability = props.longTimeDisability;
  }
}
