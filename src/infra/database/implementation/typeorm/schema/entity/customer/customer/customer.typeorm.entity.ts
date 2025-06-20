import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';
import { CustomerTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/customer/customer/customer.typeorm.entity.props.interface';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization/organization-member/organization-member.typeorm.entity';
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
    type: 'decimal',
    length: 50,
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
    this.bankExternalId = props.bankExternalId;
    this.profilePicture = props.profilePicture;
    this.mfaSecret = props.mfaSecret;
    this.organizationMember = props.organizationMember;
  }
}
