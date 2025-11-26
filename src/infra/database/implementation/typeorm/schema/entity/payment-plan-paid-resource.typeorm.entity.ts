import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationPaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enable-paid-resource.typeorm.entity';
import { PaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enable-paid-resource.typeorm.entity';

@Entity({ name: 'payment_plan_paid_resource' })
export class PaymentPlanPaidResourceTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'resource', type: 'varchar', length: 100 })
  public resource: string;

  @Column({ name: 'credit_cost', type: 'double' })
  public creditCost: number;

  @Column({ name: 'description', type: 'varchar', length: 150 })
  public description: string;

  @ManyToOne(() => AdminTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: AdminTypeormEntity | undefined;

  @ManyToOne(() => AdminTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: AdminTypeormEntity | undefined;

  @OneToMany(
    () => PaymentPlanEnablePaidResourceTypeormEntity,
    (entity) => entity.paymentPlan,
  )
  public paymentPlanEnablePaidResource?:
    | PaymentPlanEnablePaidResourceTypeormEntity[]
    | undefined;

  @OneToMany(
    () => OrganizationPaymentPlanEnablePaidResourceTypeormEntity,
    (entity) => entity.paymentPlan,
  )
  public organizationPaymentPlanEnablePaidResource?:
    | OrganizationPaymentPlanEnablePaidResourceTypeormEntity[]
    | undefined;

  protected override readonly _type = PaymentPlanPaidResourceTypeormEntity.name;
}
