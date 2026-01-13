import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { AnalysisTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/enum/analysis-type.enum';
import type { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';

export class GetRetirementPlanningRgpsAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRgpsAnalysisResultId;
  public readonly analysisType: AnalysisTypeEnum | null;
  public readonly response: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity;

  protected override readonly _type =
    GetRetirementPlanningRgpsAnalysisResultQueryResult.name;
}
