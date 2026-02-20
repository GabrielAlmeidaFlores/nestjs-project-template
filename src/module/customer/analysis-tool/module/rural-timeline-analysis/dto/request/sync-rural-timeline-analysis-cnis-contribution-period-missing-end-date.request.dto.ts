import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import { SyncRuralTimelineAnalysisCnisContributionPeriodMissingEndDateItemRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/sync-rural-timeline-analysis-cnis-contribution-period-missing-end-date-item.request.dto';

@RequestDto()
export class SyncRuralTimelineAnalysisCnisContributionPeriodMissingEndDateRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () =>
      SyncRuralTimelineAnalysisCnisContributionPeriodMissingEndDateItemRequestDto,
    {
      description:
        'Lista de períodos com data de fim ausente para sincronizar. Todos os períodos existentes serão substituídos por esta lista.',
      required: true,
      isArray: true,
    },
  )
  public missingEndDateList: SyncRuralTimelineAnalysisCnisContributionPeriodMissingEndDateItemRequestDto[];

  protected override readonly _type =
    SyncRuralTimelineAnalysisCnisContributionPeriodMissingEndDateRequestDto.name;
}
