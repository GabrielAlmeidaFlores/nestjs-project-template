import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';

import type { DisabilityRetirementPlanningRejectionResultEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity.props.interface';

export class DisabilityRetirementPlanningRejectionResultEntity extends BaseEntity<DisabilityRetirementPlanningRejectionResultId> {
  public readonly inssDecisionAnalysis: string | null;
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type =
    DisabilityRetirementPlanningRejectionResultEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningRejectionResultEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningRejectionResultId, props);
    this.inssDecisionAnalysis = props.inssDecisionAnalysis ?? null;
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
