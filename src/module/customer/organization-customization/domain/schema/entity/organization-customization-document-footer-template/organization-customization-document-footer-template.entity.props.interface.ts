import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationCustomizationDocumentFooterTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/enum/organization-customization-document-footer-template-type.enum';
import type { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';

export interface OrganizationCustomizationDocumentFooterTemplateEntityPropsInterface extends BaseEntityPropsInterface<OrganizationCustomizationDocumentFooterTemplateId> {
  type: OrganizationCustomizationDocumentFooterTemplateTypeEnum;
  htmlContent: string;
}
