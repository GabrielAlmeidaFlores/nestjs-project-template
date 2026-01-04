import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationPaymentPlanBankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-bank-payment.typeorm.entity';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enabled-paid-resource.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

@Entity('organization_payment_plan')
export class OrganizationPaymentPlanTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  public description: string;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  public price: string;

  @Column({ name: 'max_member_count', type: 'integer' })
  public maxMemberCount: number;

  @Column({ name: 'monthly_credit_amount', type: 'integer' })
  public monthlyCreditAmount: number;

  @Column({ name: 'cycle', type: 'varchar', length: 100 })
  public cycle: PaymentPlanCycleEnum;

  @Column({ name: 'total_installments', type: 'integer', nullable: true })
  public totalInstallments: number | null;

  @Column({ name: 'bank_external_id', type: 'varchar', length: 100 })
  public bankExternalId: string;

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

  @OneToMany(
    () => OrganizationPaymentPlanBankPaymentTypeormEntity,
    (entity) => entity.organizationPaymentPlan,
  )
  public organizationPaymentPlanBankPayment?:
    | OrganizationPaymentPlanBankPaymentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
    (entity) => entity.organizationPaymentPlan,
  )
  public organizationPaymentPlanEnabledPaidResource?:
    | OrganizationPaymentPlanEnabledPaidResourceTypeormEntity[]
    | undefined;

  protected override readonly _type = OrganizationPaymentPlanTypeormEntity.name;
}
