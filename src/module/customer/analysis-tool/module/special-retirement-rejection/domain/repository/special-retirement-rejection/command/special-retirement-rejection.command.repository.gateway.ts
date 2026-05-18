import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/special-retirement-rejection.entity';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionResultId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/value-object/special-retirement-rejection-result-id.value-object';

export abstract class SpecialRetirementRejectionCommandRepositoryGateway {
  public abstract createSpecialRetirementRejection(
    props: SpecialRetirementRejectionEntity,
  ): TransactionType;

  public abstract updateSpecialRetirementRejection(
    id: SpecialRetirementRejectionId,
    props: SpecialRetirementRejectionEntity,
  ): TransactionType;

  public abstract updateSpecialRetirementRejectionResultId(
    id: SpecialRetirementRejectionId,
    resultId: SpecialRetirementRejectionResultId,
  ): TransactionType;
}
