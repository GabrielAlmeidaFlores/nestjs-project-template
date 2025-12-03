import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AjusteFinalInterface } from '@lib/cnis-analysis/interface/ajuste-final.interface';
import type { AnalyzerServiceInterface } from '@lib/cnis-analysis/interface/analysis.interface';
import type { CarenciaInterface } from '@lib/cnis-analysis/interface/carencia.interface';
import type { ConcomitanciaInterface } from '@lib/cnis-analysis/interface/concomitancia.interface';
import type { ConsolidadoRelationInterface } from '@lib/cnis-analysis/interface/consolidado-relation.interface';
import type { CorrecaoMonetariaItemInterface } from '@lib/cnis-analysis/interface/correcao-monetaria.interface';
import type { PessoaCnisIdadeInterface } from '@lib/cnis-analysis/interface/idade.interface';
import type { CnisIndicadoresDePendenciaInterface } from '@lib/cnis-analysis/interface/indicadores-de-pendencia.interface';
import type { ManutencaoInterface } from '@lib/cnis-analysis/interface/manutencao.interface';
import type { PedagioPosReformaInterface } from '@lib/cnis-analysis/interface/pedagio.interface';
import type { PeriodoDeGracaResultInterface } from '@lib/cnis-analysis/interface/periodo-de-graca-result.interface';
import type { SalariosConcomitantesInterface } from '@lib/cnis-analysis/interface/salario-concomitante.interface';
import type { SalarioInterface } from '@lib/cnis-analysis/interface/salario.interface';
import type { TempoTotalComRestricoesInterface } from '@lib/cnis-analysis/interface/tempo-total-com-restricoes.interface';
import type { SalarioTetoInterface } from '@lib/cnis-analysis/interface/teto.interface';
import type { TimeContributionInterface } from '@lib/cnis-analysis/interface/time-contribution.interface';

export class CnisAnalyzerOutputCompleteModel extends BaseBuildableObject {
  public idade: PessoaCnisIdadeInterface;
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
  public ajusteAoTeto: SalarioTetoInterface[];
  public correcaoMonetaria: CorrecaoMonetariaItemInterface[];
  public salarioSBPosReforma: SalarioInterface;
  public salarioSBPreReforma: SalarioInterface;
  public ajusteFinal: AjusteFinalInterface;
  public points: number;
  public tempoPedagio100: PedagioPosReformaInterface;
  public tempoPedagio50: PedagioPosReformaInterface;
  public aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido: AnalyzerServiceInterface;
  public aposentadoriaPorIdadeUrbanaComDireitoAdquirido: AnalyzerServiceInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15: AnalyzerServiceInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16: AnalyzerServiceInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt17: AnalyzerServiceInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt20: AnalyzerServiceInterface;
  public aposentadoriaPorIdadeHibridaComDireitoAdquirido: AnalyzerServiceInterface;
  public aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18: AnalyzerServiceInterface;
  public aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18: AnalyzerServiceInterface;
  public aposentadoriaProgramadaComumPrevistaNoArt19: AnalyzerServiceInterface;

  protected override readonly _type = CnisAnalyzerOutputCompleteModel.name;
}
