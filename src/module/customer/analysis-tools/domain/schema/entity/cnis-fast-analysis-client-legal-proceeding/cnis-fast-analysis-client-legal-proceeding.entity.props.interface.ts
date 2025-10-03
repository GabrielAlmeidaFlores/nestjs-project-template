import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CnisFastAnalysisClientEntity } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import type { CnisFastAnalysisClientLegalProceedingId } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/value-object/cnis-fast-analysis-client-legal-proceeding-id/cnis-fast-analysis-client-legal-proceeding-id.value-object';

export interface CnisFastAnalysisClientLegalProceedingEntityPropsInterface
  extends BaseEntityPropsInterface<CnisFastAnalysisClientLegalProceedingId> {
  legalProceedingNumber: number;
  cnisFastAnalysisClient: CnisFastAnalysisClientEntity;
}
