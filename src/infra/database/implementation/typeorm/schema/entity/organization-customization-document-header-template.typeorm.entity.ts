import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationCustomizationDocumentHeaderTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/enum/organization-customization-document-header-template-type.enum';

@Entity({ name: 'organization_customization_document_header_template' })
export class OrganizationCustomizationDocumentHeaderTemplateTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: OrganizationCustomizationDocumentHeaderTemplateTypeEnum,
  })
  public type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum;

  @Column({
    name: 'html_content',
    type: 'text',
    nullable: false,
  })
  public htmlContent: string;

  protected override readonly _type =
    OrganizationCustomizationDocumentHeaderTemplateTypeormEntity.name;
}
