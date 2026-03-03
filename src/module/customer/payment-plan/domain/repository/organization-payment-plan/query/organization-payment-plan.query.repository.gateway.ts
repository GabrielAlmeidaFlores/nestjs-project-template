import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetOrganizationPaymentPlanWithRelationsQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan-with-relations.query.result';
import type { GetOrganizationPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan.query.result';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export abstract class OrganizationPaymentPlanQueryRepositoryGateway {
  public abstract findManyByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationPaymentPlanQueryResult[]>;

  public abstract findManyByOrganizationIdWithRelations(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationPaymentPlanWithRelationsQueryResult[]>;

  public abstract findOneByBankExternalId(
    bankExternalId: string,
  ): Promise<GetOrganizationPaymentPlanQueryResult | null>;

  public abstract findOneByBankExternalIdWithRelations(
    bankExternalId: string,
  ): Promise<GetOrganizationPaymentPlanWithRelationsQueryResult | null>;

  public abstract findOneByIdWithRelations(
    id: OrganizationPaymentPlanId,
  ): Promise<GetOrganizationPaymentPlanWithRelationsQueryResult | null>;

  public abstract findOneByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationPaymentPlanQueryResult | null>;

  public abstract findOneByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<GetOrganizationPaymentPlanQueryResult | null>;

  public abstract countActiveSubscriptions(): Promise<number>;

  public abstract countSalesPerPaymentPlan(): Promise<
    Array<{ paymentPlanId: PaymentPlanId; salesCount: number }>
  >;
}
