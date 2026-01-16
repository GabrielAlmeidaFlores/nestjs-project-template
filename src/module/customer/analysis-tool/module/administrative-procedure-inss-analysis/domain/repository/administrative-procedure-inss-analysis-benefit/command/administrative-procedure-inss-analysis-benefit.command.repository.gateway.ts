import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AdministrativeProcedureInssAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/administrative-procedure-inss-analysis-benefit.entity';
import type { AdministrativeProcedureInssAnalysisBenefitId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/value-object/administrative-procedure-inss-analysis-benefit-id/administrative-procedure-inss-analysis-benefit-id.value-object';

export abstract class AdministrativeProcedureInssAnalysisBenefitCommandRepositoryGateway {
  public abstract createAdministrativeProcedureInssAnalysisBenefit(
    props: AdministrativeProcedureInssAnalysisBenefitEntity,
  ): TransactionType;

  public abstract deleteAdministrativeProcedureInssAnalysisBenefit(
    id: AdministrativeProcedureInssAnalysisBenefitId,
  ): TransactionType;
}
