import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListRetirementPlanningRgpsPeriodRequestDto extends ListDataRequestDto {
  @RequestDtoValueObjectProperty(RetirementPlanningRgpsId, { required: true })
  public readonly retirementPlanningRgpsId: RetirementPlanningRgpsId;

  protected override readonly _type =
    ListRetirementPlanningRgpsPeriodRequestDto.name;
}
