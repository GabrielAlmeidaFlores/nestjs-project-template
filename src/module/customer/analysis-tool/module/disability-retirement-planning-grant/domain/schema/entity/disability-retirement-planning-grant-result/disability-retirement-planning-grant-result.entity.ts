import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';

import type { DisabilityRetirementPlanningGrantResultEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result.entity.props.interface';

export class DisabilityRetirementPlanningGrantResultEntity extends BaseEntity<DisabilityRetirementPlanningGrantResultId> {
  public readonly disabilityRetirementPlanningGrantCompleteAnalysis:
    | string
    | null;
  public readonly disabilityRetirementPlanningGrantSimplifiedAnalysis:
    | string
    | null;
  public readonly disabilityRetirementPlanningGrantFirstAnalysis: string | null;
  public readonly disabilityRetirementPlanningGrantCompleteAnalysisDownload:
    | string
    | null;

  protected readonly _type = DisabilityRetirementPlanningGrantResultEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantResultEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantResultId, props);
    this.disabilityRetirementPlanningGrantCompleteAnalysis =
      props.disabilityRetirementPlanningGrantCompleteAnalysis ?? null;
    this.disabilityRetirementPlanningGrantSimplifiedAnalysis =
      props.disabilityRetirementPlanningGrantSimplifiedAnalysis ?? null;
    this.disabilityRetirementPlanningGrantFirstAnalysis =
      props.disabilityRetirementPlanningGrantFirstAnalysis ?? null;
    this.disabilityRetirementPlanningGrantCompleteAnalysisDownload =
      props.disabilityRetirementPlanningGrantCompleteAnalysisDownload ?? null;
  }
}
