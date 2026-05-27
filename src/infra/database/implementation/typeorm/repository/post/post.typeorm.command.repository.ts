import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PostTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/post.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PostCommandRepositoryGateway } from '@module/client/post/domain/repository/post/command/post.command.repository.gateway';
import { PostEntity } from '@module/client/post/domain/schema/entity/post/post.entity';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

@Injectable()
export class PostTypeormCommandRepository
  extends BaseTypeormCommandRepository<PostTypeormEntity>
  implements PostCommandRepositoryGateway
{
  protected readonly _type = PostTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PostTypeormEntity)
    repository: Repository<PostTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPost(entity: PostEntity): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      PostEntity,
      PostTypeormEntity,
    );
    return this.create(mapped);
  }

  public updatePost(postId: PostId, entity: PostEntity): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      PostEntity,
      PostTypeormEntity,
    );
    return this.update(postId.toString(), mapped);
  }

  public deletePost(postId: PostId): TransactionType {
    return this.delete(postId.toString());
  }
}
