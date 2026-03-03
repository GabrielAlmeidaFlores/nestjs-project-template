import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty({
    description: 'Anos de tempo de contribuição ganhos.',
  })
  public contributionTimeGainedYears: number;

  @ResponseDtoNumberProperty({
    description: 'Meses de tempo de contribuição ganhos.',
  })
  public contributionTimeGainedMonths: number;

  @ResponseDtoNumberProperty({
    description: 'Dias de tempo de contribuição ganhos.',
  })
  public contributionTimeGainedDays: number;

  @ResponseDtoStringProperty({
    description: 'Observação técnica gerada pela IA.',
  })
  public technicalObservation: string;

  @ResponseDtoDateProperty({
    description: 'Data de início do período convencional proposto.',
  })
  public conventionalPeriodStartDate: Date;

  @ResponseDtoDateProperty({
    description: 'Data de fim do período convencional proposto.',
  })
  public conventionalPeriodEndDate: Date;

  protected override readonly _type =
    SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto.name;
}
