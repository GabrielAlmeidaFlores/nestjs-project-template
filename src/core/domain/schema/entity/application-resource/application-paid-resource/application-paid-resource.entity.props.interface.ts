import type { ApplicationPaidResourceEnum } from '@core/domain/schema/entity/application-resource/application-paid-resource/enum/application-paid-resource.enum';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';

export interface ApplicationPaidResourceEntityPropsInterface
  extends BaseEntityPropsInterface {
  resource: ApplicationPaidResourceEnum;
  creditCost: number;
  description: string;
}
