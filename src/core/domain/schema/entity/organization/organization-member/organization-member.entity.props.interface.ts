import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface OrganizationMemberEntityPropsInterface
  extends BaseEntityPropsInterface {
  organization: OrganizationEntity;
  customer: Guid;
}
