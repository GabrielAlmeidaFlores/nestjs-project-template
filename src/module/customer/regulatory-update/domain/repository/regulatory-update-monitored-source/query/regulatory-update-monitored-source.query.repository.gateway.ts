import type { GetRegulatoryUpdateMonitoredSourceQueryResult } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/result/get-regulatory-update-monitored-source.query.result';
import type { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';

export abstract class RegulatoryUpdateMonitoredSourceQueryRepositoryGateway {
  public abstract findOneMonitoredSourceById(
    id: RegulatoryUpdateMonitoredSourceId,
  ): Promise<GetRegulatoryUpdateMonitoredSourceQueryResult | null>;

  public abstract listAllMonitoredSources(): Promise<
    GetRegulatoryUpdateMonitoredSourceQueryResult[]
  >;

  public abstract listActiveMonitoredSources(): Promise<
    GetRegulatoryUpdateMonitoredSourceQueryResult[]
  >;
}
