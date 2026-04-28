import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { BpcDisabilityTerminationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-category.enum';
import { BpcDisabilityTerminationDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-degree.enum';
import { BpcDisabilityTerminationDisabilityTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateBpcDisabilityTerminationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public readonly analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public readonly analysisName?: string;

  @RequestDtoEnumProperty(BpcDisabilityTerminationCategoryEnum, {
    required: false,
  })
  public readonly category?: BpcDisabilityTerminationCategoryEnum;

  @RequestDtoEnumProperty(BpcDisabilityTerminationDisabilityTypeEnum, {
    required: false,
  })
  public readonly disabilityType?: BpcDisabilityTerminationDisabilityTypeEnum;

  @RequestDtoEnumProperty(BpcDisabilityTerminationDisabilityDegreeEnum, {
    required: false,
  })
  public readonly disabilityDegree?: BpcDisabilityTerminationDisabilityDegreeEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly benefitCessationReason?: string;

  @RequestDtoBooleanProperty({ required: false })
  public readonly livesAlone?: boolean;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly inssBenefitNumbers?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly legalProceedingNumbers?: string[];

  protected override readonly _type =
    UpdateBpcDisabilityTerminationRequestDto.name;
}
