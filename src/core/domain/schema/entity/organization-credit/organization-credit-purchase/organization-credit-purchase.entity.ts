import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { OrganizationCreditPurchaseEntityPropsInterface } from '@core/domain/schema/entity/organization-credit/organization-credit-purchase/organization-credit-purchase.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationCreditPurchaseEntity extends BaseEntity {
  public readonly organization: Guid;
  public readonly paidResources: Guid;
  public readonly creditAmount: number;
  public readonly customer: Guid;

  protected readonly _type = OrganizationCreditPurchaseEntity.name;

  public constructor(props: OrganizationCreditPurchaseEntityPropsInterface) {
    super(props);

    this.organization = props.organization;
    this.paidResources = props.paidResources;
    this.creditAmount = props.creditAmount;
    this.customer = props.customer;
  }
}
