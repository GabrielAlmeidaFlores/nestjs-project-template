import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-timeline-classification.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeTeacherRetirementPlanningRejectionPppPeriodItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoNumberProperty({ required: false })
  public impactMonths?: number;

  @ResponseDtoNumberProperty({ required: false })
  public graceMonths?: number;

  @ResponseDtoBooleanProperty()
  public isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoStringProperty({ required: false })
  public pendencyReason?: string;

  @ResponseDtoStringProperty({ required: false })
  public periodConsideration?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasSpecialPeriod?: boolean;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum,
    { required: false },
  )
  public timelineClassification?: TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum;

  protected override readonly _type =
    AnalyzeTeacherRetirementPlanningRejectionPppPeriodItemResponseDto.name;
}

@ResponseDto()
export class AnalyzeTeacherRetirementPlanningRejectionPppResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => AnalyzeTeacherRetirementPlanningRejectionPppPeriodItemResponseDto,
    { isArray: true },
  )
  public periods: AnalyzeTeacherRetirementPlanningRejectionPppPeriodItemResponseDto[];

  protected override readonly _type =
    AnalyzeTeacherRetirementPlanningRejectionPppResponseDto.name;
}
