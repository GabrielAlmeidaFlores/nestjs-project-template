import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history/value-object/temporary-incapacity-benefit-termination-work-periods-earnings-history-id.value-object';

import type { TemporaryIncapacityBenefitTerminationWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/value-object/temporary-incapacity-benefit-termination-work-periods-id.value-object';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history/temporary-incapacity-benefit-termination-work-periods-earnings-history.entity.props.interface';

export class TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly temporaryIncapacityBenefitTerminationWorkPeriodsId: TemporaryIncapacityBenefitTerminationWorkPeriodsId;

  protected readonly _type =
    TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntityPropsInterface,
  ) {
    super(
      TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryId,
      props,
    );
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.temporaryIncapacityBenefitTerminationWorkPeriodsId =
      props.temporaryIncapacityBenefitTerminationWorkPeriodsId;
  }
}
