import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'organization_payment_plan_affiliate_commission' })
export class OrganizationPaymentPlanAffiliateCommissionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'organization_payment_plan_id',
    type: 'varchar',
    length: 36,
    unique: true,
  })
  public organizationPaymentPlanId: string;

  @Column({ name: 'affiliate_customer_id', type: 'varchar', length: 36 })
  public affiliateCustomerId: string;

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
