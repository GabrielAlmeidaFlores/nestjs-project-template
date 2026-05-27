import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CommentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/comment.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CommentCommandRepositoryGateway } from '@module/social/comment/domain/repository/comment/command/comment.command.repository.gateway';
import { CommentEntity } from '@module/social/comment/domain/schema/entity/comment/comment.entity';
import { CommentId } from '@module/social/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';

@Injectable()
export class CommentTypeormCommandRepository
  extends BaseTypeormCommandRepository<CommentTypeormEntity>
  implements CommentCommandRepositoryGateway
{
  protected readonly _type = CommentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CommentTypeormEntity)
    repository: Repository<CommentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createComment(entity: CommentEntity): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      CommentEntity,
      CommentTypeormEntity,
    );
    return this.create(mapped);
  }

  public deleteComment(commentId: CommentId): TransactionType {
    return this.delete(commentId.toString());
  }
}
