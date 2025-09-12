import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

@Injectable()
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

  public async findOneOrganizationMemberById(
    id: Guid,
  ): Promise<GetOrganizationMemberQueryResult | null> {
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
      GetOrganizationMemberQueryResult,
    );

    return mappedData;
  }
}
