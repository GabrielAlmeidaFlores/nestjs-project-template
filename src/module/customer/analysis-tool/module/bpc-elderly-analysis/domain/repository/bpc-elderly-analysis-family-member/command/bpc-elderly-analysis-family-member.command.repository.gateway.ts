import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';
import type { BpcElderlyAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/value-object/bpc-elderly-analysis-family-member-id/bpc-elderly-analysis-family-member-id.value-object';

export abstract class BpcElderlyAnalysisFamilyMemberCommandRepositoryGateway {
  public abstract createBpcElderlyAnalysisFamilyMember(
    props: BpcElderlyAnalysisFamilyMemberEntity,
  ): TransactionType;

  public abstract updateBpcElderlyAnalysisFamilyMember(
    id: BpcElderlyAnalysisFamilyMemberId,
    props: BpcElderlyAnalysisFamilyMemberEntity,
  ): TransactionType;

  public abstract deleteBpcElderlyAnalysisFamilyMember(
    id: BpcElderlyAnalysisFamilyMemberId,
  ): TransactionType;
}
