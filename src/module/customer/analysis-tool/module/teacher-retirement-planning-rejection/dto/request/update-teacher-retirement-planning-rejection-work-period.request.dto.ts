import { TeacherRetirementPlanningRejectionWorkPeriodItemRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/create-teacher-retirement-planning-rejection-work-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTeacherRetirementPlanningRejectionWorkPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => TeacherRetirementPlanningRejectionWorkPeriodItemRequestDto,
    { isArray: true },
  )
  public workPeriods: TeacherRetirementPlanningRejectionWorkPeriodItemRequestDto[];

  protected override readonly _type =
    UpdateTeacherRetirementPlanningRejectionWorkPeriodRequestDto.name;
}
