import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import type { GeneralUrbanRetirementAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/value-object/general-urban-retirement-analysis-legal-proceeding-id.value-object';

export interface GeneralUrbanRetirementAnalysisLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementAnalysisLegalProceedingId> {
  legalProceeding: string;
  generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisEntity;
}
