import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import type { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';

export abstract class SpecialActivityAnalysisCommandRepositoryGateway {
  public abstract createSpecialActivity(
    props: SpecialActivityEntity,
  ): TransactionType;

  public abstract updateSpecialActivity(
    id: SpecialActivityId,
    props: SpecialActivityEntity,
  ): TransactionType;

  public abstract deleteSpecialActivity(id: SpecialActivityId): TransactionType;
}
