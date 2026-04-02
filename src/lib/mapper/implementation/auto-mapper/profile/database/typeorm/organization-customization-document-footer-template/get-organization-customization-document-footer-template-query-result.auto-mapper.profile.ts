import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationCustomizationDocumentFooterTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-footer-template.typeorm.entity';
import { GetOrganizationCustomizationDocumentFooterTemplateQueryResult } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/result/get-organization-customization-document-footer-template.query.result';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';

@Injectable()
export class GetOrganizationCustomizationDocumentFooterTemplateQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationCustomizationDocumentFooterTemplateQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
    ): GetOrganizationCustomizationDocumentFooterTemplateQueryResult => {
      return GetOrganizationCustomizationDocumentFooterTemplateQueryResult.build(
        {
          organizationCustomizationDocumentFooterTemplateId:
            new OrganizationCustomizationDocumentFooterTemplateId(source.id),
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
      OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
      GetOrganizationCustomizationDocumentFooterTemplateQueryResult,
      constructUsing(convert),
    );
  }
}
