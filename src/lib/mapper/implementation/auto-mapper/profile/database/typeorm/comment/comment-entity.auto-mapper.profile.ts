import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CommentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/comment.typeorm.entity';
import { GetCommentQueryResult } from '@module/client/comment/domain/repository/comment/query/result/get-comment.query.result';
import { CommentEntity } from '@module/client/comment/domain/schema/entity/comment/comment.entity';
import { CommentEntityPropsInputModel } from '@module/client/comment/domain/schema/entity/comment/comment.entity.props.input.model';
import { CommentId } from '@module/client/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

@Injectable()
export class CommentEntityAutoMapperProfile {
  protected readonly _type = CommentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (source: CommentTypeormEntity): CommentEntity =>
      new CommentEntity(
        CommentEntityPropsInputModel.build({
          id: new CommentId(source.id),
          postId: new PostId(source.postId),
          authorId: new UserId(source.authorId),
          content: source.content,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        }),
      );

    createMap(
      this.mapper,
      CommentTypeormEntity,
      CommentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (source: CommentEntity): CommentTypeormEntity =>
      CommentTypeormEntity.build({
        id: source.id.toString(),
        postId: source.postId.toString(),
        authorId: source.authorId.toString(),
        content: source.content,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    createMap(
      this.mapper,
      CommentEntity,
      CommentTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (source: CommentTypeormEntity): GetCommentQueryResult =>
      GetCommentQueryResult.build({
        id: new CommentId(source.id),
        postId: new PostId(source.postId),
        authorId: new UserId(source.authorId),
        content: source.content,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    createMap(
      this.mapper,
      CommentTypeormEntity,
      GetCommentQueryResult,
      constructUsing(convert),
    );
  }
}
