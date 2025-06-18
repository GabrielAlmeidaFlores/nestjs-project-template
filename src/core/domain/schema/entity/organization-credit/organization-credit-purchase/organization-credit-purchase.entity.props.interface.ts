import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface OrganizationCreditPurchaseEntityPropsInterface
  extends BaseEntityPropsInterface {
  organization: RelationModel<OrganizationEntity>;
  bankPayment: RelationModel<BankPaymentEntity>;
  creditAmount: number;
}
