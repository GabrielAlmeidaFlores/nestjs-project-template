import { RuralOrHybridRetirementAnalysisKinshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/enum/rural-or-hybrid-retirement-analysis-kinship.enum';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/enum/rural-or-hybrid-retirement-analysis-period-member-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class RuralOrHybridRetirementAnalysisPeriodMemberDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeEnum,
  )
  public type: RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeEnum;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodMemberDocumentRequestDto.name;
}

@RequestDto()
export class RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public federalDocument?: string;

  @RequestDtoEnumProperty(RuralOrHybridRetirementAnalysisKinshipEnum, {
    required: false,
  })
  public kinship?: RuralOrHybridRetirementAnalysisKinshipEnum;

  @RequestDtoBooleanProperty({ required: false })
  public hasReceivedRuralBenefit?: boolean;

  @RequestDtoStringProperty({ required: false })
  public benefitNumber?: string;

  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisPeriodMemberDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: RuralOrHybridRetirementAnalysisPeriodMemberDocumentRequestDto[];

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementAnalysisPeriodMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto,
    { isArray: true },
  )
  public members: RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementAnalysisPeriodMemberRequestDto.name;
}
