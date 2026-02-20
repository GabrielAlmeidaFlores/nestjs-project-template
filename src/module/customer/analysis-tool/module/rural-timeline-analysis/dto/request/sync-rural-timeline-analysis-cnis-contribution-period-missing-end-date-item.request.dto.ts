import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SyncRuralTimelineAnalysisCnisContributionPeriodMissingEndDateItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({
    description:
      'Data de fim ausente para período de contribuição CNIS que precisa ser registrada.',
    required: true,
  })
  public missingEndDate: Date;

  @RequestDtoValueObjectProperty(DecimalValue, {
    description:
      'Valor real da remuneração para o período com data de fim ausente.',
    required: true,
  })
  public actualRemunerationAmount: DecimalValue;

  protected override readonly _type =
    SyncRuralTimelineAnalysisCnisContributionPeriodMissingEndDateItemRequestDto.name;
}
