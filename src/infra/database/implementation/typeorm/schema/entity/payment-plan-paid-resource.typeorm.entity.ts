import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enabled-paid-resource.typeorm.entity';
import { PaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enabled-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceIaConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource-ia-config.typeorm.entity';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

@Entity({ name: 'payment_plan_paid_resource' })
export class PaymentPlanPaidResourceTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'resource',
    type: 'simple-enum',
    enum: PaymentPlanPaidResourceTypeEnum,
    unique: true,
  })
  public resource: PaymentPlanPaidResourceTypeEnum;

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
    () => PaymentPlanEnabledPaidResourceTypeormEntity,
    (entity) => entity.paymentPlan,
  )
  public paymentPlanEnabledPaidResource?:
    | PaymentPlanEnabledPaidResourceTypeormEntity[]
    | undefined;

  @OneToMany(
    () => OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
    (entity) => entity.organizationPaymentPlan,
  )
  public organizationPaymentPlanEnabledPaidResource?:
    | OrganizationPaymentPlanEnabledPaidResourceTypeormEntity[]
    | undefined;

  @OneToOne(
    () => PaymentPlanPaidResourceIaConfigTypeormEntity,
    (entity) => entity.paymentPlanPaidResource,
  )
  public paymentPlanPaidResourceIaConfig?:
    | PaymentPlanPaidResourceIaConfigTypeormEntity
    | undefined;

  protected override readonly _type = PaymentPlanPaidResourceTypeormEntity.name;
}
