import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';

import type { TemporaryIncapacityBenefitTerminationResultEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/temporary-incapacity-benefit-termination-result.entity.props.interface';

export class TemporaryIncapacityBenefitTerminationResultEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationResultId> {
  public readonly inssDecisionAnalysis: string | null;
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type =
    TemporaryIncapacityBenefitTerminationResultEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationResultEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitTerminationResultId, props);
    this.inssDecisionAnalysis = props.inssDecisionAnalysis ?? null;
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
