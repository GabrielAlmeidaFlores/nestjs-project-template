export interface NormalizedDateRangeInterface {
  startDate: Date | null;
  endDate: Date | null;
}

export function normalizeDateRange(
  start?: Date,
  end?: Date,
): NormalizedDateRangeInterface {
  let startDate: Date | null = null;
  let endDate: Date | null = null;

  if (start instanceof Date && !Number.isNaN(start.getTime())) {
    startDate = new Date(start.toISOString().split('T')[0] + 'T00:00:00.000Z');
  }

  if (end instanceof Date && !Number.isNaN(end.getTime())) {
    endDate = new Date(end.toISOString().split('T')[0] + 'T23:59:59.999Z');
  }

  return { startDate, endDate };
}
