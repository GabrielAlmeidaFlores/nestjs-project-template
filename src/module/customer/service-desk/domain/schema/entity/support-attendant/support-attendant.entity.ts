import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

import type { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import type { SupportAttendantEntityPropsInterface } from '@module/customer/service-desk/domain/schema/entity/support-attendant/support-attendant.entity.props.interface';

export class SupportAttendantEntity extends BaseEntity<SupportAttendantId> {
  public readonly name: string;
  public readonly email: string;
  public readonly supportType: SupportTypeEnum;
  public readonly isActive: boolean;

  protected readonly _type = SupportAttendantEntity.name;

  public constructor(props: SupportAttendantEntityPropsInterface) {
    super(SupportAttendantId, props);
    this.name = props.name;
    this.email = props.email;
    this.supportType = props.supportType;
    this.isActive = props.isActive ?? true;
  }
}
