import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationPaymentPlanAffiliateCommissionEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission.entity';

export abstract class OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway {
  public abstract createOrganizationPaymentPlanAffiliateCommission(
    props: OrganizationPaymentPlanAffiliateCommissionEntity,
  ): TransactionType;
}
