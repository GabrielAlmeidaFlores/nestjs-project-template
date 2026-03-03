import { GetRuralTimelineAnalysisCnisContributionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/get-rural-timeline-analysis-cnis-contribution-period.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListRuralTimelineAnalysisCnisContributionPeriodResponseDto extends ListDataResponseDto<GetRuralTimelineAnalysisCnisContributionPeriodResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetRuralTimelineAnalysisCnisContributionPeriodResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetRuralTimelineAnalysisCnisContributionPeriodResponseDto[];

  protected override readonly _type =
    ListRuralTimelineAnalysisCnisContributionPeriodResponseDto.name;
}
