import { BpcDisabilityGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/enum/bpc-disability-grant-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateBpcDisabilityGrantDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(BpcDisabilityGrantDocumentTypeEnum)
  public readonly type: BpcDisabilityGrantDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly file: Base64FileRequestDto;

  protected override readonly _type =
    CreateBpcDisabilityGrantDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateBpcDisabilityGrantDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateBpcDisabilityGrantDocumentItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly documents: CreateBpcDisabilityGrantDocumentItemRequestDto[];

  protected override readonly _type =
    CreateBpcDisabilityGrantDocumentRequestDto.name;
}
