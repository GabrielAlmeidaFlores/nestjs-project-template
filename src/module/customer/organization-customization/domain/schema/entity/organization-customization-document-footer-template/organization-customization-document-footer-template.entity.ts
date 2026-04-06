import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';

import type { OrganizationCustomizationDocumentFooterTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/enum/organization-customization-document-footer-template-type.enum';
import type { OrganizationCustomizationDocumentFooterTemplateEntityPropsInterface } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/organization-customization-document-footer-template.entity.props.interface';

export class OrganizationCustomizationDocumentFooterTemplateEntity extends BaseEntity<OrganizationCustomizationDocumentFooterTemplateId> {
  public readonly type: OrganizationCustomizationDocumentFooterTemplateTypeEnum;
  public readonly htmlContent: string;

  protected readonly _type =
    OrganizationCustomizationDocumentFooterTemplateEntity.name;

  public constructor(
    props: OrganizationCustomizationDocumentFooterTemplateEntityPropsInterface,
  ) {
    super(OrganizationCustomizationDocumentFooterTemplateId, props);
    this.type = props.type;
    this.htmlContent = props.htmlContent;
  }
}
