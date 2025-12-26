import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationCreditUsageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-usage.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationCreditUsageCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/command/organization-credit-usage.command.repository.gateway';
import { OrganizationCreditUsageEntity } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/organization-credit-usage.entity';
import { OrganizationCreditUsageId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/value-object/organization-credit-usage-id/organization-credit-usage-id.value-object';

@Injectable()
export class OrganizationCreditUsageTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationCreditUsageTypeormEntity>
  implements OrganizationCreditUsageCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationCreditUsageTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationCreditUsageTypeormEntity)
    repository: Repository<OrganizationCreditUsageTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationCreditUsage(
    props: OrganizationCreditUsageEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationCreditUsageEntity,
      OrganizationCreditUsageTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateOrganizationCreditUsage(
    id: OrganizationCreditUsageId,
    props: Partial<OrganizationCreditUsageEntity>,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationCreditUsageEntity,
      OrganizationCreditUsageTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteOrganizationCreditUsage(
    id: OrganizationCreditUsageId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
