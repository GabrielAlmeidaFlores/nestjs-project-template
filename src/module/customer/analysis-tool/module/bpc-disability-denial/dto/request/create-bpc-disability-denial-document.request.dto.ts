import { BpcDisabilityDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/enum/bpc-disability-denial-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateBpcDisabilityDenialDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(BpcDisabilityDenialDocumentTypeEnum)
  public readonly type: BpcDisabilityDenialDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly file: Base64FileRequestDto;

  protected override readonly _type =
    CreateBpcDisabilityDenialDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateBpcDisabilityDenialDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateBpcDisabilityDenialDocumentItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly documents: CreateBpcDisabilityDenialDocumentItemRequestDto[];

  protected override readonly _type =
    CreateBpcDisabilityDenialDocumentRequestDto.name;
}
