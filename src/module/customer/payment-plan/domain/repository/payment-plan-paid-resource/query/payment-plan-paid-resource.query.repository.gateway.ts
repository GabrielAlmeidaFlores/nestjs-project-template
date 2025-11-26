import type { NotFound } from '@aws-sdk/client-s3';
import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetPaymentPlayPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.results';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value.object';
import type { Constructor } from 'type-fest';

export abstract class PaymentPlanPaidResourceQueryRepositoryGateway {
  public abstract listPaymentPlanPaidResource(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetPaymentPlayPaidResourceQueryResult>>;

  public abstract findOnePaymentPlanPaidResource(
    id: PaymentPlanPaidResourceId,
    err: Constructor<NotFound>,
  ): Promise<GetPaymentPlayPaidResourceQueryResult>;
}
