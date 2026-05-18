import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetBpcDisabilityDenialDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-document.query.result';
import type { GetBpcDisabilityDenialFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-family-member.query.result';
import type { GetBpcDisabilityDenialInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-inss-benefit/query/result/get-bpc-disability-denial-inss-benefit.query.result';
import type { GetBpcDisabilityDenialLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-legal-proceeding/query/result/get-bpc-disability-denial-legal-proceeding.query.result';
import type { GetBpcDisabilityDenialResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-result/query/result/get-bpc-disability-denial-result.query.result';
import type { BpcDisabilityDenialCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-category.enum';
import type { BpcDisabilityDenialDenialReasonEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-denial-reason.enum';
import type { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import type { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import type { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';

export class GetBpcDisabilityDenialWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityDenialId;
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly requestedBenefitType: string | null;
  public readonly category: BpcDisabilityDenialCategoryEnum | null;
  public readonly denialReason: BpcDisabilityDenialDenialReasonEnum | null;
  public readonly denialReasonDescription: string | null;
  public readonly disabilityType: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum | null;
  public readonly disabilityDegree: RetirementPlanningDisabilityDegreeEnum | null;
  public readonly estimatedDisabilityStartDate: Date | null;
  public readonly attendsSchoolOrTechnicalCourse: boolean | null;
  public readonly performsLaborActivity: boolean | null;
  public readonly needsThirdPartyHelp: boolean | null;
  public readonly hasAccessToBasicServices: boolean | null;
  public readonly otherBarriersDescription: string | null;
  public readonly livesAlone: boolean | null;
  public readonly bpcDisabilityDenialResult: GetBpcDisabilityDenialResultQueryResult | null;
  public readonly bpcDisabilityDenialFamilyMember: GetBpcDisabilityDenialFamilyMemberQueryResult[];
  public readonly bpcDisabilityDenialDocument: GetBpcDisabilityDenialDocumentQueryResult[];
  public readonly bpcDisabilityDenialInssBenefit: GetBpcDisabilityDenialInssBenefitQueryResult[];
  public readonly bpcDisabilityDenialLegalProceeding: GetBpcDisabilityDenialLegalProceedingQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityDenialWithRelationsQueryResult.name;
}
