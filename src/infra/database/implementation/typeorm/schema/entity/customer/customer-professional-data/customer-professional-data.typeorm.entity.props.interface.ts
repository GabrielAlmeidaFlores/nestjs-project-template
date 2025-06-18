import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { OccupationAreaEnum } from '@core/domain/schema/entity/customer/customer-professional-data/enum/professional-data-occupation.enum';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';

export interface CustomerProfessionalDataTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  occupationArea: OccupationAreaEnum;
  stateCode: StateCodeEnum;
  customer: CustomerEntity;
}
