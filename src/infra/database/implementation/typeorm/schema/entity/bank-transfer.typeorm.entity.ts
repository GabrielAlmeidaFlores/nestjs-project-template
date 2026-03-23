import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';
import { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';

@Entity({ name: 'bank_transfer' })
export class BankTransferTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'bank_external_id',
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: true,
  })
  public bankExternalId: string | null;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  public amount: string;

  @Column({ name: 'status', type: 'simple-enum', enum: TransferStatusEnum })
  public status: TransferStatusEnum;

  @Column({ name: 'pix_address_key', type: 'varchar', length: 255 })
  public pixAddressKey: string;

  @Column({
    name: 'pix_address_key_type',
    type: 'simple-enum',
    enum: PixAddressKeyTypeEnum,
  })
  public pixAddressKeyType: PixAddressKeyTypeEnum;

  @Column({
    name: 'transfer_date',
    type: 'timestamp',
    nullable: true,
    transformer: DateTransformer,
  })
  public transferDate: Date | null;

  @Column({ name: 'description', type: 'text', nullable: true })
  public description: string | null;

  protected override readonly _type = BankTransferTypeormEntity.name;
}
