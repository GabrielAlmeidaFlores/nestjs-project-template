import { GetOrganizationCustomizationDocumentHeaderTemplateResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization-document-header-template.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListOrganizationCustomizationDocumentHeaderTemplatesResponseDto extends ListDataResponseDto<GetOrganizationCustomizationDocumentHeaderTemplateResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetOrganizationCustomizationDocumentHeaderTemplateResponseDto,
    { isArray: true },
  )
  public override resource: GetOrganizationCustomizationDocumentHeaderTemplateResponseDto[];

  protected override readonly _type =
    ListOrganizationCustomizationDocumentHeaderTemplatesResponseDto.name;
}
