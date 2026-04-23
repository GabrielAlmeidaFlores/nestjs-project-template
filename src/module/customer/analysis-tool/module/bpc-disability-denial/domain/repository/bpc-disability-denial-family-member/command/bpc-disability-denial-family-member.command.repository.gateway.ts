import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import type { BpcDisabilityDenialFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity';
import type { BpcDisabilityDenialFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/value-object/bpc-disability-denial-family-member-id/bpc-disability-denial-family-member-id.value-object';

export abstract class BpcDisabilityDenialFamilyMemberCommandRepositoryGateway {
  public abstract createBpcDisabilityDenialFamilyMember(
    props: BpcDisabilityDenialFamilyMemberEntity,
  ): TransactionType;

  public abstract updateBpcDisabilityDenialFamilyMember(
    id: BpcDisabilityDenialFamilyMemberId,
    props: BpcDisabilityDenialFamilyMemberEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityDenialFamilyMember(
    id: BpcDisabilityDenialFamilyMemberId,
  ): TransactionType;

  public abstract deleteAllByBpcDisabilityDenialId(
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): TransactionType;
}
