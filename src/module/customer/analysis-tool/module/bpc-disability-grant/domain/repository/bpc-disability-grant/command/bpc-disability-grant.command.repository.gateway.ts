import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { BpcDisabilityGrantEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';

export abstract class BpcDisabilityGrantCommandRepositoryGateway {
  public abstract createBpcDisabilityGrant(
    props: BpcDisabilityGrantEntity,
  ): TransactionType;

  public abstract updateBpcDisabilityGrant(
    id: BpcDisabilityGrantId,
    props: BpcDisabilityGrantEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityGrant(
    id: BpcDisabilityGrantId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
