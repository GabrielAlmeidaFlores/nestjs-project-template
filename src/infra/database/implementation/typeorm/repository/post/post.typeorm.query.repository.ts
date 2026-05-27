import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PostTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/post.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PostQueryRepositoryGateway } from '@module/social/post/domain/repository/post/query/post.query.repository.gateway';
import { GetPostQueryResult } from '@module/social/post/domain/repository/post/query/result/get-post.query.result';
import { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

@Injectable()
export class PostTypeormQueryRepository
  extends BaseTypeormQueryRepository<PostTypeormEntity>
  implements PostQueryRepositoryGateway
{
  protected readonly _type = PostTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PostTypeormEntity)
    repository: Repository<PostTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOnePostById(
    id: PostId,
  ): Promise<GetPostQueryResult | null> {
    const data = await this.findOne({ where: { id: id.toString() } });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(data, PostTypeormEntity, GetPostQueryResult);
  }

  public async listPosts(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetPostQueryResult>> {
    const result = await this.list(pagination, { order: { createdAt: 'DESC' } });

    const resource = result.resource.map((item) =>
      this.mapperGateway.map(item, PostTypeormEntity, GetPostQueryResult),
    );

    return new ListDataOutputModel({ page: result.page, limit: result.limit, totalItems: result.totalItems, resource });
  }

  public async listPostsByAuthorId(
    authorId: UserId,
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetPostQueryResult>> {
    const result = await this.list(pagination, {
      where: { authorId: authorId.toString() },
      order: { createdAt: 'DESC' },
    });

    const resource = result.resource.map((item) =>
      this.mapperGateway.map(item, PostTypeormEntity, GetPostQueryResult),
    );

    return new ListDataOutputModel({ page: result.page, limit: result.limit, totalItems: result.totalItems, resource });
  }
}
