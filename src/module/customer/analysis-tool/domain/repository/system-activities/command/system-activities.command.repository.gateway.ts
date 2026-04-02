import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SystemActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/system-activity/system-activity.entity';

export abstract class SystemActivitiesCommandRepositoryGateway {
  public abstract createSystemActivity(
    entity: SystemActivityEntity,
  ): TransactionType;
}
