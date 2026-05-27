import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'posts' })
export class PostTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'author_id', type: 'uuid' })
  public authorId: string;

  @Column({ name: 'content', type: 'text' })
  public content: string;

  protected override readonly _type = PostTypeormEntity.name;
}
