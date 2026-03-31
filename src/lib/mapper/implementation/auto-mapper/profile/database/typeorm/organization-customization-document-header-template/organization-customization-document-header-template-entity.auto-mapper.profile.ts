import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationCustomizationDocumentHeaderTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-header-template.typeorm.entity';
import { OrganizationCustomizationDocumentHeaderTemplateEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/organization-customization-document-header-template.entity';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

@Injectable()
export class OrganizationCustomizationDocumentHeaderTemplateEntityAutoMapperProfile {
  protected readonly _type =
    OrganizationCustomizationDocumentHeaderTemplateEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
    ): OrganizationCustomizationDocumentHeaderTemplateEntity => {
      return new OrganizationCustomizationDocumentHeaderTemplateEntity({
        id: new OrganizationCustomizationDocumentHeaderTemplateId(source.id),
        type: source.type,
        htmlContent: source.htmlContent,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
      OrganizationCustomizationDocumentHeaderTemplateEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: OrganizationCustomizationDocumentHeaderTemplateEntity,
    ): OrganizationCustomizationDocumentHeaderTemplateTypeormEntity => {
      return OrganizationCustomizationDocumentHeaderTemplateTypeormEntity.build(
        {
          id: source.id.toString(),
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
      OrganizationCustomizationDocumentHeaderTemplateEntity,
      OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
      constructUsing(convert),
    );
  }
}
