import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'customer' })
export class CustomerTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({
    name: 'profile_picture',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public profilePicture: string | null;

  @Column({ name: 'bank_external_id', type: 'varchar', length: 100 })
  public bankExternalId: string;

  @OneToOne(() => CustomerAddressTypeormEntity, (entity) => entity.customer, {
    nullable: false,
  })
  @JoinColumn({
    name: 'customer_address_id',
  })
  public customerAddress?: CustomerAddressTypeormEntity | undefined;

  @OneToOne(() => AuthIdentityTypeormEntity, (entity) => entity.customer)
  public authIdentity?: AuthIdentityTypeormEntity | undefined;

  @OneToMany(() => OrganizationMemberTypeormEntity, (entity) => entity.customer)
  public organizationMember?: OrganizationMemberTypeormEntity[] | undefined;

  @OneToMany(
    () => CustomerTermsAcceptanceTypeormEntity,
    (entity) => entity.customer,
  )
  public termsAccepted?: CustomerTermsAcceptanceTypeormEntity[] | undefined;

  protected override readonly _type = CustomerTypeormEntity.name;
}
