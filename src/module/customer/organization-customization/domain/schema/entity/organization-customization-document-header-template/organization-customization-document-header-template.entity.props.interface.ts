import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationCustomizationDocumentHeaderTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/enum/organization-customization-document-header-template-type.enum';
import type { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

export interface OrganizationCustomizationDocumentHeaderTemplateEntityPropsInterface extends BaseEntityPropsInterface<OrganizationCustomizationDocumentHeaderTemplateId> {
  type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum;
  htmlContent: string;
}
