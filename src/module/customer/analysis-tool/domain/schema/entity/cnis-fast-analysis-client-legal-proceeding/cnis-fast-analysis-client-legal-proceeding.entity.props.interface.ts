import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { CnisFastAnalysisClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/value-object/cnis-fast-analysis-client-legal-proceeding-id/cnis-fast-analysis-client-legal-proceeding-id.value-object';

export interface CnisFastAnalysisClientLegalProceedingEntityPropsInterface
  extends BaseEntityPropsInterface<CnisFastAnalysisClientLegalProceedingId> {
  legalProceedingNumber: number;
  cnisFastAnalysis: CnisFastAnalysisEntity;
}
