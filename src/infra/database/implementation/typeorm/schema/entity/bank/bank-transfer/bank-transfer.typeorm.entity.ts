import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { TransferMethodEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-method.enum';
import { TransferStatusEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-status.enum';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank/bank-payment/bank-payment.typeorm.entity';
import { BankTransferTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/bank/bank-transfer/bank-transfer.typeorm.entity.props.interface';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';

@Entity({ name: 'bank_transfer' })
export class BankTransferTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bank_external_id', type: 'varchar', length: 100 })
  public bankExternalId: string;

  @Column({ name: 'description', type: 'varchar', length: 150 })
  public description: string;

  @Column({ name: 'transfer_method', type: 'simple-enum' })
  public transferMethod: TransferMethodEnum;

  @Column({
    name: 'value',
    type: 'decimal',
  })
  public value: string;

  @Column({ name: 'net_value', type: 'decimal' })
  public netValue: string;

  @Column({ name: 'status', type: 'simple-enum' })
  public status: TransferStatusEnum;

  @Column({ name: 'effective_date', type: 'date', nullable: true })
  public effectiveDate: Date | null;

  @Column({ name: 'schedule_date', type: 'date', nullable: true })
  public scheduleDate: Date | null;

  @Column({ name: 'fail_reason', type: 'varchar', nullable: true })
  public failReason: string | null;

  @ManyToOne(() => BankPaymentTypeormEntity, (entity) => entity.bankTransfer)
  @JoinColumn({ name: 'bank_payment_id' })
  public bankPayment: BankPaymentTypeormEntity;

  protected readonly _type = BankTransferTypeormEntity.name;

  public constructor(props?: BankTransferTypeormEntityPropsInterface) {
    super(props);
    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.bankExternalId = props.bankExternalId;
    this.description = props.description;
    this.transferMethod = props.transferMethod;
    this.value = props.value;
    this.netValue = props.netValue;
    this.status = props.status;
    this.effectiveDate = props.effectiveDate ?? null;
    this.scheduleDate = props.scheduleDate ?? null;
    this.failReason = props.failReason ?? null;
    this.bankPayment = props.bankPayment;
  }
}
