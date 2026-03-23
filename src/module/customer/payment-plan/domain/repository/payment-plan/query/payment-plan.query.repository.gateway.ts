import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { GetPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan/query/result/get-payment-plan.query.result';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class PaymentPlanQueryRepositoryGateway {
  public abstract listActivePaymentPlan(
    listData: ListDataInputModel,
    cycles?: PaymentPlanCycleEnum[],
  ): Promise<ListDataOutputModel<GetPaymentPlanQueryResult>>;

  public abstract listPaymentPlan(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetPaymentPlanQueryResult>>;

  public abstract findOnePaymentPlanByIdOrFail(
    id: PaymentPlanId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetPaymentPlanQueryResult>;

  public abstract findOnePaymentPlanById(
    id: PaymentPlanId,
  ): Promise<GetPaymentPlanQueryResult | null>;

  public abstract countActivePaymentPlans(): Promise<number>;
}
