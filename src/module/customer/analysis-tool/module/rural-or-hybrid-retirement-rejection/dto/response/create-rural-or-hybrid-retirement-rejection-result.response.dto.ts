import { RuralOrHybridRetirementRejectionResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-result.interface';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralOrHybridRetirementRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object)
  public ruralOrHybridRetirementRejectionResult: RuralOrHybridRetirementRejectionResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public ruralOrHybridRetirementRejectionSimplifiedAnalysis?: string;

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionResultResponseDto.name;
}
