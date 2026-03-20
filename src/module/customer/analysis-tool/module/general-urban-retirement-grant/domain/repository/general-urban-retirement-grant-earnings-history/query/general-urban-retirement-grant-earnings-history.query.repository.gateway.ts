import type { GeneralUrbanRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/general-urban-retirement-grant-earnings-history.entity';
import type { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';

export abstract class GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway {
  public abstract findByGeneralUrbanRetirementGrantPeriodId(
    periodId: GeneralUrbanRetirementGrantPeriodId,
  ): Promise<GeneralUrbanRetirementGrantEarningsHistoryEntity[]>;

  public abstract findByGeneralUrbanRetirementGrantPeriodIdBelowMinimum(
    periodId: GeneralUrbanRetirementGrantPeriodId,
  ): Promise<GeneralUrbanRetirementGrantEarningsHistoryEntity[]>;
}
