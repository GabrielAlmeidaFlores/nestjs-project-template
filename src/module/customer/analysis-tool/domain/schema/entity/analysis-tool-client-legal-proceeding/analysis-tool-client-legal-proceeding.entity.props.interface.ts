import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { LegalProceedingStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/enum/legal-proceeding-status.enum';
import type { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';

export interface AnalysisToolClientLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<AnalysisToolClientLegalProceedingId> {
  legalProceedingNumber: string;
  type?: string | null;
  status?: LegalProceedingStatusEnum | null;
  lastUpdated?: Date | null;
  deadline?: Date | null;
  analysisToolClient: AnalysisToolClientEntity;
}
