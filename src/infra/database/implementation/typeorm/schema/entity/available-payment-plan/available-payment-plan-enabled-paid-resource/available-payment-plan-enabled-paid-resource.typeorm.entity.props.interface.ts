import type { ApplicationPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/application-resource/application-paid-resource/application-paid-resource.typeorm.entity';
import type { AvailablePaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.typeorm.entity';
import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';

export interface AvailablePaymentPlanEnabledPaidResourceTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  applicationPaidResource: ApplicationPaidResourceTypeormEntity[] | undefined;
  availablePaymentPlan: AvailablePaymentPlanTypeormEntity[] | undefined;
}
