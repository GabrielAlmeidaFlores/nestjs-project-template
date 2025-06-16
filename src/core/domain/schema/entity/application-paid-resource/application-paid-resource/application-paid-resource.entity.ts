import type { ApplicationPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/application-paid-resource.entity.props.interface';
import type { ApplicationPaidResourceEnum } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/enum/application-paid-resource.enum';

export class ApplicationPaidResourceEntity {
  public readonly resource: ApplicationPaidResourceEnum;
  public readonly creditCost: number;
  public readonly description: string;

  protected readonly _type = ApplicationPaidResourceEntity.name;

  public constructor(props: ApplicationPaidResourceEntityPropsInterface) {
    this.resource = props.resource;
    this.creditCost = props.creditCost;
    this.description = props.description;
  }
}
