import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

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

  public async findOneAuthIdentityByEmail(
    email: Email,
  ): Promise<GetAuthIdentityQueryResult | null> {
    const data = await this.findOne({ where: { email: email.toString() } });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      AuthIdentityTypeormEntity,
      GetAuthIdentityQueryResult,
    );
  }

  public async findOneAuthIdentityByEmailWithRelations(
    email: Email,
  ): Promise<GetAuthIdentityWithRelationsQueryResult | null> {
    const data = await this.findOne({ where: { email: email.toString() } });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      AuthIdentityTypeormEntity,
      GetAuthIdentityWithRelationsQueryResult,
    );
  }

  public async findOneAuthIdentityById(
    id: AuthIdentityId,
  ): Promise<GetAuthIdentityQueryResult | null> {
    const data = await this.findOne({ where: { id: id.toString() } });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      AuthIdentityTypeormEntity,
      GetAuthIdentityQueryResult,
    );
  }
}
