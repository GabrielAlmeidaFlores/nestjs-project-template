import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { GeneralUrbanRetirementAnalysisBenefitTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-benefit-type.enum';
import type { GeneralUrbanRetirementAnalysisFederativeEntityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-federative-entity.enum';
import type { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';

export class GetGeneralUrbanRetirementAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementAnalysisId;
  public readonly careerStartDate: Date | null;
  public readonly publicServiceStartDate: Date | null;
  public readonly generalUrbanRetirementBenefitAnalysis: string | null;
  public readonly federativeEntity: GeneralUrbanRetirementAnalysisFederativeEntityEnum | null;
  public readonly state: StateCodeEnum | null;
  public readonly municipality: string | null;
  public readonly name: string | null;
  public readonly benefitType: GeneralUrbanRetirementAnalysisBenefitTypeEnum | null;
  public readonly currentPosition: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisQueryResult.name;
}
