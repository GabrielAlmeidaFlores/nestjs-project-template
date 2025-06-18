import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/application-paid-resource.entity';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { OrganizationCreditUsageEntityPropsInterface } from '@core/domain/schema/entity/organization-credit/organization-credit-usage/organization-credit-usage.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class OrganizationCreditUsageEntity extends BaseEntity {
  public readonly creditAmount: number;
  public readonly organization: RelationModel<OrganizationEntity>;
  public readonly applicationPaidResource: RelationModel<ApplicationPaidResourceEntity>;
  public readonly customer: RelationModel<CustomerEntity>;

  protected readonly _type = OrganizationCreditUsageEntity.name;

  public constructor(props: OrganizationCreditUsageEntityPropsInterface) {
    super(props);

    this.organization = props.organization;
    this.applicationPaidResource = props.applicationPaidResource;
    this.creditAmount = props.creditAmount;
    this.customer = props.customer;
  }
}
