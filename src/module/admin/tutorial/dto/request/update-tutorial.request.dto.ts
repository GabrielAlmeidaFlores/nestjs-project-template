import { TutorialFunctionalityEnum } from '@module/customer/tutorial/domain/schema/entity/tutorial/enum/tutorial-functionality.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTutorialRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public link?: string;

  @RequestDtoEnumProperty(TutorialFunctionalityEnum, { required: false })
  public functionality?: TutorialFunctionalityEnum;

  @RequestDtoStringProperty({ required: false })
  public description?: string;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, { required: false })
  public image?: Base64FileRequestDto;

  protected override readonly _type = UpdateTutorialRequestDto.name;
}
