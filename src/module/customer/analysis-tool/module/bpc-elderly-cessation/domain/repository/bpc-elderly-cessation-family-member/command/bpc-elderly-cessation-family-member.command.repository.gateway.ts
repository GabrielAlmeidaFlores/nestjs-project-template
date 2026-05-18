import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import type { BpcElderlyCessationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity';
import type { BpcElderlyCessationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/value-object/bpc-elderly-cessation-family-member-id/bpc-elderly-cessation-family-member-id.value-object';

export abstract class BpcElderlyCessationFamilyMemberCommandRepositoryGateway {
  public abstract createBpcElderlyCessationFamilyMember(
    props: BpcElderlyCessationFamilyMemberEntity,
  ): TransactionType;

  public abstract updateBpcElderlyCessationFamilyMember(
    id: BpcElderlyCessationFamilyMemberId,
    props: BpcElderlyCessationFamilyMemberEntity,
  ): TransactionType;

  public abstract deleteBpcElderlyCessationFamilyMember(
    id: BpcElderlyCessationFamilyMemberId,
  ): TransactionType;

  public abstract deleteAllByBpcElderlyCessationId(
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): TransactionType;
}
