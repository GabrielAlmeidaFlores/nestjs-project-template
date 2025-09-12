import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization/command/organization.command.repository.gateway';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';

@Injectable()
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

  public createOrganization(props: OrganizationEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationEntity,
      OrganizationTypeormEntity,
    );

    return this.create(mappedData);
  }
}
