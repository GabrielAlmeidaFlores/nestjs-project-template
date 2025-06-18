import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer/customer.typeorm.entity';
import { CustomerAddressTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/customer/customer-address/customer-address.typeorm.entity.props.interface';
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
  public customer: CustomerEntity;

  protected readonly _type = CustomerAddressTypeormEntity.name;

  public constructor(props?: CustomerAddressTypeormEntityPropsInterface) {
    super(props);

    const isConstructedByOrm = props === undefined;

    if (isConstructedByOrm) {
      return;
    }

    this.postalCode = props.postalCode;
    this.stateCode = props.stateCode;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.addressNumber = props.addressNumber;
    this.customer = props.customer;
  }
}
