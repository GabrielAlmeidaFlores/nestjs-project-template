import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import type { JudicialCaseAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/judicial-case-analysis-benefit.entity';
import type { JudicialCaseAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/judicial-case-analysis-document.entity';
import type { JudicialCaseAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding.entity';
import type { JudicialCaseAnalysisResultEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity';

export interface JudicialCaseAnalysisEntityPropsInterface
  extends BaseEntityPropsInterface<JudicialCaseAnalysisId> {
  judicialCaseAnalysisResult?: JudicialCaseAnalysisResultEntity | null;
  judicialCaseAnalysisBenefit?: JudicialCaseAnalysisBenefitEntity[];
  judicialCaseAnalysisLegalProceeding?: JudicialCaseAnalysisLegalProceedingEntity[];
  judicialCaseAnalysisDocument?: JudicialCaseAnalysisDocumentEntity[];
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}

