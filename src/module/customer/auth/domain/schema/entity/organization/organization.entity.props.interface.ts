import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationId } from '@module/customer/auth/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

export interface OrganizationEntityPropsInterface
  extends BaseEntityPropsInterface<OrganizationId> {
  name: string;
  organizationLogo?: string | null;
}
