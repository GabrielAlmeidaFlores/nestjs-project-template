import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class ListDocumentsSentByEmailQueryRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty({ example: 1 })
  public page = 1;

  @RequestDtoNumberProperty({ example: 10 })
  public limit = 10;

  @RequestDtoStringProperty({
    required: false,
    example: 'Assunto do e-mail ou e-mail do destinatário',
  })
  public search?: string;

  @RequestDtoDateProperty({ required: false, example: new Date() })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false, example: new Date() })
  public endDate?: Date;

  protected override readonly _type =
    ListDocumentsSentByEmailQueryRequestDto.name;
}
