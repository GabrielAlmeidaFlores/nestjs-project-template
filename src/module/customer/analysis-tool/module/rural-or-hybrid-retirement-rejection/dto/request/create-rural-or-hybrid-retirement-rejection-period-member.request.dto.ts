import { RuralOrHybridRetirementRejectionKinshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/enum/rural-or-hybrid-retirement-rejection-kinship.enum';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/enum/rural-or-hybrid-retirement-rejection-period-member-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class RuralOrHybridRetirementRejectionPeriodMemberDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeEnum,
  )
  public type: RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeEnum;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionPeriodMemberDocumentRequestDto.name;
}

@RequestDto()
export class RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public federalDocument?: string;

  @RequestDtoEnumProperty(RuralOrHybridRetirementRejectionKinshipEnum, {
    required: false,
  })
  public kinship?: RuralOrHybridRetirementRejectionKinshipEnum;

  @RequestDtoBooleanProperty({ required: false })
  public hasReceivedRuralBenefit?: boolean;

  @RequestDtoStringProperty({ required: false })
  public benefitNumber?: string;

  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementRejectionPeriodMemberDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: RuralOrHybridRetirementRejectionPeriodMemberDocumentRequestDto[];

  protected override readonly _type =
    RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementRejectionPeriodMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto,
    { isArray: true },
  )
  public members: RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionPeriodMemberRequestDto.name;
}
