import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { AffiliateCustomerEntity } from '@core/domain/schema/entity/affiliate/affiliate-customer/affiliate-customer.entity';
import type { AffiliateCustomerPaymentEntityPropsInterface } from '@core/domain/schema/entity/affiliate/affiliate-customer-payment/affiliate-customer-payment.entity.props.interface';
import type { BankTransferEntity } from '@core/domain/schema/entity/bank/bank-transfer/bank-transfer.entity';
import type { RelationType } from '@core/domain/schema/type/relation.type';

export class AffiliateCustomerPaymentEntity extends BaseEntity {
  public readonly affiliateCustomer: AffiliateCustomerEntity;
  public readonly bankTransfer: RelationType<BankTransferEntity>;

  protected readonly _type = AffiliateCustomerPaymentEntity.name;

  public constructor(props: AffiliateCustomerPaymentEntityPropsInterface) {
    super(props);

    this.affiliateCustomer = props.affiliateCustomer;
    this.bankTransfer = props.bankTransfer;
  }
}
