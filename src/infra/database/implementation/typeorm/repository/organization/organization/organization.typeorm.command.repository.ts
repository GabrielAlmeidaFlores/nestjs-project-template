import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrganizationCommandRepositoryGateway } from '@core/domain/repository/organization/organization/organization.command.repository.gateway';
import { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';

export class OrganizationTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationTypeormEntity>
  implements OrganizationCommandRepositoryGateway
{
  protected readonly _type = OrganizationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationTypeormEntity)
    repository: Repository<OrganizationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async createOrganization(props: OrganizationEntity): Promise<void> {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationEntity,
      OrganizationTypeormEntity,
    );

    await this.create(mappedData);
  }
}
