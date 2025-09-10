import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
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

  @OneToOne(() => CustomerTypeormEntity, (entity) => entity.authIdentity, {
    nullable: true,
  })
  @JoinColumn({
    name: 'customer_id',
  })
  public customer?: CustomerTypeormEntity | undefined;

  protected override readonly _type = AuthIdentityTypeormEntity.name;
}
