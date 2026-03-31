import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ColorValue } from '@core/domain/schema/value-object/color/color.value-object';
import { OrganizationCustomizationDocumentFooterTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-footer-template.typeorm.entity';
import { OrganizationCustomizationDocumentHeaderTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-header-template.typeorm.entity';
import { OrganizationCustomizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationCustomizationEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/organization-customization.entity';
import { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

@Injectable()
export class OrganizationCustomizationEntityAutoMapperProfile {
  protected readonly _type =
    OrganizationCustomizationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: OrganizationCustomizationTypeormEntity,
    ): OrganizationCustomizationEntity => {
      if (
        !source.organization ||
        !source.organizationCustomizationDocumentHeaderTemplate ||
        !source.organizationCustomizationDocumentFooterTemplate
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: OrganizationCustomizationEntity.name,
          sourceClass: OrganizationCustomizationTypeormEntity.name,
        });
      }

      return new OrganizationCustomizationEntity({
        id: new OrganizationCustomizationId(source.id),
        organizationId: new OrganizationId(source.organization.id),
        organizationLogo: source.organizationLogo,
        organizationCustomizationDocumentFooterDescription:
          source.organizationCustomizationDocumentFooterDescription,
        organizationCustomizationDocumentHeaderTemplateId:
          new OrganizationCustomizationDocumentHeaderTemplateId(
            source.organizationCustomizationDocumentHeaderTemplate.id,
          ),
        organizationCustomizationDocumentFooterTemplateId:
          new OrganizationCustomizationDocumentFooterTemplateId(
            source.organizationCustomizationDocumentFooterTemplate.id,
          ),
        primaryColor: new ColorValue(source.primaryColor),
        secondaryColor: new ColorValue(source.secondaryColor),
        tertiaryColor: new ColorValue(source.tertiaryColor),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      OrganizationCustomizationTypeormEntity,
      OrganizationCustomizationEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: OrganizationCustomizationEntity,
    ): OrganizationCustomizationTypeormEntity => {
      const organization = {
        id: source.organizationId.toString(),
      } as OrganizationTypeormEntity;

      const organizationCustomizationDocumentHeaderTemplate = {
        id: source.organizationCustomizationDocumentHeaderTemplateId.toString(),
      } as OrganizationCustomizationDocumentHeaderTemplateTypeormEntity;

      const organizationCustomizationDocumentFooterTemplate = {
        id: source.organizationCustomizationDocumentFooterTemplateId.toString(),
      } as OrganizationCustomizationDocumentFooterTemplateTypeormEntity;

      return OrganizationCustomizationTypeormEntity.build({
        id: source.id.toString(),
        organization,
        organizationLogo: source.organizationLogo,
        organizationCustomizationDocumentFooterDescription:
          source.organizationCustomizationDocumentFooterDescription ?? null,
        organizationCustomizationDocumentHeaderTemplate,
        organizationCustomizationDocumentFooterTemplate,
        primaryColor: source.primaryColor.toString(),
        secondaryColor: source.secondaryColor.toString(),
        tertiaryColor: source.tertiaryColor.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      OrganizationCustomizationEntity,
      OrganizationCustomizationTypeormEntity,
      constructUsing(convert),
    );
  }
}
