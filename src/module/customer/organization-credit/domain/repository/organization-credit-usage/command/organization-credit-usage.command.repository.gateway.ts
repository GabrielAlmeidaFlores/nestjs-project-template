import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationCreditUsageEntity } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/organization-credit-usage.entity';
import type { OrganizationCreditUsageId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/value-object/organization-credit-usage-id/organization-credit-usage-id.value-object';

export abstract class OrganizationCreditUsageCommandRepositoryGateway {
  public abstract createOrganizationCreditUsage(
    props: OrganizationCreditUsageEntity,
  ): TransactionType;

  public abstract updateOrganizationCreditUsage(
    id: OrganizationCreditUsageId,
    props: Partial<OrganizationCreditUsageEntity>,
  ): TransactionType;

  public abstract deleteOrganizationCreditUsage(
    id: OrganizationCreditUsageId,
  ): TransactionType;
}
