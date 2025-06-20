import { Column, Entity, OneToMany } from 'typeorm';

import { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan/payment-plan-cycle.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AvailablePaymentPlanTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.typeorm.entity.props.interface';
import { AvailablePaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan/available-payment-plan-enabled-paid-resource/available-payment-plan-enabled-paid-resource.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';

@Entity({ name: 'available_payment_plan' })
export class AvailablePaymentPlanTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 50 })
  public name: string;

  @Column({ name: 'description', type: 'varchar', length: 50 })
  public description: string;

  @Column({ name: 'price', type: 'decimal', length: 50 })
  public price: DecimalValue;

  @Column({ name: 'max_member_limit', type: 'number', length: 50 })
  public maxMemberLimit: number;

  @Column({ name: 'monthly_credit_amount', type: 'number', length: 50 })
  public monthlyCreditAmount: number;

  @Column({ name: 'active', type: 'bool', length: 50 })
  public active: boolean;

  @Column({ name: 'cycle', type: 'enum', length: 50 })
  public cycle: PaymentPlanCycleEnum;

  @OneToMany(
    () => AvailablePaymentPlanEnabledPaidResourceTypeormEntity,
    (entity) => entity.availablePaymentPlan,
  )
  public availablePaymentPlan:
    | AvailablePaymentPlanEnabledPaidResourceTypeormEntity[]
    | undefined;

  protected readonly _type = AvailablePaymentPlanTypeormEntity.name;

  public constructor(props?: AvailablePaymentPlanTypeormEntityPropsInterface) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.maxMemberLimit = props.maxMemberLimit;
    this.monthlyCreditAmount = props.monthlyCreditAmount;
    this.active = props.active;
    this.cycle = props.cycle;
    this.availablePaymentPlan = props.availablePaymentPlan;
  }
}
