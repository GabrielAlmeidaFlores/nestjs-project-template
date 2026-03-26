import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationCustomizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { GetOrganizationCustomizationQueryResult } from '@module/customer/organization-customization/domain/repository/organization-customization/query/result/get-organization-customization.query.result';
import { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';

@Injectable()
export class OrganizationCustomizationTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationCustomizationTypeormEntity>
  implements OrganizationCustomizationQueryRepositoryGateway
{
  protected readonly _type =
    OrganizationCustomizationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationCustomizationTypeormEntity)
    repository: Repository<OrganizationCustomizationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneOrganizationCustomizationById(
    id: OrganizationCustomizationId,
  ): Promise<GetOrganizationCustomizationQueryResult | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: {
        organization: true,
        organizationCustomizationDocumentHeaderTemplate: true,
        organizationCustomizationDocumentFooterTemplate: true,
      },
    });

    if (!result) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      OrganizationCustomizationTypeormEntity,
      GetOrganizationCustomizationQueryResult,
    );
  }

  public async findOneOrganizationCustomizationByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationCustomizationQueryResult | null> {
    const result = await this.findOne({
      where: { organization: { id: organizationId.toString() } },
      relations: {
        organization: true,
        organizationCustomizationDocumentHeaderTemplate: true,
        organizationCustomizationDocumentFooterTemplate: true,
      },
    });

    if (!result) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      OrganizationCustomizationTypeormEntity,
      GetOrganizationCustomizationQueryResult,
    );
  }
}
