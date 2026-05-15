import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { BpcDisabilityGrantCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/enum/bpc-disability-grant-category.enum';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { BpcDisabilityGrantDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/bpc-disability-grant-document.entity';
import type { BpcDisabilityGrantFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/bpc-disability-grant-family-member.entity';
import type { BpcDisabilityGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/bpc-disability-grant-inss-benefit.entity';
import type { BpcDisabilityGrantLegalRepresentativeOfAMinorEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/bpc-disability-grant-legal-representative-of-a-minor.entity';
import type { BpcDisabilityGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/bpc-disability-grant-legal-proceeding.entity';
import type { BpcDisabilityGrantResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/bpc-disability-grant-result.entity';
import type { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import type { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';

export interface BpcDisabilityGrantEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityGrantId> {
  analysisName?: string | null;
  requestEntryDate?: Date | null;
  denialDate?: Date | null;
  requestedBenefitType?: string | null;
  category?: BpcDisabilityGrantCategoryEnum | null;
  disabilityType?: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum | null;
  disabilityDegree?: RetirementPlanningDisabilityDegreeEnum | null;
  estimatedDisabilityStartDate?: Date | null;
  attendsSchoolOrTechnicalCourse?: boolean | null;
  performsLaborActivity?: boolean | null;
  needsThirdPartyHelp?: boolean | null;
  hasAccessToBasicServices?: boolean | null;
  otherBarriersDescription?: string | null;
  BpcDisabilityGrantResult?: BpcDisabilityGrantResultEntity | null;
  BpcDisabilityGrantFamilyMember?:
    | BpcDisabilityGrantFamilyMemberEntity[]
    | null;
  BpcDisabilityGrantDocument?: BpcDisabilityGrantDocumentEntity[] | null;
  BpcDisabilityGrantInssBenefit?: BpcDisabilityGrantInssBenefitEntity[] | null;
  BpcDisabilityGrantLegalRepresentativeOfAMinor?:
    | BpcDisabilityGrantLegalRepresentativeOfAMinorEntity
    | null;
  BpcDisabilityGrantLegalProceeding?:
    | BpcDisabilityGrantLegalProceedingEntity[]
    | null;
  analysisToolRecordId?: AnalysisToolRecordId | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
