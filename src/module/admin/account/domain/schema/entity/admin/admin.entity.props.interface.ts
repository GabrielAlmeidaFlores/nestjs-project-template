import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';

export interface AdminEntityPropsInterface extends BaseEntityPropsInterface<AdminId> {
  name: string;
}
