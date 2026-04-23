import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentBenefitRejectionResultId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/value-object/accident-benefit-rejection-result-id.value-object';

import type { AccidentBenefitRejectionResultEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/accident-benefit-rejection-result.entity.props.interface';

export class AccidentBenefitRejectionResultEntity extends BaseEntity<AccidentBenefitRejectionResultId> {
  public readonly firstAnalysis: string | null;
  public readonly secondAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;

  protected readonly _type = AccidentBenefitRejectionResultEntity.name;

  public constructor(
    props: AccidentBenefitRejectionResultEntityPropsInterface,
  ) {
    super(AccidentBenefitRejectionResultId, props);
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.secondAnalysis = props.secondAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
  }
}
