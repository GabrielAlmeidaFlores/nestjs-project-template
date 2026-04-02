import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationCustomizationDocumentHeaderTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-header-template.typeorm.entity';
import { GetOrganizationCustomizationDocumentHeaderTemplateQueryResult } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/result/get-organization-customization-document-header-template.query.result';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

@Injectable()
export class GetOrganizationCustomizationDocumentHeaderTemplateQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationCustomizationDocumentHeaderTemplateQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
    ): GetOrganizationCustomizationDocumentHeaderTemplateQueryResult => {
      return GetOrganizationCustomizationDocumentHeaderTemplateQueryResult.build(
        {
          organizationCustomizationDocumentHeaderTemplateId:
            new OrganizationCustomizationDocumentHeaderTemplateId(source.id),
          type: source.type,
          htmlContent: source.htmlContent,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
      GetOrganizationCustomizationDocumentHeaderTemplateQueryResult,
      constructUsing(convert),
    );
  }
}
