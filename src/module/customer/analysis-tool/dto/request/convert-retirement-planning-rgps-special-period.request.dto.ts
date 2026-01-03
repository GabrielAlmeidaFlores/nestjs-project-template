import { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataConvertRetirementPlanningRgpsSpecialPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(RetirementPlanningRgpsId)
  public retirementPlanningRgpsId: RetirementPlanningRgpsId;

  @RequestDtoValueObjectProperty(RetirementPlanningRgpsSpecialPeriodId)
  public retirementPlanningRgpsSpecialPeriodId: RetirementPlanningRgpsSpecialPeriodId;

  protected override readonly _type =
    DataConvertRetirementPlanningRgpsSpecialPeriodRequestDto.name;
}

@RequestDto()
export class ConvertRetirementPlanningRgpsSpecialPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataConvertRetirementPlanningRgpsSpecialPeriodRequestDto,
  )
  public json: DataConvertRetirementPlanningRgpsSpecialPeriodRequestDto;

  protected override readonly _type =
    ConvertRetirementPlanningRgpsSpecialPeriodRequestDto.name;
}
