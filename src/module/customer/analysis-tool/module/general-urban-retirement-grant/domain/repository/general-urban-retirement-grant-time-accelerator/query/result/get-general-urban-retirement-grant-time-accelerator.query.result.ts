import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';

export class GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementGrantTimeAcceleratorId;
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
    GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult.name;
}
