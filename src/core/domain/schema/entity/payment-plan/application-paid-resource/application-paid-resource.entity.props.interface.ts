import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { ApplicationPaidResourceEnum } from '@core/domain/schema/entity/payment-plan/application-paid-resource/enum/application-paid-resource.enum';

export interface ApplicationPaidResourceEntityPropsInterface
  extends BaseEntityPropsInterface {
  resource: ApplicationPaidResourceEnum;
  creditCost: number;
  name: string;
  description: string;
}
