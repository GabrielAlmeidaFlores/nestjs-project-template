import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationCustomizationDocumentFooterTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-footer-template.typeorm.entity';
import { OrganizationCustomizationDocumentFooterTemplateEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/organization-customization-document-footer-template.entity';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';

@Injectable()
export class OrganizationCustomizationDocumentFooterTemplateEntityAutoMapperProfile {
  protected readonly _type =
    OrganizationCustomizationDocumentFooterTemplateEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
    ): OrganizationCustomizationDocumentFooterTemplateEntity => {
      return new OrganizationCustomizationDocumentFooterTemplateEntity({
        id: new OrganizationCustomizationDocumentFooterTemplateId(source.id),
        type: source.type,
        htmlContent: source.htmlContent,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
      OrganizationCustomizationDocumentFooterTemplateEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: OrganizationCustomizationDocumentFooterTemplateEntity,
    ): OrganizationCustomizationDocumentFooterTemplateTypeormEntity => {
      return OrganizationCustomizationDocumentFooterTemplateTypeormEntity.build(
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
      OrganizationCustomizationDocumentFooterTemplateEntity,
      OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
      constructUsing(convert),
    );
  }
}
