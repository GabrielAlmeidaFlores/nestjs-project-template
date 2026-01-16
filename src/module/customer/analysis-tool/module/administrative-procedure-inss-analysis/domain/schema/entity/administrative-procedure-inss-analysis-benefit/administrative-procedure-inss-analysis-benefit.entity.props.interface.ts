import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import type { AdministrativeProcedureInssAnalysisBenefitId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/value-object/administrative-procedure-inss-analysis-benefit-id/administrative-procedure-inss-analysis-benefit-id.value-object';

export interface AdministrativeProcedureInssAnalysisBenefitEntityPropsInterface extends BaseEntityPropsInterface<AdministrativeProcedureInssAnalysisBenefitId> {
  inssBenefitNumber: string;
  administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity;
}
