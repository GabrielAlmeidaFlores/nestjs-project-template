import { Column, Entity, OneToMany } from 'typeorm';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationPaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enable-paid-resource.typeorm.entity';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { PaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enable-paid-resource.typeorm.entity';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

@Entity({ name: 'payment_plan' })
export class PaymentPlanTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'description', type: 'varchar', length: 100 })
  public description: string;

  @Column({ name: 'price', type: 'decimal' })
  public price: DecimalValue;

  @Column({ name: 'maxMemberCount', type: 'integer' })
  public maxMemberCount: number;

  @Column({ name: 'mounthlyCreditAmount', type: 'integer' })
  public mounthlyCreditAmount: number;

  @Column({ name: 'active', type: 'boolean' })
  public active: boolean;

  @Column({ name: 'cycle', type: 'varchar', length: 100 })
  public cycle: PaymentPlanCycleEnum;

  @OneToMany(
    () => OrganizationPaymentPlanTypeormEntity,
    (entity) => entity.paymentPlan,
  )
  public organizationPaymentPlan?:
    | OrganizationPaymentPlanTypeormEntity[]
    | undefined;

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

  protected override readonly _type = PaymentPlanTypeormEntity.name;
}
