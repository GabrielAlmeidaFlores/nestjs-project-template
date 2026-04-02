import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationCustomizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationCustomizationCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/command/organization-customization.command.repository.gateway';
import { OrganizationCustomizationEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/organization-customization.entity';
import { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';

@Injectable()
export class OrganizationCustomizationTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationCustomizationTypeormEntity>
  implements OrganizationCustomizationCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationCustomizationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationCustomizationTypeormEntity)
    repository: Repository<OrganizationCustomizationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationCustomization(
    props: OrganizationCustomizationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationCustomizationEntity,
      OrganizationCustomizationTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateOrganizationCustomization(
    id: OrganizationCustomizationId,
    props: OrganizationCustomizationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationCustomizationEntity,
      OrganizationCustomizationTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
