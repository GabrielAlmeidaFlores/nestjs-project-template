import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { RetirementAnalysisObjectiveTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/enum/retirement-analysis-objective-type.enum';
import type { SpecialCategoryRetirementAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/special-category-retirement-analysis.entity.props.interface';

export class SpecialCategoryRetirementAnalysisEntity extends BaseEntity<SpecialCategoryRetirementAnalysisId> {
  public readonly analysisToolClientId: AnalysisToolClientId;
  public readonly analysisCustomName: string | null;
  public readonly retirementAnalysisObjectiveType: RetirementAnalysisObjectiveTypeEnum | null;
  public readonly publicServiceFederativeEntityName: string | null;
  public readonly publicServiceStateAbbreviation: string | null;
  public readonly hasConfirmedExposureToHarmfulAgents: boolean;
  public readonly currentWorkflowStepIndex: number;

  protected readonly _type = SpecialCategoryRetirementAnalysisEntity.name;

  public constructor(
    props: SpecialCategoryRetirementAnalysisEntityPropsInterface,
  ) {
    super(SpecialCategoryRetirementAnalysisId, props);
    this.analysisToolClientId = props.analysisToolClientId;
    this.analysisCustomName = props.analysisCustomName ?? null;
    this.retirementAnalysisObjectiveType =
      props.retirementAnalysisObjectiveType ?? null;
    this.publicServiceFederativeEntityName =
      props.publicServiceFederativeEntityName ?? null;
    this.publicServiceStateAbbreviation =
      props.publicServiceStateAbbreviation ?? null;
    this.hasConfirmedExposureToHarmfulAgents =
      props.hasConfirmedExposureToHarmfulAgents;
    this.currentWorkflowStepIndex = props.currentWorkflowStepIndex;
  }
}
