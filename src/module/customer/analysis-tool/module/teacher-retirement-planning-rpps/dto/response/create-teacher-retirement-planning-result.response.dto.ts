import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class TeacherRetirementPlanningRppsCompleteAnalysisTimelineItemResponseDto extends BaseBuildableDtoObject {
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
    TeacherRetirementPlanningRppsCompleteAnalysisTimelineItemResponseDto.name;
}

@ResponseDto()
export class TeacherRetirementPlanningRppsCompleteAnalysisRetirementRuleResponseDto extends BaseBuildableDtoObject {
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
    TeacherRetirementPlanningRppsCompleteAnalysisRetirementRuleResponseDto.name;
}

@ResponseDto()
export class TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => TeacherRetirementPlanningRppsCompleteAnalysisTimelineItemResponseDto,
    { isArray: true },
  )
  public timeline: TeacherRetirementPlanningRppsCompleteAnalysisTimelineItemResponseDto[];

  @ResponseDtoObjectProperty(
    () => TeacherRetirementPlanningRppsCompleteAnalysisRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: TeacherRetirementPlanningRppsCompleteAnalysisRetirementRuleResponseDto[];

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
    TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto.name;
}

@ResponseDto()
export class CreateTeacherRetirementPlanningResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto,
  )
  public readonly teacherRetirementPlanningCompleteAnalysis: TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto;

  protected override readonly _type =
    CreateTeacherRetirementPlanningResultResponseDto.name;
}
