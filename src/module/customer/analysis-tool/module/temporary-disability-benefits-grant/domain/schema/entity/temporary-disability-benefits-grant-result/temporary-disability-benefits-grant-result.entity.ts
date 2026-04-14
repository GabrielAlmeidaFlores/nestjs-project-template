import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/value-object/temporary-disability-benefits-grant-result-id.value-object';

import type { TemporaryDisabilityBenefitsGrantResultEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantResultEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantResultId> {
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;

  protected readonly _type = TemporaryDisabilityBenefitsGrantResultEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantResultEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantResultId, props);
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
  }
}
