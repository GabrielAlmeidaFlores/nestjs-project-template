import { SpanKind } from '@opentelemetry/api';

import type { Context } from '@opentelemetry/api';
import type {
  ReadableSpan,
  SpanProcessor,
  Span,
} from '@opentelemetry/sdk-trace-base';

export class SpanNameEnricherProcessor implements SpanProcessor {
  protected readonly _type = SpanNameEnricherProcessor.name;

  public constructor(private readonly delegate: SpanProcessor) {}

  public onStart(span: Span, parentContext: Context): void {
    this.delegate.onStart(span, parentContext);
  }

  public onEnding(span: Span): void {
    const enrichedName = this.buildEnrichedName(span);

    if (enrichedName !== null) {
      span.updateName(enrichedName);
    }
  }

  public onEnd(span: ReadableSpan): void {
    this.delegate.onEnd(span);
  }

  public forceFlush(): Promise<void> {
    return this.delegate.forceFlush();
  }

  public shutdown(): Promise<void> {
    return this.delegate.shutdown();
  }

  private buildEnrichedName(span: Span): string | null {
    const attrs = span.attributes;
    const dbSystem = attrs['db.system'];
    const spanName = span.name;

    if (dbSystem === 'redis') {
      return this.buildRedisSpanName(spanName, attrs);
    }

    if (typeof dbSystem === 'string' && span.kind === SpanKind.CLIENT) {
      return this.buildDbSpanName(spanName, attrs);
    }

    return null;
  }

  private buildRedisSpanName(
    spanName: string,
    attrs: Record<string, unknown>,
  ): string {
    const statement = attrs['db.statement'];

    if (typeof statement !== 'string') {
      return `Redis.${spanName}`;
    }

    const parts = statement.split(' ');
    const key = parts[1];

    if (key === undefined || key.length === 0) {
      return `Redis.${spanName}`;
    }

    return `Redis.${spanName} ${key}`;
  }

  private buildDbSpanName(
    spanName: string,
    attrs: Record<string, unknown>,
  ): string | null {
    const statement = attrs['db.statement'];

    if (typeof statement !== 'string') {
      return null;
    }

    const table = this.extractTableFromSql(spanName, statement);

    if (table === null) {
      return null;
    }

    return `${spanName} ${table}`;
  }

  private extractTableFromSql(operation: string, sql: string): string | null {
    const opUpper = operation.toUpperCase();

    const patterns: RegExp[] = [];

    if (opUpper === 'SELECT') {
      patterns.push(/FROM\s+"?(\w+)"?/i);
    } else if (opUpper === 'INSERT') {
      patterns.push(/INTO\s+"?(\w+)"?/i);
    } else if (opUpper === 'UPDATE') {
      patterns.push(/UPDATE\s+"?(\w+)"?/i);
    } else if (opUpper === 'DELETE') {
      patterns.push(/FROM\s+"?(\w+)"?/i);
    } else {
      patterns.push(
        /FROM\s+"?(\w+)"?/i,
        /INTO\s+"?(\w+)"?/i,
        /UPDATE\s+"?(\w+)"?/i,
      );
    }

    for (const pattern of patterns) {
      const match = pattern.exec(sql);

      if (match?.[1] !== undefined) {
        return match[1];
      }
    }

    return null;
  }
}
