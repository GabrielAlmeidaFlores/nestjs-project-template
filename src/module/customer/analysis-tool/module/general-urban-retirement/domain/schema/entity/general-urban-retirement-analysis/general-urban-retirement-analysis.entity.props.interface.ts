import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { GeneralUrbanRetirementAnalysisBenefitTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-benefit-type.enum';
import type { GeneralUrbanRetirementAnalysisFederativeEntityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-federative-entity.enum';
import type { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import type { GeneralUrbanRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity';

export interface GeneralUrbanRetirementAnalysisEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementAnalysisId> {
  careerStartDate: Date;
  publicServiceStartDate: Date;
  generalUrbanRetirementBenefitAnalysis?: string | null;
  generalUrbanRetirementAnalysisResult?: GeneralUrbanRetirementAnalysisResultEntity | null;
  federativeEntity?: GeneralUrbanRetirementAnalysisFederativeEntityEnum | null;
  state?: StateCodeEnum | null;
  municipality?: string | null;
  name?: string | null;
  benefitType?: GeneralUrbanRetirementAnalysisBenefitTypeEnum | null;
}
