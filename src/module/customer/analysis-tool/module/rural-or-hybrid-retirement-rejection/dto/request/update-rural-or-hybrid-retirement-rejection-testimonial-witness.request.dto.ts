import { RuralOrHybridRetirementRejectionTestimonialWitnessItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-testimonial-witness.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementRejectionTestimonialWitnessItemRequestDto,
    { isArray: true },
  )
  public testimonialWitnesses: RuralOrHybridRetirementRejectionTestimonialWitnessItemRequestDto[];

  protected override readonly _type =
    UpdateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto.name;
}
