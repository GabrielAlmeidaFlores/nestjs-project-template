import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { GetBankPaymentQueryResult } from '@module/generic/bank/domain/repository/bank-payment/query/result/get-bank-payment.query.result';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class BankPaymentQueryRepositoryGateway {
  public abstract listBankPayment(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetBankPaymentQueryResult>>;

  public abstract findOneBankPaymentByIdOrFail(
    id: BankPaymentId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBankPaymentQueryResult>;

  public abstract findOneBankPaymentByBankExternalId(
    bankExternalId: string,
  ): Promise<GetBankPaymentQueryResult | null>;

  public abstract findManyBankPaymentByIds(
    ids: BankPaymentId[],
  ): Promise<GetBankPaymentQueryResult[]>;

  public abstract listBankPaymentByOrganizationPaymentPlanId(
    organizationPaymentPlanId: OrganizationPaymentPlanId,
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetBankPaymentQueryResult>>;

  public abstract listBankPaymentByCustomerId(
    customerId: CustomerId,
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetBankPaymentQueryResult>>;

  public abstract sumBankPaymentAmountByYear(year: number): Promise<number>;
}
