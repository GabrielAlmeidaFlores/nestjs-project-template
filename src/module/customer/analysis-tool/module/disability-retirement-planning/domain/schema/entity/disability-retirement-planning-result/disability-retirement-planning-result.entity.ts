import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { DisabilityRetirementPlanningResultId } from './value-object/disability-retirement-planning-result-id.value-object';

import type { DisabilityRetirementPlanningResultEntityPropsInterface } from './disability-retirement-planning-result.entity.props.interface';
import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';

export class DisabilityRetirementPlanningResultEntity extends BaseEntity<DisabilityRetirementPlanningResultId> {
  protected readonly _type = DisabilityRetirementPlanningResultEntity.name;

  public readonly disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  public readonly disabilityRetirementPlanningCompleteAnalysis: string | null;
  public readonly disabilityRetirementPlanningSimplifiedAnalysis: string | null;
  public readonly disabilityRetirementPlanningCompleteAnalysisDownload:
    | string
    | null;

  public constructor(
    props: DisabilityRetirementPlanningResultEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningResultId, props);
    this.disabilityRetirementPlanning = props.disabilityRetirementPlanning;
    this.disabilityRetirementPlanningCompleteAnalysis =
      props.disabilityRetirementPlanningCompleteAnalysis ?? null;
    this.disabilityRetirementPlanningSimplifiedAnalysis =
      props.disabilityRetirementPlanningSimplifiedAnalysis ?? null;
    this.disabilityRetirementPlanningCompleteAnalysisDownload =
      props.disabilityRetirementPlanningCompleteAnalysisDownload ?? null;
  }
}
