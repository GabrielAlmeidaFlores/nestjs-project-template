import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';

@Injectable()
export class AuthIdentityTypeormCommandRepository
  extends BaseTypeormCommandRepository<AuthIdentityTypeormEntity>
  implements AuthIdentityCommandRepositoryGateway
{
  protected readonly _type = AuthIdentityTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AuthIdentityTypeormEntity)
    repository: Repository<AuthIdentityTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAuthIdentity(props: AuthIdentityEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AuthIdentityEntity,
      AuthIdentityTypeormEntity,
    );

    return this.create(mappedData);
  }
}
