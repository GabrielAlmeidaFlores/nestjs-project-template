import type { OrganizationCustomizationDocumentFooterTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/enum/organization-customization-document-footer-template-type.enum';
import type { OrganizationCustomizationDocumentHeaderTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/enum/organization-customization-document-header-template-type.enum';

export interface ExportDocumentDownloadOptionsInterface {
  headerHtml?: string;
  footerHtml?: string;
  headerTemplateType?: OrganizationCustomizationDocumentHeaderTemplateTypeEnum;
  footerTemplateType?: OrganizationCustomizationDocumentFooterTemplateTypeEnum;
}
