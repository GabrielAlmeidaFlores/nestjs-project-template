import type { TransactionEventType } from '@core/domain/repository/base/type/transaction-event.interface';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';

export abstract class OrganizationCommandRepositoryGateway {
  public abstract createOrganization(
    props: OrganizationEntity,
  ): TransactionEventType;
}
