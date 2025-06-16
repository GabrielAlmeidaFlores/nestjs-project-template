import type { ApplicationPaidResourceEnum } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/enum/application-paid-resource.enum';

export interface ApplicationPaidResourceEntityPropsInterface {
  resource: ApplicationPaidResourceEnum;
  creditCost: number;
  description: string;
}
