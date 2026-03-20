import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import type { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';

export abstract class GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementGrantPeriod(
    props: GeneralUrbanRetirementGrantPeriodEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementGrantPeriod(
    id: GeneralUrbanRetirementGrantPeriodId,
    props: GeneralUrbanRetirementGrantPeriodEntity,
  ): TransactionType;
}
