import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/value-object/analysis-tool-client-inss-benefit-id/analysis-tool-client-inss-benefit-id.value-object';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';

export interface AnalysisToolClientInssBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<AnalysisToolClientInssBenefitId> {
  inssBenefitNumber: number;
  cnisFastAnalysis: CnisFastAnalysisEntity;
}
