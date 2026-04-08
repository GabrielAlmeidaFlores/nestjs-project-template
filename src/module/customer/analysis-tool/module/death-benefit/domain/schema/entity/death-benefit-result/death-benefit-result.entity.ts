import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitResultId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/value-object/death-benefit-result-id.value-object';

import type { DeathBenefitResultEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/death-benefit-result.entity.props.interface';

export class DeathBenefitResultEntity extends BaseEntity<DeathBenefitResultId> {
  public readonly deathBenefitFirstAnalysis: string | null;
  public readonly deathBenefitCompleteAnalysis: string | null;
  public readonly deathBenefitSimplifiedAnalysis: string | null;
  public readonly deathBenefitCompleteAnalysisDownload: string | null;

  protected readonly _type = DeathBenefitResultEntity.name;

  public constructor(props: DeathBenefitResultEntityPropsInterface) {
    super(DeathBenefitResultId, props);
    this.deathBenefitFirstAnalysis = props.deathBenefitFirstAnalysis ?? null;
    this.deathBenefitCompleteAnalysis =
      props.deathBenefitCompleteAnalysis ?? null;
    this.deathBenefitSimplifiedAnalysis =
      props.deathBenefitSimplifiedAnalysis ?? null;
    this.deathBenefitCompleteAnalysisDownload =
      props.deathBenefitCompleteAnalysisDownload ?? null;
  }
}
