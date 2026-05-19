import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';

import type { DeathBenefitRejectionResultEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/death-benefit-rejection-result.entity.props.interface';

export class DeathBenefitRejectionResultEntity extends BaseEntity<DeathBenefitRejectionResultId> {
  public readonly deathBenefitRejectionInssDecisionAnalysis: string | null;
  public readonly deathBenefitRejectionFirstAnalysis: string | null;
  public readonly deathBenefitRejectionCompleteAnalysis: string | null;
  public readonly deathBenefitRejectionSimplifiedAnalysis: string | null;
  public readonly deathBenefitRejectionCompleteAnalysisDownload: string | null;

  protected readonly _type = DeathBenefitRejectionResultEntity.name;

  public constructor(props: DeathBenefitRejectionResultEntityPropsInterface) {
    super(DeathBenefitRejectionResultId, props);
    this.deathBenefitRejectionInssDecisionAnalysis =
      props.deathBenefitRejectionInssDecisionAnalysis ?? null;
    this.deathBenefitRejectionFirstAnalysis =
      props.deathBenefitRejectionFirstAnalysis ?? null;
    this.deathBenefitRejectionCompleteAnalysis =
      props.deathBenefitRejectionCompleteAnalysis ?? null;
    this.deathBenefitRejectionSimplifiedAnalysis =
      props.deathBenefitRejectionSimplifiedAnalysis ?? null;
    this.deathBenefitRejectionCompleteAnalysisDownload =
      props.deathBenefitRejectionCompleteAnalysisDownload ?? null;
  }
}
