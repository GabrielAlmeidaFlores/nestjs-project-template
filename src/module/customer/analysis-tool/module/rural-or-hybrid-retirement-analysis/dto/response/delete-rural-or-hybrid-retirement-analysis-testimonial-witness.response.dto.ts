import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementAnalysisId)
  public ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;

  protected override readonly _type =
    DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto.name;
}
