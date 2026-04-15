import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';

import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

export class SurvivorPensionAnalysisEntity extends BaseEntity<SurvivorPensionAnalysisId> {
  protected readonly _type = SurvivorPensionAnalysisEntity.name;

  public constructor(
    props: BaseEntityPropsInterface<SurvivorPensionAnalysisId>,
  ) {
    super(SurvivorPensionAnalysisId, props);
  }
}
