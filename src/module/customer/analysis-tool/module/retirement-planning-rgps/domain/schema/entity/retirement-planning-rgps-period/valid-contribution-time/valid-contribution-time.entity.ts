import { ValidContributionTimeDataEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/valid-contribution-time/valid-contribution-time-data.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { ValidContributionTimeDataEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/valid-contribution-time/valid-contribution-time-data.entity.props.interface';
import type { ValidContributionTimeEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/valid-contribution-time/valid-contribution-time.entity.props.interface';

export class ValidContributionTimeEntity extends BaseBuildableObject {
  @Description('Período (data início/fim) do tempo de contribuição válido.')
  public readonly data: ValidContributionTimeDataEntity | null;

  @Description('Tempo de contribuição em formato abreviado (ex: 1a 2m 3d).')
  public readonly abreviado: string;

  @Description('Dias de contribuição válidos.')
  public readonly dias: number;

  @Description('Meses de contribuição válidos.')
  public readonly meses: number;

  @Description('Anos de contribuição válidos.')
  public readonly anos: number;

  @Description('Total de contribuição em formato legível.')
  public readonly totalContribuicao: string | null;

  protected override readonly _type = ValidContributionTimeEntity.name;

  public constructor(props: ValidContributionTimeEntityPropsInterface = {}) {
    super();
    this.data =
      props.data !== null
        ? props.data instanceof ValidContributionTimeDataEntity
          ? props.data
          : new ValidContributionTimeDataEntity(
              props.data as ValidContributionTimeDataEntityPropsInterface,
            )
        : null;
    this.abreviado = props.abreviado ?? '';
    this.dias = props.dias ?? 0;
    this.meses = props.meses ?? 0;
    this.anos = props.anos ?? 0;
    this.totalContribuicao = props.totalContribuicao ?? null;
  }
}
