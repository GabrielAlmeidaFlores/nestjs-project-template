import { Column, Entity, OneToMany } from 'typeorm';

import { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan/payment-plan-cycle.enum';
import { AvailablePaymentPlanTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.typeorm.entity.props.interface';
import { AvailablePaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan/available-payment-plan-enabled-paid-resource/available-payment-plan-enabled-paid-resource.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';

@Entity({ name: 'available_payment_plan' })
export class AvailablePaymentPlanTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 50 })
  public name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  public description: string;

  @Column({ name: 'price', type: 'decimal' })
  public price: string;

  @Column({ name: 'max_member_limit', type: 'int' })
  public maxMemberLimit: number;

  @Column({ name: 'monthly_credit_amount', type: 'int' })
  public monthlyCreditAmount: number;

  @Column({ name: 'active', type: 'boolean' })
  public active: boolean;

  @Column({ name: 'cycle', type: 'simple-enum', enum: PaymentPlanCycleEnum })
  public cycle: PaymentPlanCycleEnum;

  @OneToMany(
    () => AvailablePaymentPlanEnabledPaidResourceTypeormEntity,
    (entity) => entity.availablePaymentPlan,
  )
  public availablePaymentPlanEnabledPaidResource:
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
    this.availablePaymentPlanEnabledPaidResource =
      props.availablePaymentPlanEnabledPaidResource;
  }
}
