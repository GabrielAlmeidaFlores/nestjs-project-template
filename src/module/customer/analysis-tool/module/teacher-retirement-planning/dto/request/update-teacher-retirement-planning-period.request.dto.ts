import { CreateTeacherRetirementPlanningPeriodDataRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/create-teacher-retirement-planning-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTeacherRetirementPlanningPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateTeacherRetirementPlanningPeriodDataRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public periods: CreateTeacherRetirementPlanningPeriodDataRequestDto[];

  protected override readonly _type =
    UpdateTeacherRetirementPlanningPeriodRequestDto.name;
}