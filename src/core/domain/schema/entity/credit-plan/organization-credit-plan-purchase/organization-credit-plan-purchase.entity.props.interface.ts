import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { AvailableCreditPlanEntity } from '@core/domain/schema/entity/credit-plan/available-credit-plan/available-credit-plan.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export interface OrganizationCreditPlanPurchaseEntityPropsInterface
  extends BaseEntityPropsInterface {
  price: DecimalValue;
  creditAmount: number;
  active: boolean;
  creditPlan: AvailableCreditPlanEntity;
  organization: RelationModel<OrganizationEntity>;
  bankPayment: RelationModel<BankPaymentEntity>;
}
