import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialActivityResultId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/value-object/special-activity-result-id.value-object';

import type { SpecialActivityResultEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/special-activity-result-entity.props.interface';

export class SpecialActivityResultEntity extends BaseEntity<SpecialActivityResultId> {
  public readonly specialActivityCompleteAnalysis: string | null;
  public readonly specialActivitySimplifiedAnalysis: string | null;

  protected readonly _type = SpecialActivityResultEntity.name;

  public constructor(props: SpecialActivityResultEntityPropsInterface) {
    super(SpecialActivityResultId, props);

    this.specialActivityCompleteAnalysis =
      props.specialActivityCompleteAnalysis ?? null;
    this.specialActivitySimplifiedAnalysis =
      props.specialActivitySimplifiedAnalysis ?? null;
  }
}
