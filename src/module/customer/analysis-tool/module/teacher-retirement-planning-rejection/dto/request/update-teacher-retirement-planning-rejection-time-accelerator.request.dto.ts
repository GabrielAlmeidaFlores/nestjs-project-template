import { TeacherRetirementPlanningRejectionTimeAcceleratorItemRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/create-teacher-retirement-planning-rejection-time-accelerator.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => TeacherRetirementPlanningRejectionTimeAcceleratorItemRequestDto,
    { isArray: true },
  )
  public timeAccelerators: TeacherRetirementPlanningRejectionTimeAcceleratorItemRequestDto[];

  protected override readonly _type =
    UpdateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto.name;
}
