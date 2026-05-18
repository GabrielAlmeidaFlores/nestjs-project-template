import { CreateTeacherRetirementPlanningRppsRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/create-teacher-retirement-planning.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';

@RequestDto()
export class UpdateTeacherRetirementPlanningRppsRequestDto extends CreateTeacherRetirementPlanningRppsRequestDto {
  protected override readonly _type =
    UpdateTeacherRetirementPlanningRppsRequestDto.name;
}
