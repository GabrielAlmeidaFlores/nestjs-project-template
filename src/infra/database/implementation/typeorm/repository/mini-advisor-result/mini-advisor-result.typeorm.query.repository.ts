import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { MiniAdvisorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { MiniAdvisorResultQueryRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/query/mini-advisor-result.query.repository.gateway';
import { GetMiniAdvisorResultQueryResult } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/query/result/get-mini-advisor-result.query.result';
import { MiniAdvisorResultId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class MiniAdvisorResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<MiniAdvisorResultTypeormEntity>
  implements MiniAdvisorResultQueryRepositoryGateway
{
  protected readonly _type = MiniAdvisorResultTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(MiniAdvisorResultTypeormEntity)
    repository: Repository<MiniAdvisorResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByIdOrFail(
    organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    id: MiniAdvisorResultId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetMiniAdvisorResultQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          miniAdvisor: {
            createdBy: {
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        },
        relations: {
          miniAdvisor: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      MiniAdvisorResultTypeormEntity,
      GetMiniAdvisorResultQueryResult,
    );
  }
}
