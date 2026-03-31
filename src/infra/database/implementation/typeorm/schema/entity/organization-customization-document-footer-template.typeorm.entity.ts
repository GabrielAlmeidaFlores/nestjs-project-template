import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationCustomizationDocumentFooterTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/enum/organization-customization-document-footer-template-type.enum';

@Entity({ name: 'organization_customization_document_footer_template' })
export class OrganizationCustomizationDocumentFooterTemplateTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: OrganizationCustomizationDocumentFooterTemplateTypeEnum,
  })
  public type: OrganizationCustomizationDocumentFooterTemplateTypeEnum;

  @Column({
    name: 'html_content',
    type: 'text',
    nullable: false,
  })
  public htmlContent: string;

  protected override readonly _type =
    OrganizationCustomizationDocumentFooterTemplateTypeormEntity.name;
}
