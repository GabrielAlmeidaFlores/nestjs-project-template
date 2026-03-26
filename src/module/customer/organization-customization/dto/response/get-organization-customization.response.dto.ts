import { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';
import { OrganizationCustomizationDocumentFooterTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/enum/organization-customization-document-footer-template-type.enum';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import { OrganizationCustomizationDocumentHeaderTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/enum/organization-customization-document-header-template-type.enum';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetOrganizationCustomizationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(OrganizationCustomizationId)
  public organizationCustomizationId: OrganizationCustomizationId;

  @ResponseDtoStringProperty()
  public organizationName: string;

  @ResponseDtoStringProperty({ required: false })
  public organizationLogo?: string;

  @ResponseDtoStringProperty({ required: false })
  public organizationLogoOriginalFileName?: string;

  @ResponseDtoStringProperty({ required: false })
  public organizationCustomizationDocumentFooterDescription?: string;

  @ResponseDtoValueObjectProperty(
    OrganizationCustomizationDocumentHeaderTemplateId,
  )
  public organizationCustomizationDocumentHeaderTemplateId: OrganizationCustomizationDocumentHeaderTemplateId;

  @ResponseDtoEnumProperty(
    OrganizationCustomizationDocumentHeaderTemplateTypeEnum,
  )
  public organizationCustomizationDocumentHeaderTemplateType: OrganizationCustomizationDocumentHeaderTemplateTypeEnum;

  @ResponseDtoValueObjectProperty(
    OrganizationCustomizationDocumentFooterTemplateId,
  )
  public organizationCustomizationDocumentFooterTemplateId: OrganizationCustomizationDocumentFooterTemplateId;

  @ResponseDtoEnumProperty(
    OrganizationCustomizationDocumentFooterTemplateTypeEnum,
  )
  public organizationCustomizationDocumentFooterTemplateType: OrganizationCustomizationDocumentFooterTemplateTypeEnum;

  @ResponseDtoStringProperty()
  public primaryColor: string;

  @ResponseDtoStringProperty()
  public secondaryColor: string;

  @ResponseDtoStringProperty()
  public tertiaryColor: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetOrganizationCustomizationResponseDto.name;
}
