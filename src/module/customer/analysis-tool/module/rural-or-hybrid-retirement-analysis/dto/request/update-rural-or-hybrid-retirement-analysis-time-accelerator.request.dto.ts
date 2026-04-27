import { RuralOrHybridRetirementAnalysisTimeAcceleratorItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-time-accelerator.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisTimeAcceleratorItemRequestDto,
    { isArray: true },
  )
  public timeAccelerators: RuralOrHybridRetirementAnalysisTimeAcceleratorItemRequestDto[];

  protected override readonly _type =
    UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto.name;
}
