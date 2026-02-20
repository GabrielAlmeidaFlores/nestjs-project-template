import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';

import { CnisAnalysisResultModel } from '@lib/cnis-analyzer/model/generic/cnis-analysis-result.model';

import type { ConsolidadoRelacaoInterface } from '@lib/cnis-analyzer/interface/consolidado-relation.interface';
import type { DataInterface } from '@lib/cnis-analyzer/interface/data-interface';

const APOSENTADORIA_KEYS = [
  'aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido',
  'aposentadoriaPorIdadeUrbanaComDireitoAdquirido',
  'aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15',
  'aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16',
  'aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt17',
  'aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt20',
  'aposentadoriaPorIdadeHibridaComDireitoAdquirido',
  'aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18',
  'aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18',
  'aposentadoriaProgramadaComumPrevistaNoArt19',
] as const;

function humanKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

const PERCENTUAL_MENORES_CONTRIBUICOES = 0.2;

@Injectable()
export class CnisFastAnalysisTemplateService {
  protected readonly _type = CnisFastAnalysisTemplateService.name;

  private readonly templatePath = path.join(
    process.cwd(),
    'src',
    'module',
    'customer',
    'analysis-tool',
    'module',
    'cnis-fast-analysis',
    'templates',
    'cnis-fast-analysis-complete.hbs',
  );

  public buildAposentadoriaItems(cnisAnalysis: CnisAnalysisResultModel): {
    type: string;
    eligibility: Record<string, unknown>;
    requirements: Record<string, unknown>;
    requirementsEntries: { key: string; value: unknown }[];
  }[] {
    const items: {
      type: string;
      eligibility: Record<string, unknown>;
      requirements: Record<string, unknown>;
      requirementsEntries: { key: string; value: unknown }[];
    }[] = [];

    for (const key of APOSENTADORIA_KEYS) {
      const analysis = cnisAnalysis[key] as
        | {
            type?: string;
            eligibility?: unknown;
            requirements?: Record<string, unknown>;
          }
        | undefined;
      if (!analysis || typeof analysis !== 'object') {
        continue;
      }

      const type = analysis.type ?? key;
      const eligibility = analysis.eligibility as Record<string, unknown>;
      const requirements = analysis.requirements ?? {};
      const requirementsEntries = Object.entries(requirements).map(
        ([k, v]) => ({ key: humanKey(k), value: v }),
      );

      items.push({
        type,
        eligibility,
        requirements,
        requirementsEntries,
      });
    }

    return items;
  }

  public render(cnisAnalysis: CnisAnalysisResultModel): string {
    const html = this.renderToHtml(cnisAnalysis);
    return html;
  }

  /**
   * Renderiza o template HBS para HTML (para uso em preview/PDF sem conversão para markdown).
   */
  public renderToHtml(cnisAnalysis: CnisAnalysisResultModel): string {
    const template = this.compileTemplate();
    const aposentadoriaItems = this.buildAposentadoriaItems(cnisAnalysis);
    const consolidacaoTempoCarencia =
      this.buildConsolidacaoTempoCarencia(cnisAnalysis);
    const concomitantesParaDetalhe =
      this.buildConcomitantesParaDetalhe(cnisAnalysis);
    const demonstrativoImpactoTotal = this.buildDemonstrativoImpactoTotal(
      cnisAnalysis.indicadoresDePendencia,
    );
    const menoresContribuicoes20Pct = this.buildMenoresContribuicoes20Pct(
      cnisAnalysis.correcaoMonetaria,
    );
    const beneficiosIncapacidadeTable = this.buildBeneficiosIncapacidadeTable(
      cnisAnalysis.indicadoresDeIncapacidade,
    );
    const resumoSalarioBeneficio = this.buildResumoSalarioBeneficio(
      cnisAnalysis.salarioSBPosReforma,
    );
    const inconsistenciasSobreposicao = this.buildInconsistenciasSobreposicao(
      cnisAnalysis.consolidadoResumido,
    );

    const now = new Date();
    const reportDate = [
      now.getDate().toString().padStart(2, '0'),
      (now.getMonth() + 1).toString().padStart(2, '0'),
      now.getFullYear(),
    ].join('/');

    const context = {
      reportDate,
      cnisAnalysis,
      aposentadoriaItems,
      consolidacaoTempoCarencia,
      concomitantesParaDetalhe,
      demonstrativoImpactoTotal,
      menoresContribuicoes20Pct,
      beneficiosIncapacidadeTable,
      resumoSalarioBeneficio,
      inconsistenciasSobreposicao,
    };
    return template(context);
  }

  private buildConsolidacaoTempoCarencia(
    cnisAnalysis: CnisAnalysisResultModel,
  ): {
    tempoSemPendencias: string;
    tempoComPendencias: string;
    carenciaSemPendencias: number;
    carenciaComPendencias: number;
  } {
    const principal = (c: ConsolidadoRelacaoInterface): boolean =>
      c.tipo !== 'secundario';
    const semPendencia = (c: ConsolidadoRelacaoInterface): boolean =>
      !c.isPendencia;
    const carenciaSemPendencias = (cnisAnalysis.consolidadoResumido ?? [])
      .filter((c) => principal(c) && semPendencia(c))
      .reduce((acc, c) => acc + (c.carencia ?? 0), 0);
    return {
      tempoSemPendencias: cnisAnalysis.potencialValido,
      tempoComPendencias: cnisAnalysis.restritoValido,
      carenciaSemPendencias,
      carenciaComPendencias: cnisAnalysis.carenciaTotal ?? 0,
    };
  }

  private buildConcomitantesParaDetalhe(
    cnisAnalysis: CnisAnalysisResultModel,
  ): {
    grupo: number;
    seq: number;
    origem: string | null;
    periodoOriginal: string;
    duracaoOriginal: string;
    analise: string;
    tempoValidoSoma: string;
  }[] {
    const list = (cnisAnalysis.consolidadoResumido ?? []).filter(
      (c) => c.isConcomitante,
    );
    const formatRange = (d: DataInterface | null | undefined): string => {
      if (d === null || d === undefined) {
        return '—';
      }
      const fmt = (x: Date | null | undefined): string =>
        x === null || x === undefined
          ? '—'
          : new Date(x).toLocaleDateString('pt-BR');
      return `${fmt(d.dataInicio)} a ${fmt(d.dataFim)}`;
    };
    return list.map((c) => ({
      grupo: 1,
      seq: c.seq,
      origem: c.origem ?? null,
      periodoOriginal: formatRange(c.contributionTime?.data ?? null),
      duracaoOriginal: c.contributionTime?.abreviado ?? '—',
      analise: c.tipo === 'principal' ? 'Principal' : 'Secundário',
      tempoValidoSoma: c.validContributionTime?.abreviado ?? '0a 0m 0d',
    }));
  }

  private buildDemonstrativoImpactoTotal(
    indicadoresDePendencia:
      | { dias?: number; meses?: number; anos?: number; carencia?: number }[]
      | undefined,
  ): {
    impactoDias: number;
    impactoMeses: number;
    impactoAnos: number;
    impactoCarencia: number;
  } | null {
    if (
      !Array.isArray(indicadoresDePendencia) ||
      indicadoresDePendencia.length === 0
    ) {
      return null;
    }
    const impactoDias = indicadoresDePendencia.reduce(
      (a, i) => a + (i.dias ?? 0),
      0,
    );
    const impactoMeses = indicadoresDePendencia.reduce(
      (a, i) => a + (i.meses ?? 0),
      0,
    );
    const impactoAnos = indicadoresDePendencia.reduce(
      (a, i) => a + (i.anos ?? 0),
      0,
    );
    const impactoCarencia = indicadoresDePendencia.reduce(
      (a, i) => a + (i.carencia ?? 0),
      0,
    );
    return { impactoDias, impactoMeses, impactoAnos, impactoCarencia };
  }

  private buildMenoresContribuicoes20Pct(
    correcaoMonetaria:
      | { valorCorrigido: number; competencia?: string }[]
      | undefined,
  ): { ordem: number; competencia: string; valorCorrigido: number }[] {
    if (!Array.isArray(correcaoMonetaria) || correcaoMonetaria.length === 0) {
      return [];
    }
    const sorted = [...correcaoMonetaria].sort(
      (a, b) => a.valorCorrigido - b.valorCorrigido,
    );
    const take = Math.ceil(sorted.length * PERCENTUAL_MENORES_CONTRIBUICOES);
    return sorted.slice(0, take).map((item, i) => ({
      ordem: i + 1,
      competencia: item.competencia ?? '—',
      valorCorrigido: item.valorCorrigido,
    }));
  }

  private buildBeneficiosIncapacidadeTable(
    indicadoresDeIncapacidade: ConsolidadoRelacaoInterface[] | undefined,
  ): {
    seq: number;
    origem: string | null;
    status: string;
    observacao: string;
  }[] {
    if (!Array.isArray(indicadoresDeIncapacidade)) {
      return [];
    }
    return indicadoresDeIncapacidade.map((c) => ({
      seq: c.seq,
      origem: c.origem ?? null,
      status: c.isIntercalado ? 'Contabilizado' : 'Não Contabilizado',
      observacao: c.isIntercalado
        ? 'Período intercalado (contribuição antes e depois do benefício).'
        : 'Período não intercalado ou benefício ainda ativo.',
    }));
  }

  private buildResumoSalarioBeneficio(salarioSB: {
    salarioBeneficio?: number;
    numeroCompetenciasConsideradas?: number;
    somaValoresConsiderados?: number;
  }): {
    somaSalariosCorrigidos: number;
    numeroContribuicoes: number;
    calculoMedia: number;
    sbResultante: number;
  } | null {
    const num = salarioSB.numeroCompetenciasConsideradas;
    if (num === undefined) {
      return null;
    }
    const soma = salarioSB.somaValoresConsiderados ?? 0;
    const media = num > 0 ? soma / num : 0;
    return {
      somaSalariosCorrigidos: soma,
      numeroContribuicoes: num,
      calculoMedia: media,
      sbResultante: salarioSB.salarioBeneficio ?? media,
    };
  }

  private buildInconsistenciasSobreposicao(
    consolidadoResumido: ConsolidadoRelacaoInterface[] | undefined,
  ): { seq: number; origem: string | null }[] {
    if (!Array.isArray(consolidadoResumido)) {
      return [];
    }
    return consolidadoResumido
      .filter((c) => c.ajustado)
      .map((c) => ({ seq: c.seq, origem: c.origem ?? null }));
  }

  private compileTemplate(): Handlebars.TemplateDelegate {
    this.registerHelpers();
    const source = fs.readFileSync(this.templatePath, 'utf-8');
    return Handlebars.compile(source);
  }

  private registerHelpers(): void {
    if (Handlebars.helpers['formatDate']) {
      return;
    }

    Handlebars.registerHelper('formatDate', (value: unknown) => {
      if (value === null || value === undefined) {
        return '—';
      }
      const d = value instanceof Date ? value : new Date(value as string);
      return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('pt-BR');
    });

    Handlebars.registerHelper('formatValue', (value: unknown) => {
      if (value === null || value === undefined) {
        return '—';
      }
      if (value instanceof Date) {
        return isNaN(value.getTime()) ? '—' : value.toLocaleDateString('pt-BR');
      }
      if (typeof value === 'boolean') {
        return value ? 'Sim' : 'Não';
      }
      if (typeof value === 'object') {
        return '—';
      }
      if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
      }
      return '—';
    });

    Handlebars.registerHelper('hasItems', (arr: unknown) => {
      return Array.isArray(arr) && arr.length > 0;
    });

    Handlebars.registerHelper(
      'arrayJoin',
      (arr: unknown, sep: string | undefined) => {
        if (!Array.isArray(arr)) {
          return '';
        }
        return arr.join(sep ?? ', ');
      },
    );

    Handlebars.registerHelper('formatCurrency', (value: unknown) => {
      const n = typeof value === 'number' ? value : Number(value);
      if (Number.isNaN(n)) {
        return '—';
      }
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(n);
    });

    Handlebars.registerHelper(
      'contains',
      (haystack: unknown, needle: unknown): boolean => {
        if (haystack === null || haystack === undefined) {
          return false;
        }
        if (needle === null || needle === undefined) {
          return false;
        }
        if (typeof haystack !== 'string' && typeof haystack !== 'number') {
          return false;
        }
        if (typeof needle !== 'string' && typeof needle !== 'number') {
          return false;
        }
        return String(haystack).includes(String(needle));
      },
    );
  }
}
