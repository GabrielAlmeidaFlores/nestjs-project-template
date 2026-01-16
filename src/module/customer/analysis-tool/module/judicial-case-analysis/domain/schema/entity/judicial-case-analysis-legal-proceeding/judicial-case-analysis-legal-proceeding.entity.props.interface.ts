import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import type { JudicialCaseAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/value-object/judicial-case-analysis-legal-proceeding-id/judicial-case-analysis-legal-proceeding-id.value-object';

export interface JudicialCaseAnalysisLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<JudicialCaseAnalysisLegalProceedingId> {
  legalProceedingNumber: string;
  judicialCaseAnalysis: JudicialCaseAnalysisEntity;
}
