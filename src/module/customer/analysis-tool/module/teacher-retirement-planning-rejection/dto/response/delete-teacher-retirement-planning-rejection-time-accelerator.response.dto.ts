import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DeleteTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TeacherRetirementPlanningRejectionId)
  public teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;

  protected override readonly _type =
    DeleteTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto.name;
}
