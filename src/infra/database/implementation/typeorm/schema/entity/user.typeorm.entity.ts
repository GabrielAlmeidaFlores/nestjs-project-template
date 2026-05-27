import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'users' })
export class UserTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'auth_identity_id', type: 'uuid', unique: true })
  public authIdentityId: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'username', type: 'varchar', length: 50, unique: true })
  public username: string;

  @Column({ name: 'bio', type: 'text', nullable: true })
  public bio: string | null;

  protected override readonly _type = UserTypeormEntity.name;
}
