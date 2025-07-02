import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { HashTransformer } from '@infra/database/implementation/typeorm/schema/transformer/hash.transformer';

@Entity({ name: 'customer' })
export class CustomerTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'email', type: 'varchar', length: 100 })
  public email: string;

  @Column({
    name: 'federal_document',
    type: 'varchar',
    length: 50,
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
    length: 50,
    nullable: true,
  })
  public profilePicture: string | null;

  @Column({
    name: 'mfa_secret',
    type: 'varchar',
    length: 50,
    nullable: true,
    transformer: CryptographyTransformer,
  })
  public mfaSecret: string | null;

  @Column({
    name: 'bank_external_id',
    type: 'varchar',
    length: 50,
  })
  public bankExternalId: string;

  @OneToMany(() => OrganizationMemberTypeormEntity, (entity) => entity.customer)
  public organizationMember: OrganizationMemberTypeormEntity[] | undefined;

  @OneToOne(() => CustomerAddressTypeormEntity, (entity) => entity.customer)
  public customerAddress: CustomerAddressTypeormEntity | undefined;

  @OneToMany(() => AffiliateCustomerTypeormEntity, (entity) => entity.customer)
  public affiliateCustomer: AffiliateCustomerTypeormEntity[] | undefined;

  protected override readonly _type = CustomerTypeormEntity.name;
}
