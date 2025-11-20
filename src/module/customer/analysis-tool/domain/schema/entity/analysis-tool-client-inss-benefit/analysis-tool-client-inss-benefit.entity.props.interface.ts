import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/value-object/analysis-tool-client-inss-benefit-id/analysis-tool-client-inss-benefit-id.value-object';

export interface AnalysisToolClientInssBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<AnalysisToolClientInssBenefitId> {
  inssBenefitNumber: string;
  analysisToolClient: AnalysisToolClientEntity;
}
