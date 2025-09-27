import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import type { CnisFastAnalysisClientInssBenefitId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/value-object/cnis-fast-analysis-client-inss-benefit-id/cnis-fast-analysis-client-inss-benefit-id.value-object';

export interface CnisFastAnalysisClientInssBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<CnisFastAnalysisClientInssBenefitId> {
  inssBenefitNumber: number;
  cnisFastAnalysisClient: CnisFastAnalysisClientEntity;
}
