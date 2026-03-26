import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationCustomizationDocumentHeaderTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/enum/organization-customization-document-header-template-type.enum';
import type { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

export class GetOrganizationCustomizationDocumentHeaderTemplateQueryResult extends BaseBuildableObject {
  public readonly organizationCustomizationDocumentHeaderTemplateId: OrganizationCustomizationDocumentHeaderTemplateId;
  public readonly type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum;
  public readonly htmlContent: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetOrganizationCustomizationDocumentHeaderTemplateQueryResult.name;
}
