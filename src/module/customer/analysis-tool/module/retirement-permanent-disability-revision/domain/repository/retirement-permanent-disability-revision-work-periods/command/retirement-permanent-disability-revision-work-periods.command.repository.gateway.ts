import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/retirement-permanent-disability-revision-work-periods.entity';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';

export abstract class RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionWorkPeriods(
    props: RetirementPermanentDisabilityRevisionWorkPeriodsEntity,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRevisionWorkPeriods(
    id: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    props: RetirementPermanentDisabilityRevisionWorkPeriodsEntity,
  ): TransactionType;

  public abstract deleteAllByRetirementPermanentDisabilityRevisionId(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): TransactionType;
}
