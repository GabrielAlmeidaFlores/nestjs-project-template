import { BaseAuditableEntity } from '@core/domain/schema/entity/base/base-auditable/base-auditable.entity';

import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { OrganizationCreditPurchaseEntityPropsInterface } from '@core/domain/schema/entity/organization-credit/organization-credit-purchase/organization-credit-purchase.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class OrganizationCreditPurchaseEntity extends BaseAuditableEntity<CustomerEntity> {
  public readonly creditAmount: number;
  public readonly organization: RelationModel<OrganizationEntity>;
  public readonly bankPayment: RelationModel<BankPaymentEntity>;

  protected readonly _type = OrganizationCreditPurchaseEntity.name;

  public constructor(props: OrganizationCreditPurchaseEntityPropsInterface) {
    super(props);

    this.organization = props.organization;
    this.bankPayment = props.bankPayment;
    this.creditAmount = props.creditAmount;
  }
}
