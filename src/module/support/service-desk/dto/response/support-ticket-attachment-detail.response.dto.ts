import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SupportTicketAttachmentDetailResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public documentName: string;

  @ResponseDtoNumberProperty()
  public documentSize: number;

  @ResponseDtoStringProperty()
  public documentUrl: string;

  protected override readonly _type =
    SupportTicketAttachmentDetailResponseDto.name;
}
