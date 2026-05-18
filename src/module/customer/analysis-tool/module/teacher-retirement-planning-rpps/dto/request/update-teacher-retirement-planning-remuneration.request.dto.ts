import { CreateTeacherRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/create-teacher-retirement-planning-remuneration.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';

@RequestDto()
export class UpdateTeacherRetirementPlanningRemunerationRequestDto extends CreateTeacherRetirementPlanningRemunerationRequestDto {
  protected override readonly _type =
    UpdateTeacherRetirementPlanningRemunerationRequestDto.name;
}
