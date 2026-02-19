import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';

import { CnisAnalysisResultModel } from '@lib/cnis-analyzer/model/generic/cnis-analysis-result.model';

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
    };
    return template(context);
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
  }
}
