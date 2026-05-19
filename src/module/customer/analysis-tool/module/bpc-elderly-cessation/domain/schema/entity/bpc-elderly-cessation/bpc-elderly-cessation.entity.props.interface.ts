import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { BpcElderlyCessationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-category.enum';
import type { BpcElderlyCessationCessationReasonEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-cessation-reason.enum';
import type { BpcElderlyCessationCivilStatusEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-civil-status.enum';
import type { BpcElderlyCessationEducationLevelEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-education-level.enum';
import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import type { BpcElderlyCessationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/bpc-elderly-cessation-document.entity';
import type { BpcElderlyCessationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity';
import type { BpcElderlyCessationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/bpc-elderly-cessation-inss-benefit.entity';
import type { BpcElderlyCessationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/bpc-elderly-cessation-legal-proceeding.entity';
import type { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';

export interface BpcElderlyCessationEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyCessationId> {
  analysisName?: string | null;
  decisionDate?: Date | null;
  previousInssBenefitNumber?: string | null;
  category?: BpcElderlyCessationCategoryEnum | null;
  cessationReason?: BpcElderlyCessationCessationReasonEnum | null;
  cessationReasonDescription?: string | null;
  isAppealDeadlineExpired?: boolean | null;
  myInssPassword?: string | null;
  civilStatus?: BpcElderlyCessationCivilStatusEnum | null;
  educationLevel?: BpcElderlyCessationEducationLevelEnum | null;
  currentAddress?: string | null;
  previousAddress?: string | null;
  hasAddressChangedSinceDecision?: boolean | null;
  livesAlone?: boolean | null;
  bpcElderlyCessationResult?: BpcElderlyCessationResultEntity | null;
  bpcElderlyCessationFamilyMember?:
    | BpcElderlyCessationFamilyMemberEntity[]
    | null;
  bpcElderlyCessationDocument?: BpcElderlyCessationDocumentEntity[] | null;
  bpcElderlyCessationInssBenefit?:
    | BpcElderlyCessationInssBenefitEntity[]
    | null;
  bpcElderlyCessationLegalProceeding?:
    | BpcElderlyCessationLegalProceedingEntity[]
    | null;
  analysisToolRecord?: AnalysisToolRecordEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
