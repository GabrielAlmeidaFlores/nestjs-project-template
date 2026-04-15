import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import type { BpcElderlyAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/bpc-elderly-analysis-document.entity';
import type { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';
import type { BpcElderlyAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/bpc-elderly-analysis-inss-benefit.entity';
import type { BpcElderlyAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/bpc-elderly-analysis-legal-proceeding.entity';
import type { BpcElderlyAnalysisResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/bpc-elderly-analysis-result.entity';

export interface BpcElderlyAnalysisEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyAnalysisId> {
  name?: string | null;
  bpcElderlyAnalysisResult?: BpcElderlyAnalysisResultEntity | null;
  bpcElderlyAnalysisFamilyMember?:
    | BpcElderlyAnalysisFamilyMemberEntity[]
    | null;
  bpcElderlyAnalysisDocument?: BpcElderlyAnalysisDocumentEntity[] | null;
  bpcElderlyAnalysisInssBenefit?: BpcElderlyAnalysisInssBenefitEntity[] | null;
  bpcElderlyAnalysisLegalProceeding?:
    | BpcElderlyAnalysisLegalProceedingEntity[]
    | null;
  analysisToolRecord?: AnalysisToolRecordEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
