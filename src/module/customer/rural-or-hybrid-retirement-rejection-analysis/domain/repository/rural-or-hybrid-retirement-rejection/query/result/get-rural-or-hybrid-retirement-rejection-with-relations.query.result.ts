import { BaseBuildableObject } from '@shared/api/util/object/base-buildable.object';

import type { RuralOrHybridRetirementRejectionId } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id/rural-or-hybrid-retirement-rejection-id.value-object';

export class GetRuralOrHybridRetirementRejectionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: RuralOrHybridRetirementRejectionId;
  public readonly federativeEntity: string;
  public readonly state: string | null;
  public readonly municipality: string | null;
  public readonly analysisName: string;
  public readonly currentPosition: string | null;
  public readonly activityType: string | null;
  public readonly publicServiceStartDate: Date | null;
  public readonly careerStartDate: Date | null;
  public readonly inssBenefitIds: string[];
  public readonly legalProceedingIds: string[];
  public readonly periodIds: string[];
  public readonly periodMemberIds: string[];
  public readonly testimonialWitnessIds: string[];
  public readonly workPeriodIds: string[];
  public readonly timeAcceleratorIds: string[];
  public readonly resultId: string | null;
  public readonly createdAt: Date | null;
  public readonly updatedAt: Date | null;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionWithRelationsQueryResult.name;
}
