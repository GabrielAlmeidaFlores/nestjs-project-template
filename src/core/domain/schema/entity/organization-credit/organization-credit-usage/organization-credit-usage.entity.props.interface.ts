import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/application-paid-resource.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { RelationType } from '@core/domain/schema/type/relation.type';

export interface OrganizationCreditUsageEntityPropsInterface
  extends BaseEntityPropsInterface {
  creditAmount: number;
  organization: RelationType<OrganizationEntity>;
  applicationPaidResource: RelationType<ApplicationPaidResourceEntity>;
  customer: RelationType<CustomerEntity>;
}
