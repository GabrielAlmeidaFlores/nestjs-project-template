import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

@Entity('organization_payment_plan')
export class OrganizationPaymentPlanTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'description', type: 'varchar', length: 100 })
  public description: string;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  public price: string;

  @Column({ name: 'maxMemberCount', type: 'integer' })
  public maxMemberCount: number;

  @Column({ name: 'monthlyCreditAmount', type: 'integer' })
  public monthlyCreditAmount: number;

  @Column({ name: 'active', type: 'boolean' })
  public active: boolean;

  @Column({ name: 'cycle', type: 'varchar', length: 100 })
  public cycle: PaymentPlanCycleEnum;

  @ManyToOne(
    () => PaymentPlanTypeormEntity,
    (entity) => entity.organizationPaymentPlan,
  )
  @JoinColumn({ name: 'payment_plan_id' })
  public paymentPlan?: PaymentPlanTypeormEntity | undefined;

  @ManyToOne(
    () => OrganizationTypeormEntity,
    (entity) => entity.organizationPaymentPlan,
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationTypeormEntity | undefined;

  protected override readonly _type = OrganizationPaymentPlanTypeormEntity.name;
}
