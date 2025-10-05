import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { CnisFastAnalysisLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-legal-proceeding/value-object/cnis-fast-analysis-legal-proceeding-id/cnis-fast-analysis-legal-proceeding-id.value-object';

export interface CnisFastAnalysisLegalProceedingEntityPropsInterface
  extends BaseEntityPropsInterface<CnisFastAnalysisLegalProceedingId> {
  legalProceedingNumber: number;
  cnisFastAnalysis: CnisFastAnalysisEntity;
}
