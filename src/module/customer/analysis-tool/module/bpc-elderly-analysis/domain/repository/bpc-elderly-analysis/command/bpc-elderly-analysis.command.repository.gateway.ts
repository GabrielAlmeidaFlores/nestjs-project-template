import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import type { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';

export abstract class BpcElderlyAnalysisCommandRepositoryGateway {
  public abstract createBpcElderlyAnalysis(
    props: BpcElderlyAnalysisEntity,
  ): TransactionType;

  public abstract updateBpcElderlyAnalysis(
    id: BpcElderlyAnalysisId,
    props: BpcElderlyAnalysisEntity,
  ): TransactionType;

  public abstract deleteBpcElderlyAnalysis(
    id: BpcElderlyAnalysisId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
