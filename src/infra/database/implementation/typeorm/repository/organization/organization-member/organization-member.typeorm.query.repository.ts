import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrganizationMemberQueryRepositoryGateway } from '@core/domain/repository/organization/organization-member/organization-member.query.repository.gateway';
import { OrganizationMemberEntity } from '@core/domain/schema/entity/organization/organization-member/organization-member.entity';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';

export class OrganizationMemberTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationMemberTypeormEntity>
  implements OrganizationMemberQueryRepositoryGateway
{
  protected readonly _type = OrganizationMemberTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationMemberTypeormEntity)
    repository: Repository<OrganizationMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOrganizationMemberById(
    id: Guid,
  ): Promise<OrganizationMemberEntity | null> {
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
      OrganizationMemberTypeormEntity,
      OrganizationMemberEntity,
    );

    return mappedData;
  }
}
