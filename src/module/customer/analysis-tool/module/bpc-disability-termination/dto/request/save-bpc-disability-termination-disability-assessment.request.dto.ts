import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SaveBpcDisabilityTerminationDisabilityAssessmentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public readonly estimatedDisabilityStartDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public readonly attendsSchoolOrTechnicalCourse?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public readonly performsLaborActivity?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public readonly needsThirdPartyHelp?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public readonly hasAccessToBasicServices?: boolean;

  @RequestDtoStringProperty({ required: false })
  public readonly otherBarriersDescription?: string;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public readonly documents?: Base64FileRequestDto[];

  protected override readonly _type =
    SaveBpcDisabilityTerminationDisabilityAssessmentRequestDto.name;
}
