import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationCustomizationDocumentFooterTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/enum/organization-customization-document-footer-template-type.enum';
import type { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';

export class GetOrganizationCustomizationDocumentFooterTemplateQueryResult extends BaseBuildableObject {
  public readonly organizationCustomizationDocumentFooterTemplateId: OrganizationCustomizationDocumentFooterTemplateId;
  public readonly type: OrganizationCustomizationDocumentFooterTemplateTypeEnum;
  public readonly htmlContent: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetOrganizationCustomizationDocumentFooterTemplateQueryResult.name;
}
