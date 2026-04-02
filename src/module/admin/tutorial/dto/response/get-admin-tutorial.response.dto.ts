import { TutorialFunctionalityEnum } from '@module/customer/tutorial/domain/schema/entity/tutorial/enum/tutorial-functionality.enum';
import { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAdminTutorialResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TutorialId)
  public tutorialId: TutorialId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public link: string;

  @ResponseDtoEnumProperty(TutorialFunctionalityEnum)
  public functionality: TutorialFunctionalityEnum;

  @ResponseDtoStringProperty()
  public description: string;

  @ResponseDtoStringProperty()
  public imageUrl: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetAdminTutorialResponseDto.name;
}
