import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RegulatoryUpdateEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/regulatory-update.entity';

export abstract class RegulatoryUpdateCommandRepositoryGateway {
  public abstract createRegulatoryUpdate(
    props: RegulatoryUpdateEntity,
  ): TransactionType;
}
