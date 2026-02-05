import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RuralTimelineAnalysisWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/enum/rural-timeline-work-regime.enum';
import { CreateRuralTimelineAnalysisPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralTimelineAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoEnumProperty(RuralTimelineAnalysisWorkRegimeEnum)
  public workRegime: RuralTimelineAnalysisWorkRegimeEnum;

  @RequestDtoObjectProperty(() => CreateRuralTimelineAnalysisPeriodRequestDto, {
    isArray: true,
  })
  public periods: CreateRuralTimelineAnalysisPeriodRequestDto[];

  protected override readonly _type =
    CreateRuralTimelineAnalysisRequestDto.name;
}
