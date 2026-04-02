import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RegulatoryUpdateMonitoredSourceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/regulatory-update-monitored-source.entity';
import type { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';

export abstract class RegulatoryUpdateMonitoredSourceCommandRepositoryGateway {
  public abstract createMonitoredSource(
    props: RegulatoryUpdateMonitoredSourceEntity,
  ): TransactionType;

  public abstract updateMonitoredSource(
    id: RegulatoryUpdateMonitoredSourceId,
    props: RegulatoryUpdateMonitoredSourceEntity,
  ): TransactionType;

  public abstract deleteMonitoredSource(
    id: RegulatoryUpdateMonitoredSourceId,
  ): TransactionType;
}
