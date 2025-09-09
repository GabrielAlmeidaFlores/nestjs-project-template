import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/auth/domain/repository/organization/query/organization.query.repository.gateway';
import { GetOrganizationQueryResult } from '@module/customer/auth/domain/repository/organization/query/result/get-organization.query.result';

@Injectable()
export class OrganizationTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationTypeormEntity>
  implements OrganizationQueryRepositoryGateway
{
  protected readonly _type = OrganizationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationTypeormEntity)
    repository: Repository<OrganizationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOrganizationById(
    id: Guid,
  ): Promise<GetOrganizationQueryResult | null> {
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
      OrganizationTypeormEntity,
      GetOrganizationQueryResult,
    );

    return mappedData;
  }
}
