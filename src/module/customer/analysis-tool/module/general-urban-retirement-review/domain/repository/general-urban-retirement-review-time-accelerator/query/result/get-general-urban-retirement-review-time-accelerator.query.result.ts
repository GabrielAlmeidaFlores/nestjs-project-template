import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';

export class GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementReviewTimeAcceleratorId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly timeType: string;
  public readonly name: string | null;
  public readonly institution: string | null;
  public readonly periodStart: Date | null;
  public readonly periodEnd: Date | null;
  public readonly affectsQualifyingPeriod: boolean | null;
  public readonly timeGained: string | null;
  public readonly viability: string | null;
  public readonly technicalNote: string | null;
  public readonly recognitionInss: string;
  public readonly recognitionJudicial: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult.name;
}
