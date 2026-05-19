import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PermanentIncapacityBenefitTerminatedResultEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/permanent-incapacity-benefit-terminated-result.entity';

export abstract class PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway {
  public abstract createPermanentIncapacityBenefitTerminatedResult(
    props: PermanentIncapacityBenefitTerminatedResultEntity,
  ): TransactionType;

  public abstract updatePermanentIncapacityBenefitTerminatedResult(
    props: PermanentIncapacityBenefitTerminatedResultEntity,
  ): TransactionType;
}
