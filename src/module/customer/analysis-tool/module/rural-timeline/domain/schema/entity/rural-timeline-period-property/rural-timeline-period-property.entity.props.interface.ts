import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { RuralTimelinePeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/enum/rural-timeline-period-land-ownership-type.enum';
import type { RuralTimelinePeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/value-object/rural-timeline-period-property-id/rural-timeline-period-property-id.value-object';

export interface RuralTimelinePeriodPropertyEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelinePeriodPropertyId> {
  propertyName: string;
  ownerName: string;
  postalCode: string;
  stateCode: StateCodeEnum;
  city: string;
  neighborhood: string;
  street: string;
  streetNumber: string;
  landOwnershipType: RuralTimelinePeriodLandOwnershipTypeEnum;
}
