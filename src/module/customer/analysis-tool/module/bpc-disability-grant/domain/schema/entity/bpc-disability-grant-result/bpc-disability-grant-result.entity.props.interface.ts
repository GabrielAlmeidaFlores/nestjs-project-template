import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityGrantResultId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/value-object/bpc-disability-grant-result-id/bpc-disability-grant-result-id.value-object';

export interface BpcDisabilityGrantResultEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityGrantResultId> {
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
}
