import { RuralOrHybridRetirementRejectionInsuredRelationshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/enum/rural-or-hybrid-retirement-rejection-insured-relationship.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class RuralOrHybridRetirementRejectionTestimonialWitnessDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionTestimonialWitnessDocumentRequestDto.name;
}

@RequestDto()
export class RuralOrHybridRetirementRejectionTestimonialWitnessItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public fullName?: string;

  @RequestDtoStringProperty({ required: false })
  public federalDocument?: string;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementRejectionInsuredRelationshipEnum,
    { required: false },
  )
  public insuredRelationship?: RuralOrHybridRetirementRejectionInsuredRelationshipEnum;

  @RequestDtoDateProperty({ required: false })
  public canTestifyStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public canTestifyEndDate?: Date;

  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementRejectionTestimonialWitnessDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: RuralOrHybridRetirementRejectionTestimonialWitnessDocumentRequestDto[];

  protected override readonly _type =
    RuralOrHybridRetirementRejectionTestimonialWitnessItemRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementRejectionTestimonialWitnessItemRequestDto,
    { isArray: true },
  )
  public testimonialWitnesses: RuralOrHybridRetirementRejectionTestimonialWitnessItemRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto.name;
}
