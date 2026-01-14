import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AdministrativeProcedureInssAnalysisResultEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.entity';
import type { AdministrativeProcedureInssAnalysisResultId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/value-object/administrative-procedure-inss-analysis-result-id/administrative-procedure-inss-analysis-result-id.value-object';

export abstract class AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway {
  public abstract createAdministrativeProcedureInssAnalysisResult(
    props: AdministrativeProcedureInssAnalysisResultEntity,
  ): TransactionType;

  public abstract updateAdministrativeProcedureInssAnalysisResult(
    id: AdministrativeProcedureInssAnalysisResultId,
    props: AdministrativeProcedureInssAnalysisResultEntity,
  ): TransactionType;
}

