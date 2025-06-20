import type { ApplicationPaidResourceEnum } from '@core/domain/schema/entity/application-resource/application-paid-resource/enum/application-paid-resource.enum';
import type { AvailablePaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan/available-payment-plan-enabled-paid-resource/available-payment-plan-enabled-paid-resource.typeorm.entity';
import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';

export interface ApplicationPaidResourceTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  resource: ApplicationPaidResourceEnum;
  creditCost: number;
  description: string;
  applicationPaidResource: AvailablePaymentPlanEnabledPaidResourceTypeormEntity;
}
