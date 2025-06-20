import type { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan/payment-plan-cycle.enum';
import type { AvailablePaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan/available-payment-plan-enabled-paid-resource/available-payment-plan-enabled-paid-resource.typeorm.entity';
import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';

export interface AvailablePaymentPlanTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  name: string;
  description: string;
  price: string;
  maxMemberLimit: number;
  monthlyCreditAmount: number;
  active: boolean;
  cycle: PaymentPlanCycleEnum;
  availablePaymentPlanEnabledPaidResource:
    | AvailablePaymentPlanEnabledPaidResourceTypeormEntity[]
    | undefined;
}
