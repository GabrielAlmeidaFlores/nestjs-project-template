import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CommentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/comment.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CommentQueryRepositoryGateway } from '@module/social/comment/domain/repository/comment/query/comment.query.repository.gateway';
import { GetCommentQueryResult } from '@module/social/comment/domain/repository/comment/query/result/get-comment.query.result';
import { CommentId } from '@module/social/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

@Injectable()
export class CommentTypeormQueryRepository
  extends BaseTypeormQueryRepository<CommentTypeormEntity>
  implements CommentQueryRepositoryGateway
{
  protected readonly _type = CommentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CommentTypeormEntity)
    repository: Repository<CommentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneCommentById(
    id: CommentId,
  ): Promise<GetCommentQueryResult | null> {
    const data = await this.findOne({ where: { id: id.toString() } });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      CommentTypeormEntity,
      GetCommentQueryResult,
    );
  }

  public async listCommentsByPostId(
    postId: PostId,
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetCommentQueryResult>> {
    const result = await this.list(pagination, {
      where: { postId: postId.toString() },
      order: { createdAt: 'ASC' },
    });

    const resource = result.resource.map((item) =>
      this.mapperGateway.map(item, CommentTypeormEntity, GetCommentQueryResult),
    );

    return new ListDataOutputModel({ page: result.page, limit: result.limit, totalItems: result.totalItems, resource });
  }
}
