import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';
import { AvailableCreditPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-plan/available-credit-plan/available-credit-plan.typeorm.entity';
import { OrganizationCreditPlanPurchaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/credit-plan/organization-credit-plan-purchase/organization-credit-plan-purchase.typeorm.entity.props.interface';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization/organization/organization.typeorm.entity';

@Entity({ name: 'organization_credit_plan_purchase' })
export class OrganizationCreditPlanPurchaseTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'price', type: 'decimal' })
  public price: string;

  @Column({ name: 'credit_amount', type: 'number' })
  public creditAmount: number;

  @Column({ name: 'active', type: 'boolean' })
  public active: boolean;

  @ManyToOne(
    () => OrganizationTypeormEntity,
    (entity) => entity.organizationCreditPlanPurchase,
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationTypeormEntity;

  @ManyToOne(
    () => AvailableCreditPlanTypeormEntity,
    (entity) => entity.organizationCreditPlan,
  )
  @JoinColumn({ name: 'available_credit_plan_id' })
  public availableCreditPlan: AvailableCreditPlanTypeormEntity;

  protected readonly _type = OrganizationCreditPlanPurchaseTypeormEntity.name;

  public constructor(
    props?: OrganizationCreditPlanPurchaseTypeormEntityPropsInterface,
  ) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.price = props.price;
    this.creditAmount = props.creditAmount;
    this.active = props.active;
    this.organization = props.organization;
    this.availableCreditPlan = props.availableCreditPlan;
  }
}
