import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface OrganizationMemberEntityPropsInterface
  extends BaseEntityPropsInterface {
  organization: OrganizationEntity;
  customer: RelationModel<CustomerEntity>;
}
