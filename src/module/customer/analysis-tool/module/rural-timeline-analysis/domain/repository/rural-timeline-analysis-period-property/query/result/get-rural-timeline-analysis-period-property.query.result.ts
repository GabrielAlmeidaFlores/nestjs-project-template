import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { RuralTimelineAnalysisPeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/enum/rural-timeline-analysis-period-land-ownership-type.enum';
import type { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';

export class GetRuralTimelineAnalysisPeriodPropertyQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisPeriodPropertyId;
  public readonly propertyName: string | null;
  public readonly ownerName: string | null;
  public readonly postalCode: PostalCode | null;
  public readonly stateCode: StateCodeEnum | null;
  public readonly city: string | null;
  public readonly neighborhood: string | null;
  public readonly street: string | null;
  public readonly streetNumber: string | null;
  public readonly landOwnershipType: RuralTimelineAnalysisPeriodLandOwnershipTypeEnum | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodPropertyQueryResult.name;
}
