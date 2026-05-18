import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateTeacherRetirementPlanningRemunerationJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly contributionDate: Date;

  @RequestDtoValueObjectProperty(DecimalValue, { required: true })
  public readonly amount: DecimalValue;

  protected override readonly _type =
    CreateTeacherRetirementPlanningRemunerationJsonRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningRemunerationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateTeacherRetirementPlanningRemunerationJsonRequestDto,
    { required: true, isArray: true },
  )
  public readonly remunerations: CreateTeacherRetirementPlanningRemunerationJsonRequestDto[];

  protected override readonly _type =
    CreateTeacherRetirementPlanningRemunerationRequestDto.name;
}
