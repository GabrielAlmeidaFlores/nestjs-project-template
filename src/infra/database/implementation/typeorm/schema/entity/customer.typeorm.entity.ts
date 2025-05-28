import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { HashTransformer } from '@infra/database/implementation/typeorm/schema/transformer/hash.transformer';
import { RequireBuildMethod } from '@shared/system/decorator/class/require-build-method/require-build-method.decorator';
import { PublicPropertyType } from '@shared/system/type/public-property.type';

@Entity({ name: 'customer' })
@RequireBuildMethod<CustomerTypeormEntity>()
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

  public constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
    name: string,
    email: string,
    federalDocument: string,
    phoneNumber: string,
    password: string,
    profilePicture: string | null,
    mfaSecret: string | null,
    city: string,
    neighborhood: string,
    countryState: string,
    postalCode: string,
    addressNumber: string,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.name = name;
    this.email = email;
    this.federalDocument = federalDocument;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.profilePicture = profilePicture;
    this.mfaSecret = mfaSecret;
    this.city = city;
    this.neighborhood = neighborhood;
    this.countryState = countryState;
    this.postalCode = postalCode;
    this.addressNumber = addressNumber;
  }

  public static build(
    props: PublicPropertyType<CustomerTypeormEntity>,
  ): CustomerTypeormEntity {
    return new CustomerTypeormEntity(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
      props.name,
      props.email,
      props.federalDocument,
      props.phoneNumber,
      props.password,
      props.profilePicture,
      props.mfaSecret,
      props.city,
      props.neighborhood,
      props.countryState,
      props.postalCode,
      props.addressNumber,
    );
  }
}
