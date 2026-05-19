import { TeacherRetirementPlanningRejectionResultInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/interface/teacher-retirement-planning-rejection-result.interface';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTeacherRetirementPlanningRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object)
  public teacherRetirementPlanningRejectionResult: TeacherRetirementPlanningRejectionResultInterface;

  protected override readonly _type =
    CreateTeacherRetirementPlanningRejectionResultResponseDto.name;
}
