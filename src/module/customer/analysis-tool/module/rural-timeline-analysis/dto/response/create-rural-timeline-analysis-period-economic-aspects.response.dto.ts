import { RuralTimelineAnalysisPeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/value-object/rural-timeline-analysis-period-economic-aspects-id/rural-timeline-analysis-period-economic-aspects-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralTimelineAnalysisPeriodEconomicAspectsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralTimelineAnalysisPeriodEconomicAspectsId)
  public ruralTimelineAnalysisPeriodEconomicAspectsId: RuralTimelineAnalysisPeriodEconomicAspectsId;

  protected override readonly _type =
    CreateRuralTimelineAnalysisPeriodEconomicAspectsResponseDto.name;
}
