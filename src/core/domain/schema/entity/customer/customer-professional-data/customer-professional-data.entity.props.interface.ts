import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { OccupationAreaEnum } from '@core/domain/schema/entity/customer/customer-professional-data/enum/professional-data-occupation.enum';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';

export interface CustomerProfessionalDataEntityPropsInterface
  extends BaseEntityPropsInterface {
  occupationArea: OccupationAreaEnum;
  stateCode: StateCodeEnum;
  customer: CustomerEntity;
}
