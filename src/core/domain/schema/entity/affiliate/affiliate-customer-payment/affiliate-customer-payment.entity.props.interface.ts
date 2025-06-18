import type { AffiliateCustomerEntity } from '@core/domain/schema/entity/affiliate/affiliate-customer/affiliate-customer.entity';
import type { BankTransferEntity } from '@core/domain/schema/entity/bank/bank-transfer/bank-transfer.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface AffiliateCustomerPaymentEntityPropsInterface
  extends BaseEntityPropsInterface {
  affiliateCustomer: AffiliateCustomerEntity;
  bankTransfer: RelationModel<BankTransferEntity>;
}
