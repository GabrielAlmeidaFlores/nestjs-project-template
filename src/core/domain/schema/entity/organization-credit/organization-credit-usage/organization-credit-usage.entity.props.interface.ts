import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-resource/application-paid-resource/application-paid-resource.entity';
import type { BaseAuditableEntityPropsInterface } from '@core/domain/schema/entity/base/base-auditable/base-auditable.entity.props.interface';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface OrganizationCreditUsageEntityPropsInterface
  extends BaseAuditableEntityPropsInterface<CustomerEntity> {
  creditAmount: number;
  organization: RelationModel<OrganizationEntity>;
  applicationPaidResource: RelationModel<ApplicationPaidResourceEntity>;
  customer: RelationModel<CustomerEntity>;
}
