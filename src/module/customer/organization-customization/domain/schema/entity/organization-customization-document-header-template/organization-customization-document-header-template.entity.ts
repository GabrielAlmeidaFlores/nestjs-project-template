import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

import type { OrganizationCustomizationDocumentHeaderTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/enum/organization-customization-document-header-template-type.enum';
import type { OrganizationCustomizationDocumentHeaderTemplateEntityPropsInterface } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/organization-customization-document-header-template.entity.props.interface';

export class OrganizationCustomizationDocumentHeaderTemplateEntity extends BaseEntity<OrganizationCustomizationDocumentHeaderTemplateId> {
  public readonly type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum;
  public readonly htmlContent: string;

  protected readonly _type =
    OrganizationCustomizationDocumentHeaderTemplateEntity.name;

  public constructor(
    props: OrganizationCustomizationDocumentHeaderTemplateEntityPropsInterface,
  ) {
    super(OrganizationCustomizationDocumentHeaderTemplateId, props);
    this.type = props.type;
    this.htmlContent = props.htmlContent;
  }
}
