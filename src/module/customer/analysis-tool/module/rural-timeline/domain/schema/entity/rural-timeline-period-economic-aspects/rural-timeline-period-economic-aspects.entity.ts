import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelinePeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/enum/rural-timeline-period-economic-aspect-type.enum';
import { RuralTimelinePeriodEconomicAspectsEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/rural-timeline-period-economic-aspects.entity.props.interface';
import { RuralTimelinePeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/value-object/rural-timeline-period-economic-aspects-id/rural-timeline-period-economic-aspects-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';

export class RuralTimelinePeriodEconomicAspectsEntity extends BaseEntity<RuralTimelinePeriodEconomicAspectsId> {
  @Description('Tipo de aspecto econômico.')
  public readonly type: RuralTimelinePeriodEconomicAspectTypeEnum;

  @Description('Conteúdo do aspecto econômico.')
  public readonly content: string | null;

  @Description('ID do período da linha do tempo rural associado.')
  public readonly ruralTimelinePeriodId: RuralTimelinePeriodId;

  protected readonly _type = RuralTimelinePeriodEconomicAspectsEntity.name;

  public constructor(
    props: RuralTimelinePeriodEconomicAspectsEntityPropsInterface,
  ) {
    super(RuralTimelinePeriodEconomicAspectsId, props);

    this.type = props.type;
    this.content = props.content ?? null;
    this.ruralTimelinePeriodId = props.ruralTimelinePeriodId;
  }
}
