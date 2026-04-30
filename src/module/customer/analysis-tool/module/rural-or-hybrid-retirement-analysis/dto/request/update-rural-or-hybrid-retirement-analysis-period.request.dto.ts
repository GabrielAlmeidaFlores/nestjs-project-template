import { RuralOrHybridRetirementAnalysisPeriodItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralOrHybridRetirementAnalysisPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisPeriodItemRequestDto,
    { isArray: true },
  )
  public periods: RuralOrHybridRetirementAnalysisPeriodItemRequestDto[];

  protected override readonly _type =
    UpdateRuralOrHybridRetirementAnalysisPeriodRequestDto.name;
}
