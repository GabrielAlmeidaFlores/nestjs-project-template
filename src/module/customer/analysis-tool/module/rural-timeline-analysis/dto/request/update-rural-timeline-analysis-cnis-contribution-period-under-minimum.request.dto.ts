import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({
    description:
      'Data específica em que foi realizada uma contribuição abaixo do valor mínimo previdenciário.',
    required: false,
  })
  public contributionDate?: Date;

  @RequestDtoValueObjectProperty(DecimalValue, {
    description:
      'Valor da contribuição previdenciária que ficou abaixo do salário mínimo exigido.',
    required: false,
  })
  public contributionAmount?: DecimalValue;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumRequestDto.name;
}
