import { Column, Entity, OneToMany } from 'typeorm';

import { PaymentMethodEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-status.enum';
import { BankPaymentTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/bank/bank-payment/bank-payment.typeorm.entity.props.interface';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank/bank-transfer/bank-transfer.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';

@Entity({ name: 'bank_payment' })
export class BankPaymentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bank_external_id', type: 'varchar', length: 100 })
  public bankExternalId: string;

  @Column({ name: 'payment_method', type: 'simple-enum' })
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

  @Column({ name: 'status', type: 'simple-enum' })
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

  protected readonly _type = BankPaymentTypeormEntity.name;

  public constructor(props?: BankPaymentTypeormEntityPropsInterface) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.bankExternalId = props.bankExternalId;
    this.paymentMethod = props.paymentMethod;
    this.value = props.value;
    this.netValue = props.netValue;
    this.discountPercentage = props.discountPercentage;
    this.status = props.status;
    this.dueDate = props.dueDate;
    this.paymentDate = props.paymentDate ?? null;
    this.installmentNumber = props.installmentNumber ?? null;
    this.costumerConfirmDate = props.costumerConfirmDate ?? null;
    this.pixQrCode = props.pixQrCode ?? null;
    this.bankTransfer = props.bankTransfer;
  }
}
