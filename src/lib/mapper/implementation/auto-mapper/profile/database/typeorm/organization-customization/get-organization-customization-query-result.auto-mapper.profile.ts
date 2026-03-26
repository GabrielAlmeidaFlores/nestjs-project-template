import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationCustomizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GetOrganizationCustomizationQueryResult } from '@module/customer/organization-customization/domain/repository/organization-customization/query/result/get-organization-customization.query.result';
import { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

@Injectable()
export class GetOrganizationCustomizationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationCustomizationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: OrganizationCustomizationTypeormEntity,
    ): GetOrganizationCustomizationQueryResult => {
      if (
        !source.organization ||
        !source.organizationCustomizationDocumentHeaderTemplate ||
        !source.organizationCustomizationDocumentFooterTemplate
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetOrganizationCustomizationQueryResult.name,
          sourceClass: OrganizationCustomizationTypeormEntity.name,
        });
      }

      return GetOrganizationCustomizationQueryResult.build({
        organizationCustomizationId: new OrganizationCustomizationId(source.id),
        organizationId: new OrganizationId(source.organization.id),
        organizationName: source.organization.name,
        organizationLogo: source.organizationLogo,
        organizationCustomizationDocumentFooterDescription:
          source.organizationCustomizationDocumentFooterDescription,
        organizationCustomizationDocumentHeaderTemplateId:
          new OrganizationCustomizationDocumentHeaderTemplateId(
            source.organizationCustomizationDocumentHeaderTemplate.id,
          ),
        organizationCustomizationDocumentHeaderTemplateType:
          source.organizationCustomizationDocumentHeaderTemplate.type,
        organizationCustomizationDocumentFooterTemplateId:
          new OrganizationCustomizationDocumentFooterTemplateId(
            source.organizationCustomizationDocumentFooterTemplate.id,
          ),
        organizationCustomizationDocumentFooterTemplateType:
          source.organizationCustomizationDocumentFooterTemplate.type,
        primaryColor: source.primaryColor,
        secondaryColor: source.secondaryColor,
        tertiaryColor: source.tertiaryColor,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      OrganizationCustomizationTypeormEntity,
      GetOrganizationCustomizationQueryResult,
      constructUsing(convert),
    );
  }
}
