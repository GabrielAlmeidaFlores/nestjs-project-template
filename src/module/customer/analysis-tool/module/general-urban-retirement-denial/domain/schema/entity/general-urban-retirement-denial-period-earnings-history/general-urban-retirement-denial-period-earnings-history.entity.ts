import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { GeneralUrbanRetirementDenialPeriodEarningsHistoryId } from './value-object/general-urban-retirement-denial-period-earnings-history-id/general-urban-retirement-denial-period-earnings-history-id.value-object';

import type { GeneralUrbanRetirementDenialPeriodEarningsHistoryEntityPropsInterface } from './general-urban-retirement-denial-period-earnings-history.entity.props.interface';
import type { GeneralUrbanRetirementDenialPeriodId } from '../general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';

export class GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity extends BaseEntity<GeneralUrbanRetirementDenialPeriodEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly value: string | null;
  public readonly generalUrbanRetirementDenialPeriodId: GeneralUrbanRetirementDenialPeriodId;

  protected readonly _type =
    GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity.name;

  public constructor(
    props: GeneralUrbanRetirementDenialPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementDenialPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.value = props.value ?? null;
    this.generalUrbanRetirementDenialPeriodId =
      props.generalUrbanRetirementDenialPeriodId;
  }
}
