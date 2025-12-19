import type { NotFound } from '@aws-sdk/client-s3';
import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetOrganizationPaymentPlanBankPaymentQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/result/get-organization-payment-plan-bank-payment.query.result';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { OrganizationPaymentPlanBankPaymentId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/value-object/organization-payment-plan-bank-payment-id/organization-payment-plan-bank-payment-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class OrganizationPaymentPlanBankPaymentQueryRepositoryGateway {
  public abstract listOrganizationPaymentPlanBankPayment(
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetOrganizationPaymentPlanBankPaymentQueryResult>
  >;

  public abstract findOneOrganizationPaymentPlanBankPaymentByIdOrFail(
    id: OrganizationPaymentPlanBankPaymentId,
    err: Constructor<NotFound>,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult>;

  public abstract findOneOrganizationPaymentPlanBankPaymentByOrganizationPaymentPlanId(
    organizationPaymentPlanId: OrganizationPaymentPlanId,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult | null>;

  public abstract findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult | null>;

  public abstract findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
    bankPayment: BankPaymentId,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult | null>;

  public abstract findManyOrganizationPaymentPlanBankPaymentByOrganizationPaymentPlanId(
    organizationPaymentPlanId: OrganizationPaymentPlanId,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult[]>;
}
