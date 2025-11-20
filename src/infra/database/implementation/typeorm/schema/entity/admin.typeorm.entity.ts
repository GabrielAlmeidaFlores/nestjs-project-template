import { Column, Entity, OneToOne } from 'typeorm';

import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'admin' })
export class AdminTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @OneToOne(() => AuthIdentityTypeormEntity, (entity) => entity.admin)
  public authIdentity?: AuthIdentityTypeormEntity | undefined;

  protected override readonly _type = AdminTypeormEntity.name;
}
