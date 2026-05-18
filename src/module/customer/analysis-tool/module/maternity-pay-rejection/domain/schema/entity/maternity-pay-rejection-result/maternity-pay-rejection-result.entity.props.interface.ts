import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayRejectionResultId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/value-object/maternity-pay-rejection-result-id.value-object';

export interface MaternityPayRejectionResultEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayRejectionResultId> {
  firstAnalysis?: string | null;
  secondAnalysis?: string | null;
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
}
