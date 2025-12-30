import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationCreditUsageId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/value-object/organization-credit-usage-id/organization-credit-usage-id.value-object';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { OrganizationCreditUsageEntityPropsInterface } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/organization-credit-usage.entity.props.interface';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export class OrganizationCreditUsageEntity extends BaseEntity<OrganizationCreditUsageId> {
  public readonly creditAmount: number;
  public readonly paymentPlanPaidResource: PaymentPlanPaidResourceId;
  public readonly createdBy: OrganizationMemberId | null;

  protected readonly _type = OrganizationCreditUsageEntity.name;

  public constructor(props: OrganizationCreditUsageEntityPropsInterface) {
    super(OrganizationCreditUsageId, props);

    this.creditAmount = props.creditAmount;
    this.paymentPlanPaidResource = props.paymentPlanPaidResource;
    this.createdBy = props.createdBy ?? null;
  }
}
