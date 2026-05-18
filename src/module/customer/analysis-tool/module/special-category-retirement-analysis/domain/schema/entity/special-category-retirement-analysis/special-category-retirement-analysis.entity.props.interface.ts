import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { RetirementAnalysisObjectiveTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/enum/retirement-analysis-objective-type.enum';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

export interface SpecialCategoryRetirementAnalysisEntityPropsInterface extends BaseEntityPropsInterface<SpecialCategoryRetirementAnalysisId> {
  analysisToolClientId: AnalysisToolClientId;
  analysisCustomName?: string | null;
  retirementAnalysisObjectiveType?: RetirementAnalysisObjectiveTypeEnum | null;
  publicServiceFederativeEntityName?: string | null;
  publicServiceStateAbbreviation?: string | null;
  hasConfirmedExposureToHarmfulAgents: boolean;
}
