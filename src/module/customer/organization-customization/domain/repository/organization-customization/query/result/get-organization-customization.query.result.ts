import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';
import type { OrganizationCustomizationDocumentFooterTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/enum/organization-customization-document-footer-template-type.enum';
import type { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import type { OrganizationCustomizationDocumentHeaderTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/enum/organization-customization-document-header-template-type.enum';
import type { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

export class GetOrganizationCustomizationQueryResult extends BaseBuildableObject {
  public readonly organizationCustomizationId: OrganizationCustomizationId;
  public readonly organizationId: OrganizationId;
  public readonly organizationLogo: string | null;
  public readonly organizationName: string;
  public readonly organizationCustomizationDocumentFooterDescription:
    | string
    | null;
  public readonly organizationCustomizationDocumentHeaderTemplateId: OrganizationCustomizationDocumentHeaderTemplateId;
  public readonly organizationCustomizationDocumentHeaderTemplateType: OrganizationCustomizationDocumentHeaderTemplateTypeEnum;
  public readonly organizationCustomizationDocumentFooterTemplateId: OrganizationCustomizationDocumentFooterTemplateId;
  public readonly organizationCustomizationDocumentFooterTemplateType: OrganizationCustomizationDocumentFooterTemplateTypeEnum;
  public readonly primaryColor: string;
  public readonly secondaryColor: string;
  public readonly tertiaryColor: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetOrganizationCustomizationQueryResult.name;
}
