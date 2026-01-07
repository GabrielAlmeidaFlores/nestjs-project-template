import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class SendMessageJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: true })
  public message: string;

  protected override readonly _type = SendMessageJsonRequestDto.name;
}

@RequestDto()
export class SendMessageRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    required: false,
    isArray: true,
  })
  public file?: FileModel[];

  @RequestDtoObjectProperty(() => SendMessageJsonRequestDto)
  public json: SendMessageJsonRequestDto;

  protected override readonly _type = SendMessageRequestDto.name;
}
