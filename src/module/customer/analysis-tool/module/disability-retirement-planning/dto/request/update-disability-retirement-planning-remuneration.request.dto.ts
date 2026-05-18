import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDisabilityRetirementPlanningRemunerationJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly remunerationDate: Date;

  @RequestDtoNumberProperty({ required: true })
  public readonly remunerationAmount: number;

  protected override readonly _type =
    UpdateDisabilityRetirementPlanningRemunerationJsonRequestDto.name;
}

@RequestDto()
export class UpdateDisabilityRetirementPlanningRemunerationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => UpdateDisabilityRetirementPlanningRemunerationJsonRequestDto,
    { required: true, isArray: true },
  )
  public readonly remunerations: UpdateDisabilityRetirementPlanningRemunerationJsonRequestDto[];

  protected override readonly _type =
    UpdateDisabilityRetirementPlanningRemunerationRequestDto.name;
}
