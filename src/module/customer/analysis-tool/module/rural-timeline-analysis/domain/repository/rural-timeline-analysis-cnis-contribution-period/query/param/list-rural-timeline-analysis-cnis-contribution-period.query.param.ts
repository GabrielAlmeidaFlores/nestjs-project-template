import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

export class ListRuralTimelineAnalysisCnisContributionPeriodQueryParam extends ListDataInputModel {
  public ruralTimelineAnalysis?: RuralTimelineAnalysisId | undefined;

  protected override readonly _type =
    ListRuralTimelineAnalysisCnisContributionPeriodQueryParam.name;

  public constructor(
    props: Partial<ListRuralTimelineAnalysisCnisContributionPeriodQueryParam> = {},
  ) {
    super(props);
    this.ruralTimelineAnalysis = props.ruralTimelineAnalysis ?? undefined;
  }
}
