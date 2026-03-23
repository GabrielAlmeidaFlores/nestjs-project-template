import type { SystemLogListFiltersType } from '@module/admin/system-logs/domain/repository/system-logs/query/model/system-log-list.filters';

const ERROR_PREFIX = 'ERR-';
const SUCCESS_PREFIX = 'SUC-';
const ERROR_PREFIX_LENGTH = ERROR_PREFIX.length;
const SUCCESS_PREFIX_LENGTH = SUCCESS_PREFIX.length;

const HOURS_IN_DAY = 23;
const MINUTES_IN_HOUR = 59;
const SECONDS_IN_MINUTE = 59;
const MILLISECONDS_IN_SECOND = 999;

export function escapeMysqlLikePattern(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');
}

export function parseStatusCodeFilter(raw: string | undefined): number | null {
  if (raw === undefined) {
    return null;
  }
  let s = raw.trim();
  if (!s) {
    return null;
  }
  const upper = s.toUpperCase();
  if (upper.startsWith(ERROR_PREFIX)) {
    s = s.slice(ERROR_PREFIX_LENGTH);
  } else if (upper.startsWith(SUCCESS_PREFIX)) {
    s = s.slice(SUCCESS_PREFIX_LENGTH);
  }
  s = s.trim();
  if (!s) {
    return null;
  }
  const n = Number.parseInt(s, 10);
  return Number.isNaN(n) ? null : n;
}

function startOfLocalDay(yyyyMmDd: string): Date {
  const parts = yyyyMmDd.split('-');
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

function endOfLocalDay(yyyyMmDd: string): Date {
  const parts = yyyyMmDd.split('-');
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  return new Date(
    y,
    m - 1,
    d,
    HOURS_IN_DAY,
    MINUTES_IN_HOUR,
    SECONDS_IN_MINUTE,
    MILLISECONDS_IN_SECOND,
  );
}

export function resolveDataRangeBounds(filters: SystemLogListFiltersType): {
  dataFrom?: Date;
  dataTo?: Date;
} {
  const start = filters.startDate?.toISOString().split('T')[0];
  const end = filters.endDate?.toISOString().split('T')[0];

  if (start !== undefined && end !== undefined) {
    return {
      dataFrom: startOfLocalDay(start),
      dataTo: endOfLocalDay(end),
    };
  }
  if (start !== undefined) {
    return { dataFrom: startOfLocalDay(start) };
  }
  if (end !== undefined) {
    return { dataTo: endOfLocalDay(end) };
  }
  return {};
}
