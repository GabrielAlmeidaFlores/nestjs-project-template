import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import type { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';

export abstract class AdministrativeProcedureInssAnalysisCommandRepositoryGateway {
  public abstract createAdministrativeProcedureInssAnalysis(
    props: AdministrativeProcedureInssAnalysisEntity,
  ): TransactionType;

  public abstract updateAdministrativeProcedureInssAnalysis(
    id: AdministrativeProcedureInssAnalysisId,
    props: AdministrativeProcedureInssAnalysisEntity,
  ): TransactionType;

  public abstract deleteAdministrativeProcedureInssAnalysis(
    id: AdministrativeProcedureInssAnalysisId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
