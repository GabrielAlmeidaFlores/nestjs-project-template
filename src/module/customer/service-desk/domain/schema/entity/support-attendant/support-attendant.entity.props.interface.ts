import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import type { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

export interface SupportAttendantEntityPropsInterface extends BaseEntityPropsInterface<SupportAttendantId> {
  name: string;
  email: string;
  supportType: SupportTypeEnum;
  isActive?: boolean | null;
}
