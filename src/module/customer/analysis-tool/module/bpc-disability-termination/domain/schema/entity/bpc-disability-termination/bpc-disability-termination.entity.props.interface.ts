import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { BpcDisabilityTerminationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-category.enum';
import type { BpcDisabilityTerminationDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-degree.enum';
import type { BpcDisabilityTerminationDisabilityTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-type.enum';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import type { BpcDisabilityTerminationDisabilityAssessmentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity';
import type { BpcDisabilityTerminationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/bpc-disability-termination-document.entity';
import type { BpcDisabilityTerminationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity';
import type { BpcDisabilityTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/bpc-disability-termination-inss-benefit.entity';
import type { BpcDisabilityTerminationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/bpc-disability-termination-legal-proceeding.entity';
import type { BpcDisabilityTerminationResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/bpc-disability-termination-result.entity';

export interface BpcDisabilityTerminationEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityTerminationId> {
  analysisName?: string | null;
  category?: BpcDisabilityTerminationCategoryEnum | null;
  disabilityType?: BpcDisabilityTerminationDisabilityTypeEnum | null;
  disabilityDegree?: BpcDisabilityTerminationDisabilityDegreeEnum | null;
  benefitCessationReason?: string | null;
  livesAlone?: boolean | null;
  bpcDisabilityTerminationResult?: BpcDisabilityTerminationResultEntity | null;
  bpcDisabilityTerminationDisabilityAssessment?: BpcDisabilityTerminationDisabilityAssessmentEntity | null;
  bpcDisabilityTerminationFamilyMember?:
    | BpcDisabilityTerminationFamilyMemberEntity[]
    | null;
  bpcDisabilityTerminationDocument?:
    | BpcDisabilityTerminationDocumentEntity[]
    | null;
  bpcDisabilityTerminationInssBenefit?:
    | BpcDisabilityTerminationInssBenefitEntity[]
    | null;
  bpcDisabilityTerminationLegalProceeding?:
    | BpcDisabilityTerminationLegalProceedingEntity[]
    | null;
  analysisToolRecord?: AnalysisToolRecordEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
