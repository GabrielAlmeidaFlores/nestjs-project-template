import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth/domain/repository/auth-identity/query/result/get-auth-identity.query.result';

@Injectable()
export class AuthIdentityTypeormQueryRepository
  extends BaseTypeormQueryRepository<AuthIdentityTypeormEntity>
  implements AuthIdentityQueryRepositoryGateway
{
  protected readonly _type = AuthIdentityTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AuthIdentityTypeormEntity)
    repository: Repository<AuthIdentityTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findAuthIdentityById(
    id: Guid,
  ): Promise<GetAuthIdentityQueryResult | null> {
    const data = await this.findOne({
      where: {
        id: id.toString(),
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      AuthIdentityTypeormEntity,
      GetAuthIdentityQueryResult,
    );

    return mappedData;
  }
}
