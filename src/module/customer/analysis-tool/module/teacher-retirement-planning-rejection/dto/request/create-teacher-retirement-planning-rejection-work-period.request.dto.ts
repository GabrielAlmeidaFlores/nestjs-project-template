import { TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-timeline-classification.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class TeacherRetirementPlanningRejectionWorkPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodDocumentRequestDto.name;
}

@RequestDto()
export class TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public competence?: Date;

  @RequestDtoStringProperty({ required: false })
  public remuneration?: string;

  @RequestDtoStringProperty({ required: false })
  public indicators?: string;

  @RequestDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public contribution?: string;

  @RequestDtoStringProperty({ required: false })
  public contributionSalary?: string;

  @RequestDtoBooleanProperty({ required: false })
  public competenceBelowMinimum?: boolean;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class TeacherRetirementPlanningRejectionWorkPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public category?: string;

  @RequestDtoStringProperty({ required: false })
  public activityDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @RequestDtoStringProperty({ required: false })
  public pendencyReason?: string;

  @RequestDtoStringProperty({ required: false })
  public periodConsideration?: string;

  @RequestDtoStringProperty({ required: false })
  public contributionAverage?: string;

  @RequestDtoStringProperty({ required: false })
  public status?: string;

  @RequestDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @RequestDtoStringProperty({ required: false })
  public impactMonths?: string;

  @RequestDtoBooleanProperty({ required: false })
  public isPendency?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasSpecialPeriod?: boolean;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum,
    { required: false },
  )
  public timelineClassification?: TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum;

  @RequestDtoObjectProperty(
    () => TeacherRetirementPlanningRejectionWorkPeriodDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: TeacherRetirementPlanningRejectionWorkPeriodDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodItemRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningRejectionWorkPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => TeacherRetirementPlanningRejectionWorkPeriodItemRequestDto,
    { isArray: true },
  )
  public workPeriods: TeacherRetirementPlanningRejectionWorkPeriodItemRequestDto[];

  protected override readonly _type =
    CreateTeacherRetirementPlanningRejectionWorkPeriodRequestDto.name;
}
