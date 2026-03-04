import { RetirementAnalysisObjectiveTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/enum/retirement-analysis-objective-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSpecialCategoryRetirementAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public analysisCustomName?: string;

  @RequestDtoEnumProperty(RetirementAnalysisObjectiveTypeEnum, {
    required: false,
  })
  public retirementAnalysisObjectiveType?: RetirementAnalysisObjectiveTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public publicServiceFederativeEntityName?: string;

  @RequestDtoStringProperty({ required: false })
  public publicServiceStateAbbreviation?: string;

  @RequestDtoBooleanProperty({ required: false })
  public hasConfirmedExposureToHarmfulAgents?: boolean;

  @RequestDtoNumberProperty({ required: false })
  public currentWorkflowStepIndex?: number;

  protected override readonly _type =
    UpdateSpecialCategoryRetirementAnalysisRequestDto.name;
}
