import { RuralOrHybridRetirementRejectionWorkPeriodItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-work-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralOrHybridRetirementRejectionWorkPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementRejectionWorkPeriodItemRequestDto,
    { isArray: true },
  )
  public workPeriods: RuralOrHybridRetirementRejectionWorkPeriodItemRequestDto[];

  protected override readonly _type =
    UpdateRuralOrHybridRetirementRejectionWorkPeriodRequestDto.name;
}
