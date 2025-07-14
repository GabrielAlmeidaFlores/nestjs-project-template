import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { BaseAuditableEntityPropsInterface } from '@core/domain/schema/entity/base/base-auditable/base-auditable.entity.props.interface';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface OrganizationCreditPurchaseEntityPropsInterface
  extends BaseAuditableEntityPropsInterface<CustomerEntity> {
  organization: RelationModel<OrganizationEntity>;
  bankPayment: RelationModel<BankPaymentEntity>;
  creditAmount: number;
}
