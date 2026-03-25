import { OrganizationCustomizationDocumentFooterTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/enum/organization-customization-document-footer-template-type.enum';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetOrganizationCustomizationDocumentFooterTemplateResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    OrganizationCustomizationDocumentFooterTemplateId,
  )
  public organizationCustomizationDocumentFooterTemplateId: OrganizationCustomizationDocumentFooterTemplateId;

  @ResponseDtoEnumProperty(
    OrganizationCustomizationDocumentFooterTemplateTypeEnum,
  )
  public type: OrganizationCustomizationDocumentFooterTemplateTypeEnum;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type =
    GetOrganizationCustomizationDocumentFooterTemplateResponseDto.name;
}
