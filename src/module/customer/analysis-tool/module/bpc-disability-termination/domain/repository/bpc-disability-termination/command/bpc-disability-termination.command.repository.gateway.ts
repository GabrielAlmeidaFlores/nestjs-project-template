import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';

export abstract class BpcDisabilityTerminationCommandRepositoryGateway {
  public abstract createBpcDisabilityTermination(
    props: BpcDisabilityTerminationEntity,
  ): TransactionType;

  public abstract updateBpcDisabilityTermination(
    id: BpcDisabilityTerminationId,
    props: BpcDisabilityTerminationEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityTermination(
    id: BpcDisabilityTerminationId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
