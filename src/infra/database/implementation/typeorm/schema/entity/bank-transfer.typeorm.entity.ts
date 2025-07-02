import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'bank_transfer' })
export class BankTransferTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bank_external_id', type: 'varchar', length: 100 })
  public bankExternalId: string;

  @Column({ name: 'description', type: 'varchar', length: 150 })
  public description: string;

  @Column({ name: 'transfer_method', type: 'varchar', length: 50 })
  public transferMethod: string;

  @Column({
    name: 'value',
    type: 'decimal',
  })
  public value: string;

  @Column({ name: 'net_value', type: 'decimal' })
  public netValue: string;

  @Column({ name: 'status', type: 'varchar', length: 50 })
  public status: string;

  @Column({ name: 'effective_date', type: 'date', nullable: true })
  public effectiveDate: Date | null;

  @Column({ name: 'schedule_date', type: 'date', nullable: true })
  public scheduleDate: Date | null;

  @Column({ name: 'fail_reason', type: 'varchar', nullable: true })
  public failReason: string | null;

  @ManyToOne(() => BankPaymentTypeormEntity, (entity) => entity.bankTransfer)
  @JoinColumn({ name: 'bank_payment_id' })
  public bankPayment: BankPaymentTypeormEntity;

  protected override readonly _type = BankTransferTypeormEntity.name;
}
