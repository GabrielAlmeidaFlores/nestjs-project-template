import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';
import { InvalidCommissionPercentageError } from '@module/customer/payment-plan/error/invalid-commission-percentage.error';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { OrganizationPaymentPlanAffiliateCommissionEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission.entity.props.interface';

export class OrganizationPaymentPlanAffiliateCommissionEntity extends BaseEntity<OrganizationPaymentPlanAffiliateCommissionId> {
  @Description('Plano de pagamento ao qual esta comissão pertence')
  public readonly organizationPaymentPlan: OrganizationPaymentPlanId;

  @Description('Afiliado que receberá a comissão')
  public readonly affiliateCustomer: AffiliateCustomerId;

  @Description('Percentual de comissão congelado no momento da contratação')
  public readonly commissionPercentage: number;

  protected readonly _type =
    OrganizationPaymentPlanAffiliateCommissionEntity.name;

  private readonly maximumPercentage: number;

  public constructor(
    props: OrganizationPaymentPlanAffiliateCommissionEntityPropsInterface,
  ) {
    super(OrganizationPaymentPlanAffiliateCommissionId, props);

    this.maximumPercentage = 90;

    if (props.commissionPercentage > this.maximumPercentage) {
      throw new InvalidCommissionPercentageError({
        maxPercentage: this.maximumPercentage,
      });
    }

    this.organizationPaymentPlan = props.organizationPaymentPlan;
    this.affiliateCustomer = props.affiliateCustomer;
    this.commissionPercentage = props.commissionPercentage;
  }
}
