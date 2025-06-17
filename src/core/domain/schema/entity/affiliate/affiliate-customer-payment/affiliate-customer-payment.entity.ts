import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { AffiliateCustomerPaymentEntityPropsInterface } from '@core/domain/schema/entity/affiliate/affiliate-customer-payment/affiliate-customer-payment.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AffiliateCustomerPaymentEntity extends BaseEntity {
  public readonly affiliateCustomerId: Guid;
  public readonly bankTransferId: Guid;

  protected readonly _type = AffiliateCustomerPaymentEntity.name;

  public constructor(props: AffiliateCustomerPaymentEntityPropsInterface) {
    super(props);

    this.affiliateCustomerId = props.affiliateCustomerId;
    this.bankTransferId = props.bankTransferId;
  }
}
