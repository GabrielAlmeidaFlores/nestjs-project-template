import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSurvivorPensionAnalysisResultDependentPensionAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public dependentName?: string;

  @RequestDtoStringProperty({ required: false })
  public dependencyDegree?: string;

  @RequestDtoBooleanProperty({ required: false })
  public isDependencyVerified?: boolean;

  @RequestDtoDateProperty({ required: false })
  public pensionStartDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public estimatedPensionDuration?: string;

  protected override readonly _type =
    CreateSurvivorPensionAnalysisResultDependentPensionAnalysisRequestDto.name;
}
