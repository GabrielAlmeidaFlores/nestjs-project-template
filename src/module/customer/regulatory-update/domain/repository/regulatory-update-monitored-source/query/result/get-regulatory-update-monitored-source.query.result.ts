import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';

export class GetRegulatoryUpdateMonitoredSourceQueryResult extends BaseBuildableObject {
  public readonly id: RegulatoryUpdateMonitoredSourceId;
  public readonly name: string;
  public readonly url: string;
  public readonly active: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetRegulatoryUpdateMonitoredSourceQueryResult.name;
}
