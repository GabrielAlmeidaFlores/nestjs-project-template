import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayRejectionResultId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/value-object/maternity-pay-rejection-result-id.value-object';

import type { MaternityPayRejectionResultEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/maternity-pay-rejection-result.entity.props.interface';

export class MaternityPayRejectionResultEntity extends BaseEntity<MaternityPayRejectionResultId> {
  public readonly firstAnalysis: string | null;
  public readonly secondAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type = MaternityPayRejectionResultEntity.name;

  public constructor(props: MaternityPayRejectionResultEntityPropsInterface) {
    super(MaternityPayRejectionResultId, props);
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.secondAnalysis = props.secondAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
