import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';

@Entity({ name: 'organization_payment_plan_affiliate_commission' })
export class OrganizationPaymentPlanAffiliateCommissionTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => OrganizationPaymentPlanTypeormEntity)
  @JoinColumn({ name: 'organization_payment_plan_id' })
  public organizationPaymentPlan?: OrganizationPaymentPlanTypeormEntity;

  @ManyToOne(() => AffiliateCustomerTypeormEntity)
  @JoinColumn({ name: 'affiliate_customer_id' })
  public affiliateCustomer?: AffiliateCustomerTypeormEntity;

  @Column({
    name: 'commission_percentage',
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  public commissionPercentage: string;

  protected override readonly _type =
    OrganizationPaymentPlanAffiliateCommissionTypeormEntity.name;
}
