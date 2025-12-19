import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { GetPaymentPlanPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.result';
import type { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class PaymentPlanPaidResourceQueryRepositoryGateway {
  public abstract listPaymentPlanPaidResource(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetPaymentPlanPaidResourceQueryResult>>;

  public abstract findOnePaymentPlanPaidResourceByIdOrFail(
    id: PaymentPlanPaidResourceId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetPaymentPlanPaidResourceQueryResult>;

  public abstract findOnePaymentPlanPaidResourceByResourceType(
    resource: PaymentPlanPaidResourceTypeEnum,
  ): Promise<GetPaymentPlanPaidResourceQueryResult>;
}
