import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public dependentFullName?: string;

  @RequestDtoStringProperty({ required: false })
  public dependencyClassificationLevel?: string;

  @RequestDtoStringProperty({ required: false })
  public type?: string;

  @RequestDtoStringProperty({ required: false })
  public gender?: string;

  @RequestDtoDateProperty({ required: false })
  public dateOfBirth?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public hasDisabilityOrInvalidity?: boolean;

  @RequestDtoDateProperty({ required: false })
  public unionCommencementDate?: Date;

  protected override readonly _type =
    UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto.name;
}
