import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RuralOrHybridRetirementAnalysisActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-activity-type.enum';
import { RuralOrHybridRetirementAnalysisRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-requested-benefit.enum';
import { RuralOrHybridRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/enum/rural-or-hybrid-retirement-analysis-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralOrHybridRetirementAnalysisDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(RuralOrHybridRetirementAnalysisDocumentTypeEnum)
  public type: RuralOrHybridRetirementAnalysisDocumentTypeEnum;

  protected override readonly _type =
    CreateRuralOrHybridRetirementAnalysisDocumentRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(RuralOrHybridRetirementAnalysisActivityTypeEnum, {
    required: false,
  })
  public activityType?: RuralOrHybridRetirementAnalysisActivityTypeEnum;

  @RequestDtoEnumProperty(RuralOrHybridRetirementAnalysisRequestedBenefitEnum, {
    required: false,
  })
  public requestedBenefit?: RuralOrHybridRetirementAnalysisRequestedBenefitEnum;

  @RequestDtoObjectProperty(
    () => CreateRuralOrHybridRetirementAnalysisDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateRuralOrHybridRetirementAnalysisDocumentRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementAnalysisRequestDto.name;
}
