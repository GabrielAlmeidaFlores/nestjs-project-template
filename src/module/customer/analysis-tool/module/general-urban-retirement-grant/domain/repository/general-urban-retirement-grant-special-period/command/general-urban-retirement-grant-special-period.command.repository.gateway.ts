import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementGrantSpecialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/general-urban-retirement-grant-special-period.entity';
import type { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';

export abstract class GeneralUrbanRetirementGrantSpecialPeriodCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementGrantSpecialPeriod(
    props: GeneralUrbanRetirementGrantSpecialPeriodEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementGrantSpecialPeriod(
    id: GeneralUrbanRetirementGrantSpecialPeriodId,
    props: GeneralUrbanRetirementGrantSpecialPeriodEntity,
  ): TransactionType;
}
