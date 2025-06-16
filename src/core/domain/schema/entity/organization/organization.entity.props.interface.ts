import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

export interface OrganizationEntityPropsInterface
  extends BaseEntityPropsInterface {
  name: string;
  organizationLogo: string | null;
}
