import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AjusteFinalInterface } from '@lib/cnis-analysis/interface/ajuste-final.interface';
import type { AnalysisServiceInterface } from '@lib/cnis-analysis/interface/analysis.interface';
import type { CarenciaInterface } from '@lib/cnis-analysis/interface/carencia.interface';
import type { ConcomitanciaInterface } from '@lib/cnis-analysis/interface/concomitancia.interface';
import type { ConsolidadoRelationInterface } from '@lib/cnis-analysis/interface/consolidado-relation.interface';
import type { CorrecaoMonetariaItemInterface } from '@lib/cnis-analysis/interface/correcao-monetaria.interface';
import type { IdadeInterface } from '@lib/cnis-analysis/interface/idade.interface';
import type { CnisIndicadoresDePendenciaInterface } from '@lib/cnis-analysis/interface/indicadores-de-pendencia.interface';
import type { ManutencaoInterface } from '@lib/cnis-analysis/interface/manutencao.interface';
import type { PedagioInterface } from '@lib/cnis-analysis/interface/pedagio.interface';
import type { PeriodoDeGracaResultInterface } from '@lib/cnis-analysis/interface/periodo-de-graca-result.interface';
import type { SalariosConcomitantesInterface } from '@lib/cnis-analysis/interface/salario-concomitante.interface';
import type { SalarioInterface } from '@lib/cnis-analysis/interface/salario.interface';
import type { TempoTotalComRestricoesInterface } from '@lib/cnis-analysis/interface/tempo-total-com-restricoes.interface';
import type { TetoInterface } from '@lib/cnis-analysis/interface/teto.interface';
import type { TimeContributionInterface } from '@lib/cnis-analysis/interface/time-contribution.interface';

export class CnisOutputCompleteModel extends BaseBuildableObject {
  public idade: IdadeInterface;
  public tempoDeContribuicao: TimeContributionInterface[];
  public concomitancia: ConcomitanciaInterface[];
  public carenciaTotal: CarenciaInterface[];
  public potencialValido: string;
  public restritoValido: string;
  public duracaoTotalEmDias: number;
  public indicadoresDePendencia: CnisIndicadoresDePendenciaInterface[];
  public consolidadoResumido: ConsolidadoRelationInterface[];
  public indicadoresDeIncapacidade: ConsolidadoRelationInterface[];
  public periodoDeGraca: PeriodoDeGracaResultInterface;
  public dataFinalDaQualidadedeDeSegurado: ManutencaoInterface[];
  public calculateTempoTotalComRestricoes: TempoTotalComRestricoesInterface;
  public salariosConcomitantes: SalariosConcomitantesInterface[];
  public ajusteAoTeto: TetoInterface[];
  public correcaoMonetaria: CorrecaoMonetariaItemInterface[];
  public salarioSBPosReforma: SalarioInterface;
  public salarioSBPreReforma: SalarioInterface;
  public ajusteFinal: AjusteFinalInterface;
  public points: number;
  public tempoPedagio100: PedagioInterface;
  public tempoPedagio50: PedagioInterface;
  public aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido: AnalysisServiceInterface;
  public aposentadoriaPorIdadeUrbanaComDireitoAdquirido: AnalysisServiceInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15: AnalysisServiceInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16: AnalysisServiceInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt17: AnalysisServiceInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt20: AnalysisServiceInterface;
  public aposentadoriaPorIdadeHibridaComDireitoAdquirido: AnalysisServiceInterface;
  public aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18: AnalysisServiceInterface;
  public aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18: AnalysisServiceInterface;
  public aposentadoriaProgramadaComumPrevistaNoArt19: AnalysisServiceInterface;

  protected override readonly _type = CnisOutputCompleteModel.name;
}
