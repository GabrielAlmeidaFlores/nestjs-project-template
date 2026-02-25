import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty({ description: 'Anos de tempo de contribuição ganhos.' })
  public contributionTimeGainedYears: number;

  @ResponseDtoNumberProperty({ description: 'Meses de tempo de contribuição ganhos.' })
  public contributionTimeGainedMonths: number;

  @ResponseDtoNumberProperty({ description: 'Dias de tempo de contribuição ganhos.' })
  public contributionTimeGainedDays: number;

  @ResponseDtoStringProperty({ description: 'Observação técnica gerada pela IA.' })
  public technicalObservation: string;

  protected override readonly _type =
    SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto.name;
}
