import { Description } from '@shared/system/decorator/property/description/description.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { ValidContributionTimeDataEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/valid-contribution-time/valid-contribution-time-data.entity.props.interface';

export class ValidContributionTimeDataEntity extends BaseBuildableObject {
  @Description('Data de início do período de contribuição válido.')
  public readonly dataInicio: Date | null;

  @Description('Data de fim do período de contribuição válido.')
  public readonly dataFim: Date | null;

  protected override readonly _type = ValidContributionTimeDataEntity.name;

  public constructor(
    props: ValidContributionTimeDataEntityPropsInterface = {},
  ) {
    super();
    this.dataInicio = props.dataInicio ?? null;
    this.dataFim = props.dataFim ?? null;
  }
}
