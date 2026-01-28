import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/enum/rural-timeline-analysis-period-economic-aspect-type.enum';
import { RuralTimelineAnalysisPeriodEconomicAspectsEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity.props.interface';
import { RuralTimelineAnalysisPeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/value-object/rural-timeline-analysis-period-economic-aspects-id/rural-timeline-analysis-period-economic-aspects-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

export class RuralTimelineAnalysisPeriodEconomicAspectsEntity extends BaseEntity<RuralTimelineAnalysisPeriodEconomicAspectsId> {
  @Description(
    'Tipo de aspecto econômico verificado: CNPJ ativo, outras rendas, veículos rurais, maquinário agrícola ou empregados.',
  )
  public readonly type: RuralTimelineAnalysisPeriodEconomicAspectTypeEnum;

  @Description(
    'Descrição detalhada ou justificativa sobre este aspecto econômico da atividade rural.',
  )
  public readonly content: string | null;

  @Description(
    'Período de atividade rural ao qual este aspecto econômico se refere.',
  )
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
