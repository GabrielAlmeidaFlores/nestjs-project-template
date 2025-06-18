import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { ApplicationPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/application-paid-resource.entity.props.interface';
import type { ApplicationPaidResourceEnum } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/enum/application-paid-resource.enum';

export class ApplicationPaidResourceEntity extends BaseEntity {
  public readonly resource: ApplicationPaidResourceEnum;
  public readonly creditCost: number;
  public readonly description: string;

  protected readonly _type = ApplicationPaidResourceEntity.name;

  public constructor(props: ApplicationPaidResourceEntityPropsInterface) {
    super(props);

    this.resource = props.resource;
    this.creditCost = props.creditCost;
    this.description = props.description;
  }
}
