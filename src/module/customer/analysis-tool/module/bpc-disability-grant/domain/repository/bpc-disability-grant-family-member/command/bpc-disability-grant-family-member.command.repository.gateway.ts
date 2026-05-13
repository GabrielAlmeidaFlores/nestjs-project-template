import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { BpcDisabilityGrantFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/bpc-disability-grant-family-member.entity';
import type { BpcDisabilityGrantFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/value-object/bpc-disability-grant-family-member-id/bpc-disability-grant-family-member-id.value-object';

export abstract class BpcDisabilityGrantFamilyMemberCommandRepositoryGateway {
  public abstract createBpcDisabilityGrantFamilyMember(
    props: BpcDisabilityGrantFamilyMemberEntity,
  ): TransactionType;

  public abstract updateBpcDisabilityGrantFamilyMember(
    id: BpcDisabilityGrantFamilyMemberId,
    props: BpcDisabilityGrantFamilyMemberEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityGrantFamilyMember(
    id: BpcDisabilityGrantFamilyMemberId,
  ): TransactionType;

  public abstract deleteAllByBpcDisabilityGrantId(
    BpcDisabilityGrantId: BpcDisabilityGrantId,
  ): TransactionType;
}
