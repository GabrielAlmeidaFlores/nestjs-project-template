import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import type { RetirementPlanningRgpsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/value-object/retirement-planning-rgps-period-document-id.value-object';

export class GetRetirementPlanningRgpsPeriodDocumentQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRgpsPeriodDocumentId;
  public readonly document: string;
  public readonly retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId | null;

  protected override readonly _type =
    GetRetirementPlanningRgpsPeriodDocumentQueryResult.name;
}
