import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import { SyncRuralTimelineAnalysisCnisContributionPeriodLateContributionItemRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/sync-rural-timeline-analysis-cnis-contribution-period-late-contribution-item.request.dto';

@RequestDto()
export class SyncRuralTimelineAnalysisCnisContributionPeriodLateContributionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () =>
      SyncRuralTimelineAnalysisCnisContributionPeriodLateContributionItemRequestDto,
    {
      description:
        'Lista de contribuições em atraso para sincronizar. Todos os registros existentes serão substituídos por esta lista. A análise de impacto por IA será executada automaticamente.',
      required: true,
      isArray: true,
    },
  )
  public lateContributionList: SyncRuralTimelineAnalysisCnisContributionPeriodLateContributionItemRequestDto[];

  protected override readonly _type =
    SyncRuralTimelineAnalysisCnisContributionPeriodLateContributionRequestDto.name;
}
