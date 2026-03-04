import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class TeacherRetirementPlanningCompleteAnalysisTimelineItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public startDate: string;

  @ResponseDtoStringProperty()
  public endDate: string;

  @ResponseDtoStringProperty()
  public activityType: string;

  @ResponseDtoStringProperty()
  public type: string;

  @ResponseDtoStringProperty()
  public location: string;

  protected override readonly _type =
    TeacherRetirementPlanningCompleteAnalysisTimelineItemResponseDto.name;
}

@ResponseDto()
export class TeacherRetirementPlanningCompleteAnalysisRetirementRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public ruleName: string;

  @ResponseDtoBooleanProperty({ required: false })
  public result?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public rightDate?: string;

  @ResponseDtoNumberProperty({ required: false })
  public estimatedRMI?: number;

  @ResponseDtoBooleanProperty()
  public bestRMI: boolean;

  @ResponseDtoBooleanProperty()
  public highestLawsuitValue: boolean;

  @ResponseDtoStringProperty()
  public detailedRuleAnalysis: string;

  protected override readonly _type =
    TeacherRetirementPlanningCompleteAnalysisRetirementRuleResponseDto.name;
}

@ResponseDto()
export class TeacherRetirementPlanningCompleteAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => TeacherRetirementPlanningCompleteAnalysisTimelineItemResponseDto,
    { isArray: true },
  )
  public timeline: TeacherRetirementPlanningCompleteAnalysisTimelineItemResponseDto[];

  @ResponseDtoObjectProperty(
    () => TeacherRetirementPlanningCompleteAnalysisRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: TeacherRetirementPlanningCompleteAnalysisRetirementRuleResponseDto[];

  @ResponseDtoStringProperty()
  public finalAnalysis: string;

  @ResponseDtoStringProperty()
  public teacherTime: string;

  @ResponseDtoStringProperty()
  public commonTime: string;

  @ResponseDtoStringProperty()
  public totalContributionTime: string;

  @ResponseDtoStringProperty()
  public publicServiceTime: string;

  @ResponseDtoStringProperty()
  public positionTenureTime: string;

  protected override readonly _type =
    TeacherRetirementPlanningCompleteAnalysisResultResponseDto.name;
}

@ResponseDto()
export class CreateTeacherRetirementPlanningResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => TeacherRetirementPlanningCompleteAnalysisResultResponseDto,
  )
  public readonly teacherRetirementPlanningCompleteAnalysis: TeacherRetirementPlanningCompleteAnalysisResultResponseDto;

  protected override readonly _type =
    CreateTeacherRetirementPlanningResultResponseDto.name;
}
