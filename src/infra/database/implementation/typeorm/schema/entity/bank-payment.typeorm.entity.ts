import { Column, Entity, OneToMany } from 'typeorm';

import { PaymentMethodEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-status.enum';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-transfer.typeorm.entity';
import { BaseAuditableTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base-auditable.typeorm.entity';
import { OrganizationCreditPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-purchase.typeorm.entity';

@Entity({ name: 'bank_payment' })
export class BankPaymentTypeormEntity extends BaseAuditableTypeormEntity {
  @Column({ name: 'bank_external_id', type: 'varchar', length: 100 })
  public bankExternalId: string;

  @Column({
    name: 'payment_method',
    type: 'simple-enum',
    enum: PaymentMethodEnum,
  })
  public paymentMethod: PaymentMethodEnum;

  @Column({
    name: 'value',
    type: 'decimal',
  })
  public value: string;

  @Column({ name: 'net_value', type: 'decimal' })
  public netValue: string;

  @Column({ name: 'discount_percentage', type: 'int' })
  public discountPercentage: number;

  @Column({ name: 'status', type: 'simple-enum', enum: PaymentStatusEnum })
  public status: PaymentStatusEnum;

  @Column({ name: 'due_date', type: 'date' })
  public dueDate: Date;

  @Column({ name: 'payment_date', type: 'date', nullable: true })
  public paymentDate: Date | null;

  @Column({ name: 'installment_number', type: 'int', nullable: true })
  public installmentNumber: number | null;

  @Column({ name: 'costumer_confirm_date', type: 'date', nullable: true })
  public costumerConfirmDate: Date | null;

  @Column({ name: 'pix_qr_code', type: 'varchar', nullable: true })
  public pixQrCode: string | null;

  @OneToMany(() => BankTransferTypeormEntity, (entity) => entity.bankPayment)
  public bankTransfer: BankTransferTypeormEntity[] | undefined;

  @OneToMany(
    () => OrganizationCreditPurchaseTypeormEntity,
    (entity) => entity.bankPayment,
  )
  public organizationCreditPurchase:
    | OrganizationCreditPurchaseTypeormEntity[]
    | undefined;

  protected override readonly _type = BankPaymentTypeormEntity.name;
}
