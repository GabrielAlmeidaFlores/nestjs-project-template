import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { CustomerProfessionalDataEntityPropsInterface } from '@core/domain/schema/entity/customer/customer-professional-data/customer-professional-data.entity.props.interface';
import type { OccupationAreaEnum } from '@core/domain/schema/entity/customer/customer-professional-data/enum/professional-data-occupation.enum';
import type { StateEnum } from '@core/domain/schema/entity/customer/customer-professional-data/enum/professional-data-state.enum';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CustomerProfessionalDataEntity extends BaseEntity {
  public readonly occupationArea: OccupationAreaEnum;
  public readonly state: StateEnum;
  public readonly customerProfessionalData: Guid;

  protected readonly _type = CustomerProfessionalDataEntity.name;

  public constructor(props: CustomerProfessionalDataEntityPropsInterface) {
    super(props);

    this.occupationArea = props.occupationArea;
    this.state = props.state;
    this.customerProfessionalData = props.customerProfessionalData;
  }
}
