import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';

export interface AnalysisToolRecordEntityPropsInterface
  extends BaseEntityPropsInterface<AnalysisToolRecordId> {
  code: string;
  cnisFastAnalysis?: CnisFastAnalysisEntity | null;
}
