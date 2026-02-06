import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { RuralTimelineAnalysisPeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/enum/rural-timeline-analysis-period-land-ownership-type.enum';
import type { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';

export interface RuralTimelineAnalysisPeriodPropertyEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisPeriodPropertyId> {
  propertyName: string;
  ownerName: string;
  postalCode: string;
  stateCode: StateCodeEnum;
  city: string;
  neighborhood: string;
  street: string;
  streetNumber: string;
  landOwnershipType: RuralTimelineAnalysisPeriodLandOwnershipTypeEnum;
}
