import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { BpcDisabilityDenialCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-category.enum';
import type { BpcDisabilityDenialDenialReasonEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-denial-reason.enum';
import type { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import type { BpcDisabilityDenialDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/bpc-disability-denial-document.entity';
import type { BpcDisabilityDenialFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity';
import type { BpcDisabilityDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/bpc-disability-denial-inss-benefit.entity';
import type { BpcDisabilityDenialLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/bpc-disability-denial-legal-proceeding.entity';
import type { BpcDisabilityDenialResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity';
import type { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import type { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';

export interface BpcDisabilityDenialEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityDenialId> {
  analysisName?: string | null;
  requestEntryDate?: Date | null;
  denialDate?: Date | null;
  requestedBenefitType?: string | null;
  category?: BpcDisabilityDenialCategoryEnum | null;
  denialReason?: BpcDisabilityDenialDenialReasonEnum | null;
  denialReasonDescription?: string | null;
  disabilityType?: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum | null;
  disabilityDegree?: RetirementPlanningDisabilityDegreeEnum | null;
  estimatedDisabilityStartDate?: Date | null;
  attendsSchoolOrTechnicalCourse?: boolean | null;
  performsLaborActivity?: boolean | null;
  needsThirdPartyHelp?: boolean | null;
  hasAccessToBasicServices?: boolean | null;
  otherBarriersDescription?: string | null;
  livesAlone?: boolean | null;
  bpcDisabilityDenialResult?: BpcDisabilityDenialResultEntity | null;
  bpcDisabilityDenialFamilyMember?:
    | BpcDisabilityDenialFamilyMemberEntity[]
    | null;
  bpcDisabilityDenialDocument?: BpcDisabilityDenialDocumentEntity[] | null;
  bpcDisabilityDenialInssBenefit?:
    | BpcDisabilityDenialInssBenefitEntity[]
    | null;
  bpcDisabilityDenialLegalProceeding?:
    | BpcDisabilityDenialLegalProceedingEntity[]
    | null;
  analysisToolRecord?: AnalysisToolRecordEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
