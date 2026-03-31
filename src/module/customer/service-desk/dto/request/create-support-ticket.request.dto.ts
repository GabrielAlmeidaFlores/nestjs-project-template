import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSupportTicketRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public requesterEmail: string;

  @RequestDtoStringProperty()
  public subject: string;

  @RequestDtoEnumProperty(SupportTypeEnum)
  public supportType: SupportTypeEnum;

  @RequestDtoStringProperty()
  public problem: string;

  @RequestDtoStringProperty()
  public description: string;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public files?: Base64FileRequestDto[];

  protected override readonly _type = CreateSupportTicketRequestDto.name;
}
