import { RuralOrHybridRetirementAnalysisActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-activity-type.enum';
import { RuralOrHybridRetirementAnalysisRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-requested-benefit.enum';
import { CreateRuralOrHybridRetirementAnalysisDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralOrHybridRetirementAnalysisRequestDto extends BaseBuildableDtoObject {
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
    UpdateRuralOrHybridRetirementAnalysisRequestDto.name;
}
