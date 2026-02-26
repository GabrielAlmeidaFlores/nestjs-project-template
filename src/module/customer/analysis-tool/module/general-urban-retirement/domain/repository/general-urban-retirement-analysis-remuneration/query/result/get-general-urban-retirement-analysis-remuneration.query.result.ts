import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { GeneralUrbanRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/value-object/general-urban-retirement-analysis-remuneration-id.value-object';

export class GetGeneralUrbanRetirementAnalysisRemunerationQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementAnalysisRemunerationId;
  public readonly remunerationDate: Date;
  public readonly remunerationAmount: DecimalValue;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisRemunerationQueryResult.name;
}
