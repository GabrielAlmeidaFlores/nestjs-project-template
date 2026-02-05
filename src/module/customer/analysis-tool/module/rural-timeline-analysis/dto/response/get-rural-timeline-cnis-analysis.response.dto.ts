import { CnisTimelinePeriodTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/enum/cnis-timeline-period-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CnisTimelinePeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(CnisTimelinePeriodTypeEnum)
  public type: CnisTimelinePeriodTypeEnum;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoStringProperty({ required: false })
  public description?: string;

  protected override readonly _type = CnisTimelinePeriodResponseDto.name;
}

@ResponseDto()
export class CnisTimelineContributionSummaryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public ruralYears: number;

  @ResponseDtoNumberProperty()
  public ruralMonths: number;

  @ResponseDtoNumberProperty()
  public urbanYears: number;

  @ResponseDtoNumberProperty()
  public urbanMonths: number;

  @ResponseDtoNumberProperty()
  public overlapMonths: number;

  @ResponseDtoNumberProperty()
  public pendingYears: number;

  @ResponseDtoNumberProperty()
  public pendingMonths: number;

  protected override readonly _type =
    CnisTimelineContributionSummaryResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineCnisAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => CnisTimelinePeriodResponseDto, {
    isArray: true,
  })
  public periods: CnisTimelinePeriodResponseDto[];

  @ResponseDtoObjectProperty(() => CnisTimelineContributionSummaryResponseDto)
  public summary: CnisTimelineContributionSummaryResponseDto;

  @ResponseDtoDateProperty()
  public earliestDate: Date;

  @ResponseDtoDateProperty()
  public latestDate: Date;

  protected override readonly _type =
    GetRuralTimelineCnisAnalysisResponseDto.name;
}
