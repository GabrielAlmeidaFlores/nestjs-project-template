import { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class GeneralUrbanRetirementDenialDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(GeneralUrbanRetirementDenialDocumentTypeEnum)
  public type: GeneralUrbanRetirementDenialDocumentTypeEnum;

  protected override readonly _type =
    GeneralUrbanRetirementDenialDocumentItemRequestDto.name;
}

@RequestDto()
export class UploadGeneralUrbanRetirementDenialDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => GeneralUrbanRetirementDenialDocumentItemRequestDto,
    { isArray: true },
  )
  public documents: GeneralUrbanRetirementDenialDocumentItemRequestDto[];

  protected override readonly _type =
    UploadGeneralUrbanRetirementDenialDocumentsRequestDto.name;
}
