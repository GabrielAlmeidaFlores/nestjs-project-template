import { CreateTeacherRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/create-teacher-retirement-planning.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';

@RequestDto()
export class UpdateTeacherRetirementPlanningRequestDto extends CreateTeacherRetirementPlanningRequestDto {
  protected override readonly _type =
    UpdateTeacherRetirementPlanningRequestDto.name;
}
