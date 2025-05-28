import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base.typeorm.entity';
import { CustomerTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/customer/customer.typeorm.entity.props.interface';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { HashTransformer } from '@infra/database/implementation/typeorm/schema/transformer/hash.transformer';

@Entity({ name: 'customer' })
export class CustomerTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  public email: string;

  @Column({
    name: 'federal_document',
    type: 'varchar',
    length: 255,
    unique: true,
    transformer: CryptographyTransformer,
  })
  public federalDocument: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 20 })
  public phoneNumber: string;

  @Column({
    name: 'password',
    type: 'char',
    length: 60,
    transformer: HashTransformer,
  })
  public password: string;

  @Column({
    name: 'profile_picture',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public profilePicture: string | null;

  @Column({
    name: 'mfa_secret',
    type: 'varchar',
    length: 255,
    nullable: true,
    transformer: CryptographyTransformer,
  })
  public mfaSecret: string | null;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 255,
    transformer: CryptographyTransformer,
  })
  public city: string;

  @Column({
    name: 'neighborhood',
    type: 'varchar',
    length: 255,
    transformer: CryptographyTransformer,
  })
  public neighborhood: string;

  @Column({
    name: 'country_state',
    type: 'varchar',
    length: 255,
    transformer: CryptographyTransformer,
  })
  public countryState: string;

  @Column({
    name: 'postal_code',
    type: 'varchar',
    length: 255,
    transformer: CryptographyTransformer,
  })
  public postalCode: string;

  @Column({
    name: 'address_number',
    type: 'varchar',
    length: 255,
    transformer: CryptographyTransformer,
  })
  public addressNumber: string;

  protected readonly _type = CustomerTypeormEntity.name;

  public constructor(props?: CustomerTypeormEntityPropsInterface) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.name = props.name;
    this.email = props.email;
    this.federalDocument = props.federalDocument;
    this.phoneNumber = props.phoneNumber;
    this.password = props.password;
    this.profilePicture = props.profilePicture ?? null;
    this.mfaSecret = props.mfaSecret ?? null;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.countryState = props.countryState;
    this.postalCode = props.postalCode;
    this.addressNumber = props.addressNumber;
  }
}
