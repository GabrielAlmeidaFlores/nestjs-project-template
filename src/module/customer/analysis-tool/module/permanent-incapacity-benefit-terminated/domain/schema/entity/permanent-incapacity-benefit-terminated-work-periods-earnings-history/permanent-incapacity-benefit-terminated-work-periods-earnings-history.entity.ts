import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history/value-object/permanent-incapacity-benefit-terminated-work-periods-earnings-history-id.value-object';

import type { PermanentIncapacityBenefitTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/value-object/permanent-incapacity-benefit-terminated-work-periods-id.value-object';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history/permanent-incapacity-benefit-terminated-work-periods-earnings-history.entity.props.interface';

export class PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity extends BaseEntity<PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly permanentIncapacityBenefitTerminatedWorkPeriodsId: PermanentIncapacityBenefitTerminatedWorkPeriodsId;

  protected readonly _type =
    PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity.name;

  public constructor(
    props: PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntityPropsInterface,
  ) {
    super(
      PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryId,
      props,
    );
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.permanentIncapacityBenefitTerminatedWorkPeriodsId =
      props.permanentIncapacityBenefitTerminatedWorkPeriodsId;
  }
}
