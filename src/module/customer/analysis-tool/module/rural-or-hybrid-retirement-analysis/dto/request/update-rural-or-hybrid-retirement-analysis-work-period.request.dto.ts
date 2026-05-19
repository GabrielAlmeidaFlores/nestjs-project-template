import { RuralOrHybridRetirementAnalysisWorkPeriodItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-work-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisWorkPeriodItemRequestDto,
    { isArray: true },
  )
  public workPeriods: RuralOrHybridRetirementAnalysisWorkPeriodItemRequestDto[];

  protected override readonly _type =
    UpdateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto.name;
}
