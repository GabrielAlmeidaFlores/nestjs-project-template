import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationEntity } from '@module/customer/auth/domain/schema/entity/organization/organization.entity';

export abstract class OrganizationCommandRepositoryGateway {
  public abstract createOrganization(
    props: OrganizationEntity,
  ): TransactionType;
}
