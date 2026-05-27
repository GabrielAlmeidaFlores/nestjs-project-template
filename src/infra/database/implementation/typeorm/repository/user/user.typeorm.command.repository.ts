import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { UserTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/user.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { UserCommandRepositoryGateway } from '@module/social/user/domain/repository/user/command/user.command.repository.gateway';
import { UserEntity } from '@module/social/user/domain/schema/entity/user/user.entity';
import { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

@Injectable()
export class UserTypeormCommandRepository
  extends BaseTypeormCommandRepository<UserTypeormEntity>
  implements UserCommandRepositoryGateway
{
  protected readonly _type = UserTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(UserTypeormEntity)
    repository: Repository<UserTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createUser(entity: UserEntity): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      UserEntity,
      UserTypeormEntity,
    );
    return this.create(mapped);
  }

  public updateUser(userId: UserId, entity: UserEntity): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      UserEntity,
      UserTypeormEntity,
    );
    return this.update(userId.toString(), mapped);
  }

  public deleteUser(userId: UserId): TransactionType {
    return this.delete(userId.toString());
  }
}
