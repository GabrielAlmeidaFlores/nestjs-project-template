import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationCustomizationDocumentFooterTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-footer-template.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/organization-customization-document-footer-template.query.repository.gateway';
import { GetOrganizationCustomizationDocumentFooterTemplateQueryResult } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/result/get-organization-customization-document-footer-template.query.result';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';

@Injectable()
export class OrganizationCustomizationDocumentFooterTemplateTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationCustomizationDocumentFooterTemplateTypeormEntity>
  implements
    OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway
{
  protected readonly _type =
    OrganizationCustomizationDocumentFooterTemplateTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
    )
    repository: Repository<OrganizationCustomizationDocumentFooterTemplateTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listOrganizationCustomizationDocumentFooterTemplates(
    pagination: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetOrganizationCustomizationDocumentFooterTemplateQueryResult>
  > {
    const data = await this.list(pagination);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
      GetOrganizationCustomizationDocumentFooterTemplateQueryResult,
    );

    return new ListDataOutputModel<GetOrganizationCustomizationDocumentFooterTemplateQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneOrganizationCustomizationDocumentFooterTemplateById(
    id: OrganizationCustomizationDocumentFooterTemplateId,
  ): Promise<GetOrganizationCustomizationDocumentFooterTemplateQueryResult | null> {
    const result = await this.findOne({ where: { id: id.toString() } });

    if (!result) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
      GetOrganizationCustomizationDocumentFooterTemplateQueryResult,
    );
  }
}
