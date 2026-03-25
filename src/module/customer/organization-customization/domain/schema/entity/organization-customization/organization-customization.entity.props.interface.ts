import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ColorValue } from '@core/domain/schema/value-object/color/color.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';
import type { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import type { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

export interface OrganizationCustomizationEntityPropsInterface extends BaseEntityPropsInterface<OrganizationCustomizationId> {
  organizationId: OrganizationId;
  organizationLogo: string;
  organizationCustomizationDocumentFooterDescription?: string | null;
  organizationCustomizationDocumentHeaderTemplateId: OrganizationCustomizationDocumentHeaderTemplateId;
  organizationCustomizationDocumentFooterTemplateId: OrganizationCustomizationDocumentFooterTemplateId;
  primaryColor: ColorValue;
  secondaryColor: ColorValue;
  tertiaryColor: ColorValue;
}
