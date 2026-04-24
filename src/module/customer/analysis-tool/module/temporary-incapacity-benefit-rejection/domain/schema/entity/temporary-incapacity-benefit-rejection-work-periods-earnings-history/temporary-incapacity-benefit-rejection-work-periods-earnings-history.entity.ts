import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history/value-object/temporary-incapacity-benefit-rejection-work-periods-earnings-history-id.value-object';

import type { TemporaryIncapacityBenefitRejectionWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/value-object/temporary-incapacity-benefit-rejection-work-periods-id.value-object';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history/temporary-incapacity-benefit-rejection-work-periods-earnings-history.entity.props.interface';

export class TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity extends BaseEntity<TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly temporaryIncapacityBenefitRejectionWorkPeriodsId: TemporaryIncapacityBenefitRejectionWorkPeriodsId;

  protected readonly _type =
    TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntityPropsInterface,
  ) {
    super(
      TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryId,
      props,
    );
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.temporaryIncapacityBenefitRejectionWorkPeriodsId =
      props.temporaryIncapacityBenefitRejectionWorkPeriodsId;
  }
}
