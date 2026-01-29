import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListRuralTimelineAnalysisCnisContributionPeriodRequestDto extends ListDataRequestDto {
  protected override readonly _type =
    ListRuralTimelineAnalysisCnisContributionPeriodRequestDto.name;
}
