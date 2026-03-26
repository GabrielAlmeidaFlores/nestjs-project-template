import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

export abstract class OrganizationCommandRepositoryGateway {
  public abstract createOrganization(
    props: OrganizationEntity,
  ): TransactionType;

  public abstract updateOrganization(
    id: OrganizationId,
    props: OrganizationEntity,
  ): TransactionType;
}
