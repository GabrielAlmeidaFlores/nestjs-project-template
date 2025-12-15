import type { NotFound } from '@aws-sdk/client-s3';
import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetBankPaymentQueryResult } from '@module/generic/bank/domain/repository/bank-payment/query/result/get-bank-payment.query.result';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class BankPaymentQueryRepositoryGateway {
  public abstract listBankPayment(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetBankPaymentQueryResult>>;

  public abstract findOneBankPaymentByIdOrFail(
    id: BankPaymentId,
    err: Constructor<NotFound>,
  ): Promise<GetBankPaymentQueryResult>;

  public abstract findOneBankPaymentByBankExternalId(
    bankExternalId: string,
  ): Promise<GetBankPaymentQueryResult | null>;
}
