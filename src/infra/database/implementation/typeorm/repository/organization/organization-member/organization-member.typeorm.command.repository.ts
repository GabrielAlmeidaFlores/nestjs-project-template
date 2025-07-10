import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionEventType } from '@core/domain/repository/base/type/transaction-event.interface';
import { OrganizationMemberCommandRepositoryGateway } from '@core/domain/repository/organization/organization-member/organization-member.command.repository.gateway';
import { OrganizationMemberEntity } from '@core/domain/schema/entity/organization/organization-member/organization-member.entity';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';

export class OrganizationMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationMemberTypeormEntity>
  implements OrganizationMemberCommandRepositoryGateway
{
  protected readonly _type = OrganizationMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationMemberTypeormEntity)
    repository: Repository<OrganizationMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationMember(
    props: OrganizationMemberEntity,
  ): TransactionEventType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationMemberEntity,
      OrganizationMemberTypeormEntity,
    );

    return this.create(mappedData);
  }
}
