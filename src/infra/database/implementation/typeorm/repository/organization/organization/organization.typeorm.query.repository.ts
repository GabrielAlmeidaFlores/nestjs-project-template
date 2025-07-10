import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrganizationQueryRepositoryGateway } from '@core/domain/repository/organization/organization/organization.query.repository.gateway';
import { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';

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
  ): Promise<OrganizationEntity | null> {
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
      OrganizationEntity,
    );

    return mappedData;
  }
}
