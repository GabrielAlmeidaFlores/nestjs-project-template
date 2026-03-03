import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialActivityResultEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-result/special-activity-result.entity';
import type { SpecialActivityResultId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-result/value-object/special-activity-result-id.value-object';

export abstract class SpecialActivityAnalysisResultCommandRepositoryGateway {
  public abstract createSpecialActivityResult(
    props: SpecialActivityResultEntity,
  ): TransactionType;

  public abstract updateSpecialActivityResult(
    id: SpecialActivityResultId,
    props: SpecialActivityResultEntity,
  ): TransactionType;
}
