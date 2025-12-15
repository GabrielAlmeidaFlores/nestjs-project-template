import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';

@Entity({ name: 'organization_payment_plan_bank_payment' })
export class OrganizationPaymentPlanBankPaymentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'organization_payment_plan_id',
    type: 'uuid',
  })
  public organizationPaymentPlanId: string;

  @Column({
    name: 'bank_payment_id',
    type: 'uuid',
  })
  public bankPaymentId: string;

  @ManyToOne(() => OrganizationPaymentPlanTypeormEntity)
  @JoinColumn({ name: 'organization_payment_plan_id' })
  public organizationPaymentPlan?: OrganizationPaymentPlanTypeormEntity;

  @ManyToOne(() => BankPaymentTypeormEntity)
  @JoinColumn({ name: 'bank_payment_id' })
  public bankPayment?: BankPaymentTypeormEntity;

  protected override readonly _type =
    OrganizationPaymentPlanBankPaymentTypeormEntity.name;
}
