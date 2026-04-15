import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementDenialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/general-urban-retirement-denial-period.entity';
import type { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';

export abstract class GeneralUrbanRetirementDenialPeriodCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementDenialPeriod(
    props: GeneralUrbanRetirementDenialPeriodEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementDenialPeriod(
    id: GeneralUrbanRetirementDenialPeriodId,
  ): TransactionType;
}
