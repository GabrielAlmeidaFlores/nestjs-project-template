import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public specialPeriodStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public specialPeriodEndDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public specialTimeType?: string;

  @RequestDtoStringProperty({ required: false })
  public jobTitle?: string;

  @RequestDtoStringProperty({ required: false })
  public careerName?: string;

  @RequestDtoStringProperty({ required: false })
  public serviceType?: string;

  @RequestDtoStringProperty({ required: false })
  public department?: string;

  protected override readonly _type =
    CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodRequestDto.name;
}
