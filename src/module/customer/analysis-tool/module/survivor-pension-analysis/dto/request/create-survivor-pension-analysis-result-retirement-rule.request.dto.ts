import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSurvivorPensionAnalysisResultRetirementRuleRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public ruleName?: string;

  @RequestDtoBooleanProperty({ required: false })
  public isRequirementMet?: boolean;

  @RequestDtoDateProperty({ required: false })
  public entitlementDate?: Date;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public estimatedRmi?: DecimalValue;

  @RequestDtoBooleanProperty({ required: false })
  public isBestRmi?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public isHighestClaimValue?: boolean;

  @RequestDtoStringProperty({ required: false })
  public detailedAnalysis?: string;

  protected override readonly _type =
    CreateSurvivorPensionAnalysisResultRetirementRuleRequestDto.name;
}
