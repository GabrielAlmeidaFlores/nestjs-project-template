import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';

export abstract class BpcElderlyCessationCommandRepositoryGateway {
  public abstract createBpcElderlyCessation(
    props: BpcElderlyCessationEntity,
  ): TransactionType;

  public abstract updateBpcElderlyCessation(
    id: BpcElderlyCessationId,
    props: BpcElderlyCessationEntity,
  ): TransactionType;

  public abstract deleteBpcElderlyCessation(
    id: BpcElderlyCessationId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
