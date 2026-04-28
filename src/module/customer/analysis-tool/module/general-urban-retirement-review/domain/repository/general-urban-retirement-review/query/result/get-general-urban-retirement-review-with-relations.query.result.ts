import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import type { GeneralUrbanRetirementReviewInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/general-urban-retirement-review-inss-benefit.entity';
import type { GeneralUrbanRetirementReviewLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/general-urban-retirement-review-legal-proceeding.entity';
import type { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import type { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';

export class GetGeneralUrbanRetirementReviewWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementReviewId;
  public readonly cnisDocument: string | null;
  public readonly benefitAwardLetterDocument: string | null;
  public readonly analysisName: string | null;
  public readonly category: string | null;
  public readonly myInssPassword: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly generalUrbanRetirementReviewBenefit:
    | GeneralUrbanRetirementReviewInssBenefitEntity[]
    | null;
  public readonly generalUrbanRetirementReviewResult: GeneralUrbanRetirementReviewResultEntity | null;
  public readonly generalUrbanRetirementReviewLegalProceeding:
    | GeneralUrbanRetirementReviewLegalProceedingEntity[]
    | null;
  public readonly generalUrbanRetirementReviewPeriod:
    | GeneralUrbanRetirementReviewPeriodEntity[]
    | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewWithRelationsQueryResult.name;
}
