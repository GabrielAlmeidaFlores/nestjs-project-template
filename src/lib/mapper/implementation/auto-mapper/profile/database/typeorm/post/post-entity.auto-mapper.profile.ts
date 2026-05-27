import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PostTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/post.typeorm.entity';
import { GetPostQueryResult } from '@module/client/post/domain/repository/post/query/result/get-post.query.result';
import { PostEntity } from '@module/client/post/domain/schema/entity/post/post.entity';
import { PostEntityPropsInputModel } from '@module/client/post/domain/schema/entity/post/post.entity.props.input.model';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

@Injectable()
export class PostEntityAutoMapperProfile {
  protected readonly _type = PostEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (source: PostTypeormEntity): PostEntity =>
      new PostEntity(
        PostEntityPropsInputModel.build({
          id: new PostId(source.id),
          authorId: new UserId(source.authorId),
          content: source.content,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        }),
      );

    createMap(
      this.mapper,
      PostTypeormEntity,
      PostEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (source: PostEntity): PostTypeormEntity =>
      PostTypeormEntity.build({
        id: source.id.toString(),
        authorId: source.authorId.toString(),
        content: source.content,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    createMap(
      this.mapper,
      PostEntity,
      PostTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (source: PostTypeormEntity): GetPostQueryResult =>
      GetPostQueryResult.build({
        id: new PostId(source.id),
        authorId: new UserId(source.authorId),
        content: source.content,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    createMap(
      this.mapper,
      PostTypeormEntity,
      GetPostQueryResult,
      constructUsing(convert),
    );
  }
}
