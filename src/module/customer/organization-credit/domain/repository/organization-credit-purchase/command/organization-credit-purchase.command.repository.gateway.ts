import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationCreditPurchaseEntity } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/organization-credit-purchase.entity';
import type { OrganizationCreditPurchaseId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/value-object/organization-credit-purchase-id/organization-credit-purchase-id.value-object';

export abstract class OrganizationCreditPurchaseCommandRepositoryGateway {
  public abstract createOrganizationCreditPurchase(
    props: OrganizationCreditPurchaseEntity,
  ): TransactionType;

  public abstract updateOrganizationCreditPurchase(
    id: OrganizationCreditPurchaseId,
    props: OrganizationCreditPurchaseEntity,
  ): TransactionType;

  public abstract deleteOrganizationCreditPurchase(
    id: OrganizationCreditPurchaseId,
  ): TransactionType;
}
