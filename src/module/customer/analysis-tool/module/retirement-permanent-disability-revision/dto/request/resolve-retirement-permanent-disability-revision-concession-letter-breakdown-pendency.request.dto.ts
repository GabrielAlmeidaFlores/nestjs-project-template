import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

export enum ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyActionEnum {
  CONSIDER = 'CONSIDER',
  IGNORE = 'IGNORE',
}

@RequestDto()
export class ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyActionEnum,
    { required: true },
  )
  public action: ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyActionEnum;

  protected override readonly _type =
    ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyRequestDto.name;
}
