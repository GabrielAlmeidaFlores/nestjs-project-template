import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayGrantResultId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/value-object/maternity-pay-grant-result-id.value-object';

import type { MaternityPayGrantResultEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/maternity-pay-grant-result.entity.props.interface';

export class MaternityPayGrantResultEntity extends BaseEntity<MaternityPayGrantResultId> {
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;

  protected readonly _type = MaternityPayGrantResultEntity.name;

  public constructor(props: MaternityPayGrantResultEntityPropsInterface) {
    super(MaternityPayGrantResultId, props);
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
  }
}
