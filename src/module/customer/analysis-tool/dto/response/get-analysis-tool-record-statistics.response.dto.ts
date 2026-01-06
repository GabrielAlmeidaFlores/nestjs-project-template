import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class MonthlyStatisticsDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public year: number;

  @ResponseDtoStringProperty()
  public month: string;

  @ResponseDtoNumberProperty()
  public count: number;

  protected override readonly _type = MonthlyStatisticsDto.name;
}

@ResponseDto()
export class GetAnalysisToolRecordStatisticsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public totalCount: number;

  @ResponseDtoObjectProperty(() => MonthlyStatisticsDto, { isArray: true })
  public monthlyStatistics: MonthlyStatisticsDto[];

  protected override readonly _type =
    GetAnalysisToolRecordStatisticsResponseDto.name;
}
