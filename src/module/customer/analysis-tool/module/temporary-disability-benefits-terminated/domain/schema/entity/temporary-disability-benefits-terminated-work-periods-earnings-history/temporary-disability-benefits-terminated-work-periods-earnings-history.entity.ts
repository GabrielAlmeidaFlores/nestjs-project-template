import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/value-object/temporary-disability-benefits-terminated-work-periods-earnings-history-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/temporary-disability-benefits-terminated-work-periods-earnings-history.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly temporaryDisabilityBenefitsTerminatedWorkPeriodsId: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntityPropsInterface,
  ) {
    super(
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId,
      props,
    );
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.temporaryDisabilityBenefitsTerminatedWorkPeriodsId =
      props.temporaryDisabilityBenefitsTerminatedWorkPeriodsId;
  }
}
