import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetOrganizationCreditPurchaseQueryResult } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/result/get-organization-credit-purchase.query.result';
import type { OrganizationCreditPurchaseId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/value-object/organization-credit-purchase-id/organization-credit-purchase-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class OrganizationCreditPurchaseQueryRepositoryGateway {
  public abstract listOrganizationCreditPurchase(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetOrganizationCreditPurchaseQueryResult>>;

  public abstract findOneOrganizationCreditPurchaseByIdOrFail(
    id: OrganizationCreditPurchaseId,
    err: Constructor<NotFoundError>,
  ): Promise<GetOrganizationCreditPurchaseQueryResult>;

  public abstract findOneOrganizationCreditPurchaseByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationCreditPurchaseQueryResult | null>;

  public abstract findOneOrganizationCreditPurchaseByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<GetOrganizationCreditPurchaseQueryResult | null>;

  public abstract findManyOrganizationCreditPurchaseByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationCreditPurchaseQueryResult[]>;
}
