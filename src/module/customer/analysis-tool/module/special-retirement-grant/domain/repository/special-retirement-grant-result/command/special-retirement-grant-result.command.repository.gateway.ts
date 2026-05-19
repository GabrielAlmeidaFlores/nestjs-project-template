import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity';
import type { SpecialRetirementGrantResultId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/value-object/special-retirement-grant-result-id/special-retirement-grant-result-id.value-object';

export abstract class SpecialRetirementGrantResultCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantResult(
    props: SpecialRetirementGrantResultEntity,
  ): TransactionType;

  public abstract updateSpecialRetirementGrantResult(
    id: SpecialRetirementGrantResultId,
    props: SpecialRetirementGrantResultEntity,
  ): TransactionType;
}
