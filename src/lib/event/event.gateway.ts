import type { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';

export abstract class EventGateway {
  public abstract emitUpdateLegalProceedingDataEvent(
    id: AnalysisToolClientLegalProceedingId,
  ): void;
}
