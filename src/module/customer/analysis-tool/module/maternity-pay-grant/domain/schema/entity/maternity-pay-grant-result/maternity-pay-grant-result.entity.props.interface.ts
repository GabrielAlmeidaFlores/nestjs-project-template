import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayGrantResultId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/value-object/maternity-pay-grant-result-id.value-object';

export interface MaternityPayGrantResultEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayGrantResultId> {
  firstAnalysis?: string | null;
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
}
