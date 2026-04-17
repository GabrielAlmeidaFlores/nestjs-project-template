import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/accident-benefit-rejection-inss-benefit.entity';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';

export abstract class AccidentBenefitRejectionInssBenefitCommandRepositoryGateway {
  public abstract createAccidentBenefitRejectionInssBenefit(
    props: AccidentBenefitRejectionInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllAccidentBenefitRejectionInssBenefitByAccidentBenefitRejectionId(
    id: AccidentBenefitRejectionId,
  ): TransactionType;
}
