import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-legal-proceeding/value-object/retirement-planning-rpps-legal-proceeding-id.value-object';

export class GetRetirementPlanningRppsLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsLegalProceedingId;
  public readonly legalProceeding: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRppsLegalProceedingQueryResult.name;
}
