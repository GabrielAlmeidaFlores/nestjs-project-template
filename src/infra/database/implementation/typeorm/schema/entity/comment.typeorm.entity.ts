import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'comments' })
export class CommentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'post_id', type: 'uuid' })
  public postId: string;

  @Column({ name: 'author_id', type: 'uuid' })
  public authorId: string;

  @Column({ name: 'content', type: 'text' })
  public content: string;

  protected override readonly _type = CommentTypeormEntity.name;
}
