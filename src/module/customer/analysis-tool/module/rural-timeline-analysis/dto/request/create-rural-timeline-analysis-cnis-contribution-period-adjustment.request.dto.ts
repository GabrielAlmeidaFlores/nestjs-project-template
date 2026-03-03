import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({
    description: 'Observação técnica gerada pela IA (confirmada pelo usuário).',
  })
  public technicalObservation: string;

  @RequestDtoNumberProperty({
    description: 'Anos de tempo de contribuição ganhos.',
  })
  public contributionTimeGainedYears: number;

  @RequestDtoNumberProperty({
    description: 'Meses de tempo de contribuição ganhos.',
  })
  public contributionTimeGainedMonths: number;

  @RequestDtoNumberProperty({
    description: 'Dias de tempo de contribuição ganhos.',
  })
  public contributionTimeGainedDays: number;

  @RequestDtoDateProperty({
    description: 'Data de início do período convencional.',
  })
  public conventionalPeriodStartDate: Date;

  @RequestDtoDateProperty({
    description: 'Data de término do período convencional.',
  })
  public conventionalPeriodEndDate: Date;

  protected override readonly _type =
    CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto.name;
}
