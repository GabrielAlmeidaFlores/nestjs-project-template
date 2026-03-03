import { trace, SpanStatusCode } from '@opentelemetry/api';
import { SignozApplicationVariable } from '@shared/system/constant/application-variable/source/signoz.application-variable';

import type { Span, Attributes } from '@opentelemetry/api';

const tracer = trace.getTracer(SignozApplicationVariable.SIGNOZ_SERVICE_NAME);

export async function withSpan<T>(
  spanName: string,
  fn: (span: Span) => Promise<T>,
  attributes?: Attributes,
): Promise<T> {
  return tracer.startActiveSpan(spanName, async (span: Span) => {
    if (attributes !== undefined) {
      span.setAttributes(attributes);
    }

    try {
      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      span.setStatus({ code: SpanStatusCode.ERROR, message });
      span.recordException(error instanceof Error ? error : new Error(message));
      throw error;
    } finally {
      span.end();
    }
  });
}
