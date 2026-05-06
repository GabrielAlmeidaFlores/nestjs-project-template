import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionResultId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/value-object/elderly-bpc-rejection-result-id/elderly-bpc-rejection-result-id.value-object';

export interface ElderlyBpcRejectionResultEntityPropsInterface extends BaseEntityPropsInterface<ElderlyBpcRejectionResultId> {
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysisDownload?: string | null;
  elderlyBpcRejectionId: ElderlyBpcRejectionId;
}
