import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateTeacherRetirementPlanningPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TeacherRetirementPlanningId)
  public teacherRetirementPlanningId: TeacherRetirementPlanningId;

  protected override readonly _type =
    UpdateTeacherRetirementPlanningPeriodResponseDto.name;
}
