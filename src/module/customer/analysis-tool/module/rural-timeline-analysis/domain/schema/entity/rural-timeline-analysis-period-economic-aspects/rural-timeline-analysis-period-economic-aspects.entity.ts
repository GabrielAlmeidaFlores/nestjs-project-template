import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/enum/rural-timeline-analysis-period-economic-aspect-type.enum';
import { RuralTimelineAnalysisPeriodEconomicAspectsEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity.props.interface';
import { RuralTimelineAnalysisPeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/value-object/rural-timeline-analysis-period-economic-aspects-id/rural-timeline-analysis-period-economic-aspects-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

export class RuralTimelineAnalysisPeriodEconomicAspectsEntity extends BaseEntity<RuralTimelineAnalysisPeriodEconomicAspectsId> {
  @Description('Tipo de aspecto econômico.')
  public readonly type: RuralTimelineAnalysisPeriodEconomicAspectTypeEnum;

  @Description('Conteúdo do aspecto econômico.')
  public readonly content: string | null;

  @Description('ID do período da linha do tempo rural associado.')
  public readonly ruralTimelinePeriodId: RuralTimelineAnalysisPeriodId;

  protected readonly _type =
    RuralTimelineAnalysisPeriodEconomicAspectsEntity.name;

  public constructor(
    props: RuralTimelineAnalysisPeriodEconomicAspectsEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisPeriodEconomicAspectsId, props);

    this.type = props.type;
    this.content = props.content ?? null;
    this.ruralTimelinePeriodId = props.ruralTimelinePeriodId;
  }
}
