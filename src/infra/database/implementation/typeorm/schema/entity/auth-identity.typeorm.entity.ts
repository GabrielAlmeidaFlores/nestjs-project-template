import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { HashTransformer } from '@infra/database/implementation/typeorm/schema/transformer/hash.transformer';

@Entity({ name: 'auth_identity' })
export class AuthIdentityTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  public email: string;

  @Column({
    name: 'federal_document',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
    unique: true,
  })
  public federalDocument: string;

  @Column({
    name: 'password',
    type: 'char',
    length: 60,
    transformer: HashTransformer,
  })
  public password: string;

  @Column({
    name: 'authenticator_app_secret',
    type: 'varchar',
    length: 255,
    nullable: true,
    transformer: CryptographyTransformer,
  })
  public authenticatorAppSecret: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;

  @OneToOne(() => CustomerTypeormEntity, (entity) => entity.authIdentity, {
    nullable: true,
  })
  @JoinColumn({
    name: 'customer_id',
  })
  public customer?: CustomerTypeormEntity | undefined;

  @OneToOne(() => AdminTypeormEntity, (entity) => entity.authIdentity, {
    nullable: true,
  })
  @JoinColumn({
    name: 'admin_id',
  })
  public admin?: AdminTypeormEntity | undefined;

  @OneToOne(
    () => SupportAttendantTypeormEntity,
    (entity) => entity.authIdentity,
    {
      nullable: true,
    },
  )
  @JoinColumn({
    name: 'support_attendant_id',
  })
  public supportAttendant?: SupportAttendantTypeormEntity | undefined;

  protected override readonly _type = AuthIdentityTypeormEntity.name;
}
