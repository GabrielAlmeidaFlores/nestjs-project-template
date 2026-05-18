import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionResultId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/value-object/special-retirement-rejection-result-id.value-object';

import type { SpecialRetirementRejectionResultEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/special-retirement-rejection-result.entity.props.interface';

export class SpecialRetirementRejectionResultEntity extends BaseEntity<SpecialRetirementRejectionResultId> {
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type = SpecialRetirementRejectionResultEntity.name;

  public constructor(
    props: SpecialRetirementRejectionResultEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionResultId, props);
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
