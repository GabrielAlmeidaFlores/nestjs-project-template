import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/accident-benefit-rejection-work-period.entity';

export abstract class AccidentBenefitRejectionWorkPeriodCommandRepositoryGateway {
  public abstract createAccidentBenefitRejectionWorkPeriod(
    props: AccidentBenefitRejectionWorkPeriodEntity,
  ): TransactionType;

  public abstract deleteAllAccidentBenefitRejectionWorkPeriodByAccidentBenefitRejectionId(
    id: AccidentBenefitRejectionId,
  ): TransactionType;
}
