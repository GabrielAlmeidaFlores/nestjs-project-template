import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import type { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';

export abstract class BpcDisabilityDenialCommandRepositoryGateway {
  public abstract createBpcDisabilityDenial(
    props: BpcDisabilityDenialEntity,
  ): TransactionType;

  public abstract updateBpcDisabilityDenial(
    id: BpcDisabilityDenialId,
    props: BpcDisabilityDenialEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityDenial(
    id: BpcDisabilityDenialId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
