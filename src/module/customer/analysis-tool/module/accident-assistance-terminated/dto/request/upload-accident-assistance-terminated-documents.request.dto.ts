import { AccidentAssistanceTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/enum/accident-assistance-terminated-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class AccidentAssistanceTerminatedDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(AccidentAssistanceTerminatedDocumentTypeEnum)
  public type: AccidentAssistanceTerminatedDocumentTypeEnum;

  protected override readonly _type =
    AccidentAssistanceTerminatedDocumentItemRequestDto.name;
}

@RequestDto()
export class UploadAccidentAssistanceTerminatedDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => AccidentAssistanceTerminatedDocumentItemRequestDto,
    { isArray: true },
  )
  public documents: AccidentAssistanceTerminatedDocumentItemRequestDto[];

  protected override readonly _type =
    UploadAccidentAssistanceTerminatedDocumentsRequestDto.name;
}
