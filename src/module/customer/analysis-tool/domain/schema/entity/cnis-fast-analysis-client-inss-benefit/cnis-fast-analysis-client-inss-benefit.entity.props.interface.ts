import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { CnisFastAnalysisClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/value-object/cnis-fast-analysis-client-inss-benefit-id/cnis-fast-analysis-client-inss-benefit-id.value-object';

export interface CnisFastAnalysisClientInssBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<CnisFastAnalysisClientInssBenefitId> {
  inssBenefitNumber: number;
  cnisFastAnalysis: CnisFastAnalysisEntity;
}
