import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { CnisFastAnalysisResultId } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';

export interface CnisFastAnalysisResultEntityPropsInterface
  extends BaseEntityPropsInterface<CnisFastAnalysisResultId> {
  clientName?: string | null;
  clientFederalDocument?: FederalDocument | null;
  clientBirthDate?: Date | null;
  clientLastAffiliationDate?: Date | null;
  cnisAiAnalysis?: string | null;
}
