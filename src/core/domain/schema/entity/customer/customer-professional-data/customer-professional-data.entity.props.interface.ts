import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OccupationAreaEnum } from '@core/domain/schema/entity/customer/customer-professional-data/enum/professional-data-occupation.enum';
import type { StateEnum } from '@core/domain/schema/entity/customer/customer-professional-data/enum/professional-data-state.enum';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface CustomerProfessionalDataEntityPropsInterface
  extends BaseEntityPropsInterface {
  occupationArea: OccupationAreaEnum;
  state: StateEnum;
  customerProfessionalData: Guid;
}
