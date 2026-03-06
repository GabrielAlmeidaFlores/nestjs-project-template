import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { RetirementAnalysisObjectiveTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/enum/retirement-analysis-objective-type.enum';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

export class GetSpecialCategoryRetirementAnalysisQueryResult {
  public readonly specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;
  public readonly analysisToolClientId: AnalysisToolClientId;
  public readonly analysisCustomName: string | null;
  public readonly retirementAnalysisObjectiveType: RetirementAnalysisObjectiveTypeEnum | null;
  public readonly publicServiceFederativeEntityName: string | null;
  public readonly publicServiceStateAbbreviation: string | null;
  public readonly hasConfirmedExposureToHarmfulAgents: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected readonly _type =
    GetSpecialCategoryRetirementAnalysisQueryResult.name;
}
