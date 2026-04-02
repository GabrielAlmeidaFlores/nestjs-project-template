import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationCustomizationDocumentHeaderTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-header-template.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';
import { GetOrganizationCustomizationDocumentHeaderTemplateQueryResult } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/result/get-organization-customization-document-header-template.query.result';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

@Injectable()
export class OrganizationCustomizationDocumentHeaderTemplateTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationCustomizationDocumentHeaderTemplateTypeormEntity>
  implements
    OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway
{
  protected readonly _type =
    OrganizationCustomizationDocumentHeaderTemplateTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
    )
    repository: Repository<OrganizationCustomizationDocumentHeaderTemplateTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listOrganizationCustomizationDocumentHeaderTemplates(
    pagination: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetOrganizationCustomizationDocumentHeaderTemplateQueryResult>
  > {
    const data = await this.list(pagination);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
      GetOrganizationCustomizationDocumentHeaderTemplateQueryResult,
    );

    return new ListDataOutputModel<GetOrganizationCustomizationDocumentHeaderTemplateQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneOrganizationCustomizationDocumentHeaderTemplateById(
    id: OrganizationCustomizationDocumentHeaderTemplateId,
  ): Promise<GetOrganizationCustomizationDocumentHeaderTemplateQueryResult | null> {
    const result = await this.findOne({ where: { id: id.toString() } });

    if (!result) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
      GetOrganizationCustomizationDocumentHeaderTemplateQueryResult,
    );
  }
}
