import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan-cycle.enum';

export interface PaymentPlanEntityPropsInterface
  extends BaseEntityPropsInterface {
  name: string;
  description: string;
  price: number;
  maxMemberLimit: number;
  monthlyCreditAmount: number;
  active: boolean;
  cycle: PaymentPlanCycleEnum;
}
