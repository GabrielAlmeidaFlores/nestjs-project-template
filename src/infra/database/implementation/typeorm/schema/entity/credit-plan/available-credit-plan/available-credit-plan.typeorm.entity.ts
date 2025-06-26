import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';
import { AvailableCreditPlanTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/credit-plan/available-credit-plan/available-credit-plan.typeorm.entity.props.interface';
import { OrganizationCreditPlanPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-plan/organization-credit-plan-purchase/organization-credit-plan-purchase.typeorm.entity';

@Entity({ name: 'available_credit_plan' })
export class AvailableCreditPlanTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'price', type: 'decimal' })
  public price: string;

  @Column({ name: 'credit_amount', type: 'number' })
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

  protected readonly _type = AvailableCreditPlanTypeormEntity.name;

  public constructor(props?: AvailableCreditPlanTypeormEntityPropsInterface) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.price = props.price;
    this.creditAmount = props.creditAmount;
    this.active = props.active;
    this.organizationCreditPlan = props.organizationCreditPlan;
  }
}
