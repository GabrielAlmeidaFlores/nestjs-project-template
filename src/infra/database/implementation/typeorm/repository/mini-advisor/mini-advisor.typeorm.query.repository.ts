import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { MiniAdvisorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { MiniAdvisorQueryRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor/query/mini-advisor.query.repository.gateway';
import { GetMiniAdvisorWithRelationsQueryResult } from '@module/customer/mini-advisor/domain/repository/mini-advisor/query/result/get-mini-advisor-with-relations.query.result';
import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class MiniAdvisorTypeormQueryRepository
  extends BaseTypeormQueryRepository<MiniAdvisorTypeormEntity>
  implements MiniAdvisorQueryRepositoryGateway
{
  protected readonly _type = MiniAdvisorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(MiniAdvisorTypeormEntity)
    repository: Repository<MiniAdvisorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByIdOrFail(
    organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    id: MiniAdvisorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetMiniAdvisorWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        },
        relations: {
          miniAdvisorResult: true,
          createdBy: true,
          updatedBy: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      MiniAdvisorTypeormEntity,
      GetMiniAdvisorWithRelationsQueryResult,
    );
  }
}
