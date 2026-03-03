import type { ObservabilityErrorLogInputModel } from '@shared/system/observability/model/input/observability-error-log.input.model';
import type { ObservabilityLogInputModel } from '@shared/system/observability/model/input/observability-log.input.model';

export abstract class ObservabilityGateway {
  public abstract emitInfo(params: ObservabilityLogInputModel): void;

  public abstract emitError(params: ObservabilityErrorLogInputModel): void;
}
