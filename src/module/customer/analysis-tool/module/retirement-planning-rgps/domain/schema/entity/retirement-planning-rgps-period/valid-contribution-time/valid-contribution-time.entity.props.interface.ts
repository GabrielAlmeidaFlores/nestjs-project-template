import type { ValidContributionTimeDataEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/valid-contribution-time/valid-contribution-time-data.entity';
import type { ValidContributionTimeDataEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/valid-contribution-time/valid-contribution-time-data.entity.props.interface';

export interface ValidContributionTimeEntityPropsInterface {
  data?:
    | ValidContributionTimeDataEntity
    | ValidContributionTimeDataEntityPropsInterface
    | null;
  abreviado?: string;
  dias?: number;
  meses?: number;
  anos?: number;
  totalContribuicao?: string | null;
}
