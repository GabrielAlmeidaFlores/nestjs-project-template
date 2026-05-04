import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import type { BpcDisabilityTerminationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity';
import type { BpcDisabilityTerminationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/value-object/bpc-disability-termination-family-member-id/bpc-disability-termination-family-member-id.value-object';

export abstract class BpcDisabilityTerminationFamilyMemberCommandRepositoryGateway {
  public abstract createBpcDisabilityTerminationFamilyMember(
    props: BpcDisabilityTerminationFamilyMemberEntity,
  ): TransactionType;

  public abstract updateBpcDisabilityTerminationFamilyMember(
    id: BpcDisabilityTerminationFamilyMemberId,
    props: BpcDisabilityTerminationFamilyMemberEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityTerminationFamilyMember(
    id: BpcDisabilityTerminationFamilyMemberId,
  ): TransactionType;

  public abstract deleteAllByBpcDisabilityTerminationId(
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): TransactionType;
}
