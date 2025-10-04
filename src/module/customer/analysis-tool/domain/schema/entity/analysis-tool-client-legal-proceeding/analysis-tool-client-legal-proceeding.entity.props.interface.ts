import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';

export interface AnalysisToolClientLegalProceedingEntityPropsInterface
  extends BaseEntityPropsInterface<AnalysisToolClientLegalProceedingId> {
  legalProceedingNumber: number;
  cnisFastAnalysis: CnisFastAnalysisEntity;
}
