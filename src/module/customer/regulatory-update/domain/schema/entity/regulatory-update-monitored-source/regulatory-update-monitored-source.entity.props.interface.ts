import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';

export interface RegulatoryUpdateMonitoredSourceEntityPropsInterface extends BaseEntityPropsInterface<RegulatoryUpdateMonitoredSourceId> {
  name: string;
  url: string;
  active: boolean;
}
