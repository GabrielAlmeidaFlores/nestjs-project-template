import { ColorValue } from '@core/domain/schema/value-object/color/color.value-object';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateOrganizationCustomizationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public organizationLogo: Base64FileRequestDto;

  @RequestDtoStringProperty({ required: false })
  public organizationCustomizationDocumentFooterDescription?: string;

  @RequestDtoValueObjectProperty(
    OrganizationCustomizationDocumentHeaderTemplateId,
  )
  public organizationCustomizationDocumentHeaderTemplateId: OrganizationCustomizationDocumentHeaderTemplateId;

  @RequestDtoValueObjectProperty(
    OrganizationCustomizationDocumentFooterTemplateId,
  )
  public organizationCustomizationDocumentFooterTemplateId: OrganizationCustomizationDocumentFooterTemplateId;

  @RequestDtoValueObjectProperty(ColorValue)
  public primaryColor: ColorValue;

  @RequestDtoValueObjectProperty(ColorValue)
  public secondaryColor: ColorValue;

  @RequestDtoValueObjectProperty(ColorValue)
  public tertiaryColor: ColorValue;

  protected override readonly _type =
    CreateOrganizationCustomizationRequestDto.name;
}
