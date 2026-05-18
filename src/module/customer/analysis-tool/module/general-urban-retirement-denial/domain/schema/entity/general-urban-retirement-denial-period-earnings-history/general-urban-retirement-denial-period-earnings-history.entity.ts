import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/value-object/general-urban-retirement-denial-period-earnings-history-id/general-urban-retirement-denial-period-earnings-history-id.value-object';

import type { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import type { GeneralUrbanRetirementDenialPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/general-urban-retirement-denial-period-earnings-history.entity.props.interface';

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
