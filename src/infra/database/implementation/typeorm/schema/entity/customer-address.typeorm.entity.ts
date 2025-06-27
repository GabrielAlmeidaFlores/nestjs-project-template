import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';

@Entity({ name: 'customer_address' })
export class CustomerAddressTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'postal_code',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
  })
  public postalCode: string;

  @Column({
    name: 'state_code',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
  })
  public stateCode: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
  })
  public city: string;

  @Column({
    name: 'neighborhood',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
  })
  public neighborhood: string;

  @Column({
    name: 'addressNumber',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
  })
  public addressNumber: string;

  @OneToOne(() => CustomerTypeormEntity, (entity) => entity.customerAddress)
  @JoinColumn({
    name: 'customer_id',
  })
  public customer: CustomerTypeormEntity;

  protected override readonly _type = CustomerAddressTypeormEntity.name;
}
