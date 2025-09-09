import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';

@Entity({ name: 'customer' })
export class CustomerTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 20 })
  public phoneNumber: string;

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

  @OneToOne(() => CustomerAddressTypeormEntity, (entity) => entity.customer, {
    nullable: false,
  })
  @JoinColumn({
    name: 'customer_address_id',
  })
  public customerAddress?: CustomerAddressTypeormEntity;

  @OneToOne(() => AuthIdentityTypeormEntity, (entity) => entity.customer)
  public authIdentity?: AuthIdentityTypeormEntity;

  @OneToMany(() => OrganizationMemberTypeormEntity, (entity) => entity.customer)
  public organizationMember?: OrganizationMemberTypeormEntity[];

  protected override readonly _type = CustomerTypeormEntity.name;
}
