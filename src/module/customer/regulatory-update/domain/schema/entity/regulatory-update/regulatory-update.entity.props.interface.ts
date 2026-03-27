import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';

export interface RegulatoryUpdateEntityPropsInterface extends BaseEntityPropsInterface<RegulatoryUpdateId> {
  title: string;
  summary: string;
  mainChanges: string[];
  implementationStatus: string;
  beneficiaryImpact: string;
  fullText: string;
  sourceUrl?: string | null;
  publishedAt?: Date | null;
}
