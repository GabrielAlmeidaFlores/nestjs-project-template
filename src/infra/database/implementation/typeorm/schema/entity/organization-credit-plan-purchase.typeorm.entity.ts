import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AvailableCreditPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-credit-plan.typeorm.entity';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';

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

  @ManyToOne(() => BankPaymentTypeormEntity, (entity) => entity.bankPayment)
  @JoinColumn({ name: 'bank_payment_id' })
  public bankPayment: BankPaymentTypeormEntity;

  protected override readonly _type =
    OrganizationCreditPlanPurchaseTypeormEntity.name;
}
