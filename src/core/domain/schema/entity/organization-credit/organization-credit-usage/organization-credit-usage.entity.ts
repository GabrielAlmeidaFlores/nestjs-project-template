import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { OrganizationCreditUsageEntityPropsInterface } from '@core/domain/schema/entity/organization-credit/organization-credit-usage/organization-credit-usage.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationCreditUsageEntity extends BaseEntity {
  public readonly organization: Guid;
  public readonly paidResource: Guid;
  public readonly creditAmount: number;
  public readonly customer: Guid;

  protected readonly _type = OrganizationCreditUsageEntity.name;

  public constructor(props: OrganizationCreditUsageEntityPropsInterface) {
    super(props);

    this.organization = props.organization;
    this.paidResource = props.paidResource;
    this.creditAmount = props.creditAmount;
    this.customer = props.customer;
  }
}
