import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/special-retirement-rejection-result.entity';

export abstract class SpecialRetirementRejectionResultCommandRepositoryGateway {
  public abstract createSpecialRetirementRejectionResult(
    props: SpecialRetirementRejectionResultEntity,
  ): TransactionType;

  public abstract updateSpecialRetirementRejectionResult(
    props: SpecialRetirementRejectionResultEntity,
  ): TransactionType;
}
