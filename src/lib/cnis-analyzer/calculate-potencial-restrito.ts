import { TetoInssData } from '@lib/cnis-analyzer/data/teto.inss';

import type { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';

const REFORMA_YEAR = 2019;
const REFORMA_MONTH = 11;
const DAYS_IN_MONTH = 30;
const DAYS_IN_YEAR = 360;

/**
 * Interface para um item de competência
 */
interface CompetenciaItemInterface {
  competencia: string;
  validaParaTempo: boolean;
  validaParaCarencia: boolean;
  isPresumedGap: boolean;
  isHeader: boolean;
  isSynthetic: boolean;
}

/**
 * Interface para um vínculo (bond)
 */
interface BondInterface {
  id: string;
  seq: number;
  tipoRegistro: 'beneficio' | 'vinculo';
  tipo: string;
  dataInicio: Date | null;
  dataFim: Date | null;
  items: CompetenciaItemInterface[];
}

/**
 * Interface para métricas unificadas
 */
interface UnifiedMetricsInterface {
  tempoDias: number;
  carenciaMeses: number;
}

/**
 * Interface para intervalo de dias
 */
interface DayIntervalInterface {
  start: number;
  end: number;
}

/**
 * Calcula métricas unificadas (Tempo e Carência) considerando a concomitância.
 * Deduplica períodos sobrepostos entre diferentes vínculos.
 * EXATA CÓPIA DO FRONTEND (bondService.ts:calculateUnifiedMetrics)
 */
function calculateUnifiedMetrics(
  bonds: BondInterface[],
  scenario: 'potential' | 'restricted',
  cutoffDate?: Date,
): UnifiedMetricsInterface {
  const uniqueCarencia = new Set<string>();

  // Mapa: Competência -> Lista de Intervalos {start, end} (Dia 1 a 30)
  const intervalsMap = new Map<string, DayIntervalInterface[]>();

  bonds.forEach((bond) => {
    // Ignora benefícios puros para contagem de tempo/carência neste contexto
    if (bond.tipoRegistro === 'beneficio') {
      return;
    }

    // CORREÇÃO IMPORTANTE:
    // Não filtramos pelo status geral do vínculo aqui.
    // Vínculos podem ter status "Pendência" devido a indicadores de cabeçalho (ex: IREM-INDPEND),
    // mas conter competências válidas. O filtro é feito item a item abaixo.

    const isEmpregado =
      bond.tipo.toUpperCase().includes('EMPREGADO') ||
      bond.tipo.toUpperCase().includes('DOMÉSTICO') ||
      bond.tipo.toUpperCase().includes('DOMESTICO') ||
      bond.tipo.toUpperCase().includes('AVULSO');

    const bondStart = bond.dataInicio ? new Date(bond.dataInicio) : new Date();
    let bondEnd = bond.dataFim ? new Date(bond.dataFim) : null;

    // Aplica Data de Corte (ex: Reforma da Previdência)
    if (cutoffDate) {
      // Se o vínculo começou após o corte, ignora totalmente
      if (bondStart > cutoffDate) {
        return;
      }

      // Se o vínculo termina após o corte (ou é ativo), limita ao corte
      if (!bondEnd || bondEnd > cutoffDate) {
        bondEnd = cutoffDate;
      }
    }

    bond.items.forEach((item) => {
      if (item.isHeader || item.isSynthetic) {
        return;
      }

      // Verifica data da competência em relação ao corte
      const parts = item.competencia.split('/').map(Number);
      const mes = parts[0];
      const ano = parts[1];
      if (mes === undefined || ano === undefined) {
        return;
      }

      const itemDate = new Date(ano, mes - 1, 1);

      // Se o item é posterior ao corte, ignora
      if (cutoffDate && itemDate > cutoffDate) {
        return;
      }

      // Verifica validade baseada no cenário
      // No Cenário Restrito (Atual), usamos a flag 'validaParaTempo' que já foi calculada pelo analisador
      // considerando indicadores específicos daquela competência (ex: PREC-PMIG-DOM invalida aqui).
      const isValidTime =
        scenario === 'potential' ? true : item.validaParaTempo;
      const isValidCarencia =
        scenario === 'potential' ? true : item.validaParaCarencia;

      // --- LÓGICA DE TEMPO (DIAS) ---
      if (isValidTime) {
        // Helper para calcular o intervalo de dias (1-30) desta competência
        const calculateItemInterval = (): DayIntervalInterface => {
          // Regra Pós-Reforma: Sempre 30 dias (1 a 30) se válido
          const isPostReform =
            ano > REFORMA_YEAR ||
            (ano === REFORMA_YEAR && mes >= REFORMA_MONTH);

          if (isPostReform) {
            return { start: 1, end: 30 };
          }

          // Pré-Reforma: CI/Facultativo -> 30 dias
          if (!isEmpregado) {
            return { start: 1, end: 30 };
          }

          // Pré-Reforma: Empregado -> Data a Data nos extremos
          let startDay = 1;
          // É mês de início?
          if (
            mes === bondStart.getMonth() + 1 &&
            ano === bondStart.getFullYear()
          ) {
            startDay = Math.min(bondStart.getDate(), DAYS_IN_MONTH);
          }

          let endDay = DAYS_IN_MONTH;
          // É mês de fim? (Considerando o bondEnd ajustado pelo cutoff)
          if (
            bondEnd &&
            mes === bondEnd.getMonth() + 1 &&
            ano === bondEnd.getFullYear()
          ) {
            const lastDayOfMonth = new Date(ano, mes, 0).getDate();
            if (bondEnd.getDate() === lastDayOfMonth) {
              endDay = DAYS_IN_MONTH;
            } else {
              // Se termina no dia 1, significa que não houve trabalho naquele mês
              // Mas para lacunas preenchidas (Art. 36 §2º), contamos o mês completo
              if (bondEnd.getDate() === 1 && item.isPresumedGap) {
                endDay = DAYS_IN_MONTH;
              } else {
                endDay = Math.min(bondEnd.getDate(), DAYS_IN_MONTH);
              }
            }
          }

          // Caso especial: Início e Fim no mesmo mês
          if (
            mes === bondStart.getMonth() + 1 &&
            ano === bondStart.getFullYear() &&
            bondEnd &&
            mes === bondEnd.getMonth() + 1 &&
            ano === bondEnd.getFullYear()
          ) {
            startDay = Math.min(bondStart.getDate(), DAYS_IN_MONTH);
            endDay = bondEnd.getDate();
            const lastDayOfMonth = new Date(ano, mes, 0).getDate();
            if (endDay === lastDayOfMonth) {
              endDay = DAYS_IN_MONTH;
            } else {
              // Se termina no dia 1 e é lacuna preenchida, conta mês completo
              if (endDay === 1 && item.isPresumedGap) {
                endDay = DAYS_IN_MONTH;
              } else {
                endDay = Math.min(endDay, DAYS_IN_MONTH);
              }
            }
          }

          if (startDay > endDay) {
            return { start: 0, end: 0 };
          }
          return { start: startDay, end: endDay };
        };

        const interval = calculateItemInterval();
        if (interval.end > 0) {
          if (!intervalsMap.has(item.competencia)) {
            intervalsMap.set(item.competencia, []);
          }
          intervalsMap.get(item.competencia)?.push(interval);
        }
      }

      // --- LÓGICA DE CARÊNCIA ---
      // Se válido para carência, adiciona ao Set (deduplicação automática)
      if (isValidCarencia) {
        uniqueCarencia.add(item.competencia);
      }
    });
  });

  // Calcula dias unificados (união de intervalos)
  let totalTempoDias = 0;
  intervalsMap.forEach((intervals) => {
    if (intervals.length === 0) {
      return;
    }
    // Ordena por início
    const sorted = [...intervals].sort((a, b) => a.start - b.start);

    if (sorted.length === 0) {
      return;
    }
    let daysInMonth = 0;
    const firstInterval = sorted[0];
    if (!firstInterval) {
      return;
    }
    let currentStart = firstInterval.start;
    let currentEnd = firstInterval.end;

    for (let i = 1; i < sorted.length; i++) {
      const next = sorted[i];
      if (!next) {
        continue;
      }
      // Se sobrepõe ou é adjacente
      if (next.start <= currentEnd + 1) {
        currentEnd = Math.max(currentEnd, next.end);
      } else {
        daysInMonth += currentEnd - currentStart + 1;
        currentStart = next.start;
        currentEnd = next.end;
      }
    }
    daysInMonth += currentEnd - currentStart + 1;
    const finalDays = Math.min(DAYS_IN_MONTH, daysInMonth); // Teto de 30 dias por competência
    totalTempoDias += finalDays;
  });

  return {
    tempoDias: totalTempoDias,
    carenciaMeses: uniqueCarencia.size,
  };
}

/**
 * Preenche lacunas de competências para vínculos de Empregado/Doméstico/Avulso.
 * EXATA CÓPIA DO FRONTEND (bondService.ts:fillEmployeeGaps)
 */
function fillEmployeeGaps(
  items: CompetenciaItemInterface[],
  startDate: Date,
  endDate: Date | null,
  indicadoresHeader: string[],
): CompetenciaItemInterface[] {
  const filledItems = [...items];

  const existingCompetencies = new Set(
    items
      .filter((i) => !i.isHeader && !i.isSynthetic)
      .map((i) => i.competencia),
  );

  const invalidatingIndicators = [
    'PREC-PMIG-DOM',
    'PEXT',
    'PVIN-IRREG',
    'PREM-EXT',
    'PEM-CAD',
    'PADM-EMPR',
  ];
  const isGloballyInvalid = indicadoresHeader.some((i) =>
    invalidatingIndicators.some((bad) => i.includes(bad)),
  );

  let targetEnd: Date = endDate ?? new Date();
  if (!endDate) {
    const remunerations = items.filter((i) => !i.isHeader && !i.isSynthetic);
    if (remunerations.length > 0) {
      const lastRem = remunerations[remunerations.length - 1];
      if (lastRem) {
        const [m, y] = lastRem.competencia.split('/').map(Number);
        if (m !== undefined && y !== undefined) {
          targetEnd = new Date(y, m, 0);
        }
      }
    }
  }

  const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const end = new Date(targetEnd.getFullYear(), targetEnd.getMonth(), 1);

  if (cursor > end) {
    return items;
  }

  while (cursor <= end) {
    const mes = cursor.getMonth() + 1;
    const ano = cursor.getFullYear();
    const compStr = `${String(mes).padStart(2, '0')}/${ano}`;

    if (!existingCompetencies.has(compStr)) {
      filledItems.push({
        competencia: compStr,
        validaParaTempo: !isGloballyInvalid,
        validaParaCarencia: !isGloballyInvalid,
        isPresumedGap: true,
        isHeader: false,
        isSynthetic: false,
      });
    }

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return filledItems;
}

function getFirstDate(items: CompetenciaItemInterface[]): Date {
  if (items.length === 0) {
    return new Date();
  }
  const validItems = items.filter((i) => !i.isHeader && !i.isSynthetic);
  if (validItems.length === 0) {
    return new Date();
  }
  const firstItem = validItems[0];
  if (!firstItem) {
    return new Date();
  }
  const comp = firstItem.competencia;
  const parts = comp.split('/').map(Number);
  const mes = parts[0];
  const ano = parts[1];
  if (mes === undefined || ano === undefined) {
    return new Date();
  }
  return new Date(ano, mes - 1, 1);
}

function getLastDate(items: CompetenciaItemInterface[]): Date | null {
  if (items.length === 0) {
    return null;
  }
  const validItems = items.filter((i) => !i.isHeader && !i.isSynthetic);
  if (validItems.length === 0) {
    return null;
  }
  const lastItem = validItems[validItems.length - 1];
  if (!lastItem) {
    return null;
  }
  const comp = lastItem.competencia;
  const parts = comp.split('/').map(Number);
  const mes = parts[0];
  const ano = parts[1];
  if (mes === undefined || ano === undefined) {
    return null;
  }
  return new Date(ano, mes, 0);
}

/**
 * Valida uma competência e determina se é válida para tempo e carência.
 */
function validateCompetencia(
  earning: {
    competencia?: Date | string;
    indicadores?: string;
    remuneracao?: string;
  },
  indicadoresHeader: string | null,
): {
  competencia: string;
  validaParaTempo: boolean;
  validaParaCarencia: boolean;
} | null {
  if (earning.competencia === undefined) {
    return null;
  }

  // Converte string para Date se necessário
  const competenciaDate =
    earning.competencia instanceof Date
      ? earning.competencia
      : new Date(earning.competencia);

  if (isNaN(competenciaDate.getTime())) {
    return null;
  }

  const mes = competenciaDate.getMonth() + 1;
  const ano = competenciaDate.getFullYear();
  const competenciaStr = `${String(mes).padStart(2, '0')}/${ano}`;

  // Extrai indicadores
  const indicadores =
    earning.indicadores !== undefined && earning.indicadores.trim() !== ''
      ? earning.indicadores.split(/[,\s]+/).filter((i) => i.trim())
      : [];

  // IMPORTANTE: Verifica AMBOS os indicadores:
  // - indicadores (competência individual)
  // - indicadoresHeader (cabeçalho do vínculo)
  const indicadoresHeaderList =
    indicadoresHeader !== null && indicadoresHeader.trim() !== ''
      ? indicadoresHeader.split(/[,\s]+/).filter((i) => i.trim())
      : [];

  const allIndicators = [...indicadores, ...indicadoresHeaderList];

  // Verifica indicadores bloqueadores (tanto da competência quanto do cabeçalho)
  const invalidatingIndicators = [
    'PREC-PMIG-DOM',
    'PEXT',
    'PVIN-IRREG',
    'PREM-EXT',
    'PEM-CAD',
    'PADM-EMPR',
  ];
  const blockingIndicator = allIndicators.find((ind) => {
    const indUpper = ind.toUpperCase().trim();
    return invalidatingIndicators.some((block) => indUpper.includes(block));
  });

  // Abaixo do mínimo: por indicadores CNIS
  const temAbaixoMinimoIndicador = allIndicators.some(
    (ind) => ind.includes('PREC-MENOR') || ind.includes('PSC-MEN-SM'),
  );

  // Abaixo do mínimo: por valor (Art. 209 – remuneração < salário mínimo do ano)
  const rawRemuneracao = earning.remuneracao ?? '';
  const remuneracaoNum = Number(
    rawRemuneracao.replace(/\./g, '').replace(',', '.'),
  );
  const tetoAno = TetoInssData.find((t) => t.ano === ano);
  const salarioMinimo = tetoAno?.salarioMinimo;
  const temAbaixoMinimoValor =
    typeof salarioMinimo === 'number' &&
    !Number.isNaN(remuneracaoNum) &&
    remuneracaoNum > 0 &&
    remuneracaoNum < salarioMinimo;

  const temAbaixoMinimo = temAbaixoMinimoIndicador || temAbaixoMinimoValor;

  // Validação básica: inválida se tem bloqueador ou abaixo do mínimo
  const validaParaTempo = blockingIndicator === undefined && !temAbaixoMinimo;
  const validaParaCarencia =
    blockingIndicator === undefined && !temAbaixoMinimo;

  return {
    competencia: competenciaStr,
    validaParaTempo,
    validaParaCarencia,
  };
}

/**
 * Agrupa competências por vínculo, similar ao groupResultsByBond do frontend
 */
function groupResultsByBond(data: CnisModel): BondInterface[] {
  const bonds: BondInterface[] = [];

  data.socialSecurityRelations?.forEach((relation, index) => {
    const isBenefit =
      relation.socialSecurityAffiliationInfo.origemDoVinculo?.includes(
        'Benefício',
      ) ?? false;
    const tipoRegistro = isBenefit ? 'beneficio' : 'vinculo';
    const tipoVinculo =
      relation.socialSecurityAffiliationInfo.tipoFiliadoNoVinculo ?? '';
    const isEmpregado =
      tipoVinculo.toUpperCase().includes('EMPREGADO') ||
      tipoVinculo.toUpperCase().includes('DOMÉSTICO') ||
      tipoVinculo.toUpperCase().includes('DOMESTICO') ||
      tipoVinculo.toUpperCase().includes('AVULSO');

    // Datas do vínculo (converte string para Date se necessário)
    const bondStart = relation.socialSecurityAffiliationInfo.dataInicio
      ? relation.socialSecurityAffiliationInfo.dataInicio instanceof Date
        ? relation.socialSecurityAffiliationInfo.dataInicio
        : new Date(relation.socialSecurityAffiliationInfo.dataInicio)
      : null;
    const bondEnd = relation.socialSecurityAffiliationInfo.dataFim
      ? relation.socialSecurityAffiliationInfo.dataFim instanceof Date
        ? relation.socialSecurityAffiliationInfo.dataFim
        : new Date(relation.socialSecurityAffiliationInfo.dataFim)
      : null;

    // Indicadores do cabeçalho
    const indicadoresHeader =
      relation.socialSecurityAffiliationInfo.indicadores ?? null;
    const indicadoresHeaderList =
      indicadoresHeader !== null && indicadoresHeader.trim() !== ''
        ? indicadoresHeader.split(/[,\s]+/).filter((i) => i.trim())
        : [];

    // Coleta competências reais
    const items: CompetenciaItemInterface[] = [];
    relation.socialSecurityAffiliationEarningsHistory.forEach((earning) => {
      // Aceita tanto Date quanto string (JSON parseado)
      if (earning.competencia !== undefined) {
        const competenciaValidada = validateCompetencia(
          earning,
          indicadoresHeader,
        );
        if (competenciaValidada) {
          items.push({
            competencia: competenciaValidada.competencia,
            validaParaTempo: competenciaValidada.validaParaTempo,
            validaParaCarencia: competenciaValidada.validaParaCarencia,
            isPresumedGap: false,
            isHeader: false,
            isSynthetic: false,
          });
        }
      }
    });

    // Preenche lacunas para empregados (Art. 36 §2º Dec 3.048/99)
    // ATUALIZAÇÃO: Executa mesmo se houver pendências no cabeçalho (como PEXT),
    // para que a lacuna apareça na análise (mesmo que inválida).
    if (isEmpregado && bondStart && !isBenefit) {
      const filledItems = fillEmployeeGaps(
        items,
        bondStart,
        bondEnd,
        indicadoresHeaderList,
      );
      // Atualiza a lista de items para incluir os virtuais
      items.length = 0;
      items.push(...filledItems);
      // Reordena por data (considerando isHeader primeiro, como no frontend)
      items.sort((a, b) => {
        if (a.isHeader) {
          return -1;
        }
        if (b.isHeader) {
          return 1;
        }

        // Tratamento robusto para ano/mes
        const partsA = a.competencia.split('/').map(Number);
        const partsB = b.competencia.split('/').map(Number);
        const mesA = partsA[0];
        const anoA = partsA[1];
        const mesB = partsB[0];
        const anoB = partsB[1];
        if (anoA !== undefined && anoB !== undefined && anoA !== anoB) {
          return anoA - anoB;
        }
        if (mesA !== undefined && mesB !== undefined) {
          return mesA - mesB;
        }
        return 0;
      });
    } else {
      // Ordena por competência (quando não há preenchimento de lacunas)
      items.sort((a, b) => {
        const partsA = a.competencia.split('/').map(Number);
        const partsB = b.competencia.split('/').map(Number);
        const mesA = partsA[0];
        const anoA = partsA[1];
        const mesB = partsB[0];
        const anoB = partsB[1];
        if (anoA !== undefined && anoB !== undefined && anoA !== anoB) {
          return anoA - anoB;
        }
        if (mesA !== undefined && mesB !== undefined) {
          return mesA - mesB;
        }
        return 0;
      });
    }

    // Determina datas finais do vínculo
    let dInicio = bondStart;
    if (!dInicio && items.length > 0) {
      dInicio = getFirstDate(items);
    }

    let dFim = bondEnd;
    if (!dFim && items.length > 0) {
      dFim = getLastDate(items);
    }
    if (
      items.filter((i) => !i.isHeader && !i.isSynthetic).length === 0 &&
      dInicio
    ) {
      dFim = null;
    }

    const seq = relation.socialSecurityAffiliationInfo.seq ?? index;
    bonds.push({
      id: `bond-${index}-${Date.now()}`,
      seq,
      tipoRegistro,
      tipo: tipoVinculo,
      dataInicio: dInicio,
      dataFim: dFim,
      items,
    });
  });

  return bonds;
}

/**
 * Formata dias totais para formato "Ya Xm Zd"
 */
function formatDaysToYMD(totalDays: number): string {
  const years = Math.floor(totalDays / DAYS_IN_YEAR);
  const remainder = totalDays % DAYS_IN_YEAR;
  const months = Math.floor(remainder / DAYS_IN_MONTH);
  const days = remainder % DAYS_IN_MONTH;
  return `${years}a ${months}m ${days}d`;
}

/**
 * Função principal para calcular potencialValido e restritoValido
 * @param data - CnisModel do backend
 * @returns Objeto com potencialValido e restritoValido formatados
 */
export function calculatePotencialRestrito(data: CnisModel): {
  potencialValido: string;
  restritoValido: string;
} {
  // Agrupa competências por vínculo
  const bonds = groupResultsByBond(data);

  // Calcula métricas usando novo método por competência
  const metricsPotencial = calculateUnifiedMetrics(bonds, 'potential');
  const metricsRestrito = calculateUnifiedMetrics(bonds, 'restricted');

  const potencialValido = formatDaysToYMD(metricsPotencial.tempoDias);
  const restritoValido = formatDaysToYMD(metricsRestrito.tempoDias);

  return {
    potencialValido,
    restritoValido,
  };
}
