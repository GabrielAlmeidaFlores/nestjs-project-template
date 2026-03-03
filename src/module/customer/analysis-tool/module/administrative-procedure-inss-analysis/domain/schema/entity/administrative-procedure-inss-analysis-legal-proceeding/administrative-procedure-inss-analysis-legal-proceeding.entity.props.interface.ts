import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import type { AdministrativeProcedureInssAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/value-object/administrative-procedure-inss-analysis-legal-proceeding-id/administrative-procedure-inss-analysis-legal-proceeding-id.value-object';

export interface AdministrativeProcedureInssAnalysisLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<AdministrativeProcedureInssAnalysisLegalProceedingId> {
  legalProceedingNumber: string;
  administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity;
}
