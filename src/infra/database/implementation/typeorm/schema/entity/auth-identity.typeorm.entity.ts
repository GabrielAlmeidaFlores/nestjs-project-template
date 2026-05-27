import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { HashTransformer } from '@infra/database/implementation/typeorm/schema/transformer/hash.transformer';

@Entity({ name: 'auth_identity' })
export class AuthIdentityTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  public email: string;

  @Column({
    name: 'password',
    type: 'char',
    length: 60,
    transformer: HashTransformer,
  })
  public password: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;

  protected override readonly _type = AuthIdentityTypeormEntity.name;
}
