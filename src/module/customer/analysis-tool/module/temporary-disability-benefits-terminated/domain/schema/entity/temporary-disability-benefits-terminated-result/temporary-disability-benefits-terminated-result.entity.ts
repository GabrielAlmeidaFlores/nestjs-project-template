import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedResultEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/temporary-disability-benefits-terminated-result.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedResultEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedResultId> {
  public readonly inssDecisionAnalysis: string | null;
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedResultEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedResultEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedResultId, props);
    this.inssDecisionAnalysis = props.inssDecisionAnalysis ?? null;
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
