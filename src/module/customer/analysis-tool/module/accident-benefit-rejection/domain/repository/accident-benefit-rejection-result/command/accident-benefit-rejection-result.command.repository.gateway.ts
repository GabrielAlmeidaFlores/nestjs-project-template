import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/accident-benefit-rejection-result.entity';

export abstract class AccidentBenefitRejectionResultCommandRepositoryGateway {
  public abstract createAccidentBenefitRejectionResult(
    props: AccidentBenefitRejectionResultEntity,
  ): TransactionType;

  public abstract updateAccidentBenefitRejectionResult(
    props: AccidentBenefitRejectionResultEntity,
  ): TransactionType;
}
