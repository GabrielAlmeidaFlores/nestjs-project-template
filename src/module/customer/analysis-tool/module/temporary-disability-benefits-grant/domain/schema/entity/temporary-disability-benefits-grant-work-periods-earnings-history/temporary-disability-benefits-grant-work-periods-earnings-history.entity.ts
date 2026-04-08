import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/value-object/temporary-disability-benefits-grant-work-periods-earnings-history-id.value-object';

import type { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/temporary-disability-benefits-grant-work-periods-earnings-history.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly temporaryDisabilityBenefitsGrantWorkPeriodsId: TemporaryDisabilityBenefitsGrantWorkPeriodsId;

  protected readonly _type =
    TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.temporaryDisabilityBenefitsGrantWorkPeriodsId =
      props.temporaryDisabilityBenefitsGrantWorkPeriodsId;
  }
}
