import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationPaymentPlanBankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-bank-payment.typeorm.entity';
import { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';

@Entity({ name: 'bank_payment' })
export class BankPaymentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'bank_external_id',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  public bankExternalId: string;

  @Column({
    name: 'payment_method',
    type: 'simple-enum',
    enum: PaymentMethodEnum,
  })
  public paymentMethod: PaymentMethodEnum;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  public amount: string;

  @Column({
    name: 'status',
    type: 'simple-enum',
    enum: PaymentStatusEnum,
  })
  public status: PaymentStatusEnum;

  @Column({ name: 'due_date', type: 'timestamp' })
  public dueDate: Date;

  @Column({ name: 'payment_date', type: 'timestamp', nullable: true })
  public paymentDate: Date | null;

  @Column({ name: 'installment_number', type: 'int', nullable: true })
  public installmentNumber: number | null;

  @OneToMany(
    () => OrganizationPaymentPlanBankPaymentTypeormEntity,
    (entity) => entity.bankPayment,
  )
  public organizationPaymentPlanBankPayment?:
    | OrganizationPaymentPlanBankPaymentTypeormEntity[]
    | undefined;

  protected override readonly _type = BankPaymentTypeormEntity.name;
}
