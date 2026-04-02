import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';

import type { RegulatoryUpdateMonitoredSourceEntityPropsInterface } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/regulatory-update-monitored-source.entity.props.interface';

export class RegulatoryUpdateMonitoredSourceEntity extends BaseEntity<RegulatoryUpdateMonitoredSourceId> {
  public readonly name: string;
  public readonly url: string;
  public readonly active: boolean;

  protected readonly _type = RegulatoryUpdateMonitoredSourceEntity.name;

  public constructor(
    props: RegulatoryUpdateMonitoredSourceEntityPropsInterface,
  ) {
    super(RegulatoryUpdateMonitoredSourceId, props);
    this.name = props.name;
    this.url = props.url;
    this.active = props.active;
  }
}
