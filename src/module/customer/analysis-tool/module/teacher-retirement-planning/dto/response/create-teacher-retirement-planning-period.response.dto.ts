import { TeacherRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTeacherRetirementPlanningPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TeacherRetirementPlanningPeriodId)
  public teacherRetirementPlanningPeriodId: TeacherRetirementPlanningPeriodId;

  protected override readonly _type =
    CreateTeacherRetirementPlanningPeriodResponseDto.name;
}
