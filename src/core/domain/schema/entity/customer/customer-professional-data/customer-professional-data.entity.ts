import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { CustomerProfessionalDataEntityPropsInterface } from '@core/domain/schema/entity/customer/customer-professional-data/customer-professional-data.entity.props.interface';
import type { OccupationAreaEnum } from '@core/domain/schema/entity/customer/customer-professional-data/enum/professional-data-occupation.enum';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';

export class CustomerProfessionalDataEntity extends BaseEntity {
  public readonly occupationArea: OccupationAreaEnum;
  public readonly stateCode: StateCodeEnum;
  public readonly customer: CustomerEntity;

  protected readonly _type = CustomerProfessionalDataEntity.name;

  public constructor(props: CustomerProfessionalDataEntityPropsInterface) {
    super(props);

    this.occupationArea = props.occupationArea;
    this.stateCode = props.stateCode;
    this.customer = props.customer;
  }
}
