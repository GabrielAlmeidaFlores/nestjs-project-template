import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

@RequestDto()
export class CreateCustomerSupportTicketRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(SupportTypeEnum)
  public supportType: SupportTypeEnum;

  @RequestDtoStringProperty()
  public requesterEmail: string;

  @RequestDtoStringProperty()
  public subject: string;

  @RequestDtoStringProperty()
  public problem: string;

  @RequestDtoStringProperty()
  public description: string;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    isArray: true,
    required: false,
  })
  public attachments?: Base64FileRequestDto[];

  protected override readonly _type =
    CreateCustomerSupportTicketRequestDto.name;
}
