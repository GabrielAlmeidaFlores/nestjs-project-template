import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';

import type { DeathBenefitGrantResultEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/death-benefit-grant-result.entity.props.interface';

export class DeathBenefitGrantResultEntity extends BaseEntity<DeathBenefitGrantResultId> {
  public readonly deathBenefitGrantFirstAnalysis: string | null;
  public readonly deathBenefitGrantCompleteAnalysis: string | null;
  public readonly deathBenefitGrantSimplifiedAnalysis: string | null;
  public readonly deathBenefitGrantCompleteAnalysisDownload: string | null;

  protected readonly _type = DeathBenefitGrantResultEntity.name;

  public constructor(props: DeathBenefitGrantResultEntityPropsInterface) {
    super(DeathBenefitGrantResultId, props);
    this.deathBenefitGrantFirstAnalysis =
      props.deathBenefitGrantFirstAnalysis ?? null;
    this.deathBenefitGrantCompleteAnalysis =
      props.deathBenefitGrantCompleteAnalysis ?? null;
    this.deathBenefitGrantSimplifiedAnalysis =
      props.deathBenefitGrantSimplifiedAnalysis ?? null;
    this.deathBenefitGrantCompleteAnalysisDownload =
      props.deathBenefitGrantCompleteAnalysisDownload ?? null;
  }
}
