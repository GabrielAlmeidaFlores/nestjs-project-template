import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';

import type { ColorValue } from '@core/domain/schema/value-object/color/color.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationCustomizationEntityPropsInterface } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/organization-customization.entity.props.interface';
import type { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import type { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

export class OrganizationCustomizationEntity extends BaseEntity<OrganizationCustomizationId> {
  public readonly organizationId: OrganizationId;
  public readonly organizationLogo: string;
  public readonly organizationCustomizationDocumentFooterDescription:
    | string
    | null;
  public readonly organizationCustomizationDocumentHeaderTemplateId: OrganizationCustomizationDocumentHeaderTemplateId;
  public readonly organizationCustomizationDocumentFooterTemplateId: OrganizationCustomizationDocumentFooterTemplateId;
  public readonly primaryColor: ColorValue;
  public readonly secondaryColor: ColorValue;
  public readonly tertiaryColor: ColorValue;

  protected readonly _type = OrganizationCustomizationEntity.name;

  public constructor(props: OrganizationCustomizationEntityPropsInterface) {
    super(OrganizationCustomizationId, props);
    this.organizationId = props.organizationId;
    this.organizationLogo = props.organizationLogo;
    this.organizationCustomizationDocumentFooterDescription =
      props.organizationCustomizationDocumentFooterDescription ?? null;
    this.organizationCustomizationDocumentHeaderTemplateId =
      props.organizationCustomizationDocumentHeaderTemplateId;
    this.organizationCustomizationDocumentFooterTemplateId =
      props.organizationCustomizationDocumentFooterTemplateId;
    this.primaryColor = props.primaryColor;
    this.secondaryColor = props.secondaryColor;
    this.tertiaryColor = props.tertiaryColor;
  }
}
