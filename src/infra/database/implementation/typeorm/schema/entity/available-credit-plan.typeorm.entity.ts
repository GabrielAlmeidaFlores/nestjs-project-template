import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base.typeorm.entity';
import { OrganizationCreditPlanPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-plan-purchase.typeorm.entity';

@Entity({ name: 'available_credit_plan' })
export class AvailableCreditPlanTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'price', type: 'decimal' })
  public price: string;

  @Column({ name: 'credit_amount', type: 'int' })
  public creditAmount: number;

  @Column({ name: 'active', type: 'boolean' })
  public active: boolean;

  @OneToMany(
    () => OrganizationCreditPlanPurchaseTypeormEntity,
    (entity) => entity.organization,
  )
  public organizationCreditPlan:
    | OrganizationCreditPlanPurchaseTypeormEntity[]
    | undefined;

  protected override readonly _type = AvailableCreditPlanTypeormEntity.name;
}
