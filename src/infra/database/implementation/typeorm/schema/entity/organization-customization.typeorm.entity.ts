import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationCustomizationDocumentFooterTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-footer-template.typeorm.entity';
import { OrganizationCustomizationDocumentHeaderTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-header-template.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';

@Entity({ name: 'organization_customization' })
export class OrganizationCustomizationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'organization_logo',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public organizationLogo: string | null;

  @Column({
    name: 'organization_customization_document_footer_description',
    type: 'text',
    nullable: true,
  })
  public organizationCustomizationDocumentFooterDescription: string | null;

  @Column({
    name: 'primary_color',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public primaryColor: string;

  @Column({
    name: 'secondary_color',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public secondaryColor: string;

  @Column({
    name: 'tertiary_color',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public tertiaryColor: string;

  @ManyToOne(() => OrganizationTypeormEntity)
  @JoinColumn({ name: 'organization_id' })
  public organization?: OrganizationTypeormEntity | undefined;

  @ManyToOne(() => OrganizationCustomizationDocumentHeaderTemplateTypeormEntity)
  @JoinColumn({
    name: 'organization_customization_document_header_template_id',
  })
  public organizationCustomizationDocumentHeaderTemplate?:
    | OrganizationCustomizationDocumentHeaderTemplateTypeormEntity
    | undefined;

  @ManyToOne(() => OrganizationCustomizationDocumentFooterTemplateTypeormEntity)
  @JoinColumn({
    name: 'organization_customization_document_footer_template_id',
  })
  public organizationCustomizationDocumentFooterTemplate?:
    | OrganizationCustomizationDocumentFooterTemplateTypeormEntity
    | undefined;

  protected override readonly _type =
    OrganizationCustomizationTypeormEntity.name;
}
