import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AdministrativeProcedureInssAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/administrative-procedure-inss-analysis-legal-proceeding.entity';
import type { AdministrativeProcedureInssAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/value-object/administrative-procedure-inss-analysis-legal-proceeding-id/administrative-procedure-inss-analysis-legal-proceeding-id.value-object';

export abstract class AdministrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createAdministrativeProcedureInssAnalysisLegalProceeding(
    props: AdministrativeProcedureInssAnalysisLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAdministrativeProcedureInssAnalysisLegalProceeding(
    id: AdministrativeProcedureInssAnalysisLegalProceedingId,
  ): TransactionType;
}
