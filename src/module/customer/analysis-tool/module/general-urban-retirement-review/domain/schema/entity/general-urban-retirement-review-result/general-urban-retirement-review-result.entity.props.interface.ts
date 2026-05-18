import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { GeneralUrbanRetirementReviewResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/value-object/general-urban-retirement-review-result-id.value-object';

export interface GeneralUrbanRetirementReviewResultEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewResultId> {
  clientName?: string | null;
  clientFederalDocument?: FederalDocument | null;
  clientBirthDate?: Date | null;
  clientLastAffiliationDate?: Date | null;
  compareCnisCtps?: string | null;
  compareCnisCtpsRaw?: string | null;
  benefitAwardLetterAnalysis?: string | null;
  benefitAwardLetterAnalysisRaw?: string | null;
  firstAnalysis?: string | null;
  generalUrbanRetirementReviewCompleteAnalysis?: string | null;
  generalUrbanRetirementReviewSimplifiedAnalysis?: string | null;
  generalUrbanRetirementReviewCompleteAnalysisDownload?: string | null;
}
