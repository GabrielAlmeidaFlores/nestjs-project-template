import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';

export interface AnalysisToolClientInssBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<AnalysisToolClientInssBenefitId> {
  inssBenefitNumber: string;
  cnisFastAnalysis: CnisFastAnalysisEntity;
}
