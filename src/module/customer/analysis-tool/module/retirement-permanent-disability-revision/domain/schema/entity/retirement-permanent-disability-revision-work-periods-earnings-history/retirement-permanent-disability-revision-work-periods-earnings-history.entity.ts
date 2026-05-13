import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history/value-object/retirement-permanent-disability-revision-work-periods-earnings-history-id.value-object';

import type { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history/retirement-permanent-disability-revision-work-periods-earnings-history.entity.props.interface';

export class RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity extends BaseEntity<RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly retirementPermanentDisabilityRevisionWorkPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntityPropsInterface,
  ) {
    super(
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryId,
      props,
    );
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.retirementPermanentDisabilityRevisionWorkPeriodsId =
      props.retirementPermanentDisabilityRevisionWorkPeriodsId;
  }
}
