import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';

@Injectable()
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
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationMemberEntity,
      OrganizationMemberTypeormEntity,
    );

    return this.create(mappedData);
  }
}
