import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationCreditPackPurchaseEntity } from '@module/customer/credit-pack/domain/schema/entity/organization-credit-pack-purchase/organization-credit-pack-purchase.entity';

export abstract class OrganizationCreditPackPurchaseCommandRepositoryGateway {
  public abstract createOrganizationCreditPackPurchase(
    entity: OrganizationCreditPackPurchaseEntity,
  ): TransactionType;
}
