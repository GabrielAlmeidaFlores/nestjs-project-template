import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import type { JudicialCaseAnalysisBenefitId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/value-object/judicial-case-analysis-benefit-id/judicial-case-analysis-benefit-id.value-object';

export interface JudicialCaseAnalysisBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<JudicialCaseAnalysisBenefitId> {
  inssBenefitNumber: string;
  judicialCaseAnalysis: JudicialCaseAnalysisEntity;
}

