import { RuralTimelineAnalysisPeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/enum/rural-timeline-analysis-period-economic-aspect-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodEconomicAspectTypeEnum)
  public type: RuralTimelineAnalysisPeriodEconomicAspectTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public content?: string;

  protected override readonly _type =
    CreateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto.name;
}
