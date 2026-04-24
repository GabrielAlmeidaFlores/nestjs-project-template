import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentBenefitRejectionEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/accident-benefit-rejection.entity';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionResultId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/value-object/accident-benefit-rejection-result-id.value-object';

export abstract class AccidentBenefitRejectionCommandRepositoryGateway {
  public abstract createAccidentBenefitRejection(
    props: AccidentBenefitRejectionEntity,
  ): TransactionType;

  public abstract updateAccidentBenefitRejection(
    id: AccidentBenefitRejectionId,
    props: AccidentBenefitRejectionEntity,
  ): TransactionType;

  public abstract updateAccidentBenefitRejectionResultId(
    id: AccidentBenefitRejectionId,
    resultId: AccidentBenefitRejectionResultId,
  ): TransactionType;
}
