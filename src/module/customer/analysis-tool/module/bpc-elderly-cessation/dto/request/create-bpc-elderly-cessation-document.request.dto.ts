import { BpcElderlyCessationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/enum/bpc-elderly-cessation-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateBpcElderlyCessationDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(BpcElderlyCessationDocumentTypeEnum)
  public readonly type: BpcElderlyCessationDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly file: Base64FileRequestDto;

  protected override readonly _type =
    CreateBpcElderlyCessationDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateBpcElderlyCessationDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateBpcElderlyCessationDocumentItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly documents: CreateBpcElderlyCessationDocumentItemRequestDto[];

  protected override readonly _type =
    CreateBpcElderlyCessationDocumentRequestDto.name;
}
