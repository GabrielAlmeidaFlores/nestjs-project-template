export interface DiffYmdResult {
  years: number;
  months: number;
  days: number;
  formatted: string; // "Xa Ym Zd"
}

/**
 * Diferença exata entre start e end em anos, meses e dias (inclusivo).
 * Retorna zeros se end < start ou datas inválidas.
 * Usa moment no código que consome este util (implementado com API padrão Date).
 * Regra adicional a partir de 01/11/2019:
 * A contagem deve ser feita  pelo mes cheio, mesmo que o mes inicio ou fim do periodo  do trabalho seja parcial.
 */
export function diffYmdInclusive(
  start: Date | null | undefined,
  end: Date | null | undefined,
): DiffYmdResult {
  if (
    !start ||
    !end ||
    !(start instanceof Date) ||
    !(end instanceof Date) ||
    isNaN(start.getTime()) ||
    isNaN(end.getTime())
  ) {
    return { years: 0, months: 0, days: 0, formatted: '0a 0m 0d' };
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const toUtcDay = (d: Date) =>
    new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const s = toUtcDay(start);
  const e = toUtcDay(end);

  if (e.getTime() < s.getTime()) {
    return { years: 0, months: 0, days: 0, formatted: '0a 0m 0d' };
  }

  let years = e.getUTCFullYear() - s.getUTCFullYear();
  const sPlusYears = new Date(
    Date.UTC(s.getUTCFullYear() + years, s.getUTCMonth(), s.getUTCDate()),
  );
  if (sPlusYears.getTime() > e.getTime()) {
    years -= 1;
  }
  const afterYears = new Date(
    Date.UTC(s.getUTCFullYear() + years, s.getUTCMonth(), s.getUTCDate()),
  );

  const addMonths = (d: Date, months: number): Date => {
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth() + months;
    const day = d.getUTCDate();
    let cand = new Date(Date.UTC(y, m, day));
    if (cand.getUTCDate() !== day) {
      cand = new Date(
        Date.UTC(cand.getUTCFullYear(), cand.getUTCMonth() + 1, 0),
      );
    }
    return cand;
  };

  const NUMBER_MONTHS_IN_YEAR = 12;
  let months = 0;
  const roughMonths =
    (e.getUTCFullYear() - afterYears.getUTCFullYear()) * NUMBER_MONTHS_IN_YEAR +
    (e.getUTCMonth() - afterYears.getUTCMonth());
  months = Math.max(0, roughMonths);
  while (months > 0) {
    const cand = addMonths(afterYears, months);
    if (cand.getTime() > e.getTime()) {
      months -= 1;
    } else {
      break;
    }
  }
  while (true) {
    const cand = addMonths(afterYears, months + 1);
    if (cand.getTime() <= e.getTime()) {
      months += 1;
    } else {
      break;
    }
  }
  const base = addMonths(afterYears, months);
  let days = Math.floor((e.getTime() - base.getTime()) / msPerDay) + 1;

  const RULE_START_UTC = Date.UTC(2019, 10, 1);
  if (s.getTime() >= RULE_START_UTC || e.getTime() >= RULE_START_UTC) {
    if (days > 0) {
      months += 1;
      days = 0;
    }

    if (months >= NUMBER_MONTHS_IN_YEAR) {
      const addYears = Math.floor(months / NUMBER_MONTHS_IN_YEAR);
      years += addYears;
      months = months % NUMBER_MONTHS_IN_YEAR;
    }
  }

  const result = {
    years,
    months,
    days,
    formatted: `${years}a ${months}m ${days}d`,
  };
  return result;
}
