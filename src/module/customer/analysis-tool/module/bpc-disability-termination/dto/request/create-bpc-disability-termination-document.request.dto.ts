import { BpcDisabilityTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/enum/bpc-disability-termination-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateBpcDisabilityTerminationDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(BpcDisabilityTerminationDocumentTypeEnum)
  public readonly type: BpcDisabilityTerminationDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly file: Base64FileRequestDto;

  protected override readonly _type =
    CreateBpcDisabilityTerminationDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateBpcDisabilityTerminationDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateBpcDisabilityTerminationDocumentItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly documents: CreateBpcDisabilityTerminationDocumentItemRequestDto[];

  protected override readonly _type =
    CreateBpcDisabilityTerminationDocumentRequestDto.name;
}
