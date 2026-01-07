import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';

export interface AnalysisToolClientLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<AnalysisToolClientLegalProceedingId> {
  legalProceedingNumber: string;
  analysisToolClient: AnalysisToolClientEntity;
  type?: string | null;
  status?: string | null;
  lastUpdated?: Date | null;
  deadline?: Date | null;
}
