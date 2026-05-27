import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { UserTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/user.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetUserQueryResult } from '@module/client/user/domain/repository/user/query/result/get-user.query.result';
import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class UserTypeormQueryRepository
  extends BaseTypeormQueryRepository<UserTypeormEntity>
  implements UserQueryRepositoryGateway
{
  protected readonly _type = UserTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(UserTypeormEntity)
    repository: Repository<UserTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneUserById(id: UserId): Promise<GetUserQueryResult | null> {
    const data = await this.findOne({ where: { id: id.toString() } });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(data, UserTypeormEntity, GetUserQueryResult);
  }

  public async findOneUserByAuthIdentityId(
    authIdentityId: AuthIdentityId,
  ): Promise<GetUserQueryResult | null> {
    const data = await this.findOne({
      where: { authIdentityId: authIdentityId.toString() },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(data, UserTypeormEntity, GetUserQueryResult);
  }

  public async findOneUserByUsername(
    username: string,
  ): Promise<GetUserQueryResult | null> {
    const data = await this.findOne({ where: { username } });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(data, UserTypeormEntity, GetUserQueryResult);
  }

  public async listUsers(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetUserQueryResult>> {
    const result = await this.list(pagination);

    const resource = result.resource.map((item) =>
      this.mapperGateway.map(item, UserTypeormEntity, GetUserQueryResult),
    );

    return new ListDataOutputModel({
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      resource,
    });
  }
}
