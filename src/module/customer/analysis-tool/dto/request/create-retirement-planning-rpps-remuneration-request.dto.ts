import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRetirementPlanningRppsRemunerationJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly date: Date;

  @RequestDtoNumberProperty({ required: true })
  public readonly amount: number;

  protected override readonly _type =
    CreateRetirementPlanningRppsRemunerationJsonRequestDto.name;
}

@RequestDto()
export class CreateRetirementPlanningRppsRemunerationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateRetirementPlanningRppsRemunerationJsonRequestDto,
    { required: true, isArray: true },
  )
  public readonly remunerations: CreateRetirementPlanningRppsRemunerationJsonRequestDto[];

  protected override readonly _type =
    CreateRetirementPlanningRppsRemunerationRequestDto.name;
}
