import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AjusteSalarioBeneficioInterface } from '@lib/cnis-analysis/interface/ajuste-salario-beneficio.interface';
import type { AnalisePrevidenciariaInterface } from '@lib/cnis-analysis/interface/analise-previdenciaria.interface';
import type { CarenciaInterface } from '@lib/cnis-analysis/interface/carencia.interface';
import type { ConcomitanciaInterface } from '@lib/cnis-analysis/interface/concomitancia.interface';
import type { ConsolidadoRelacaoInterface } from '@lib/cnis-analysis/interface/consolidado-relation.interface';
import type { CorrecaoMonetariaItemInterface } from '@lib/cnis-analysis/interface/correcao-monetaria-item.interface';
import type { CnisIndicadoresDePendenciaInterface } from '@lib/cnis-analysis/interface/indicadores-de-pendencia.interface';
import type { ManutencaoQualidadeSeguradoInterface } from '@lib/cnis-analysis/interface/manutencao-qualidade-segurado.interface';
import type { PedagioPosReformaInterface } from '@lib/cnis-analysis/interface/pedagio-pos-reforma.interface';
import type { PeriodoDeGracaResultadoInterface } from '@lib/cnis-analysis/interface/periodo-de-graca-resultado.interface';
import type { PessoaCnisIdadeInterface } from '@lib/cnis-analysis/interface/pessoa-cnis-idade.interface';
import type { SalarioTetoInterface } from '@lib/cnis-analysis/interface/salario-teto.interface';
import type { SalarioInterface } from '@lib/cnis-analysis/interface/salario.interface';
import type { SalariosConcomitantesInterface } from '@lib/cnis-analysis/interface/salarios-concomitantes.interface';
import type { TempoTotalComRestricoesInterface } from '@lib/cnis-analysis/interface/tempo-total-com-restricoes.interface';
import type { TempoDeContribuicaoInterface } from '@lib/cnis-analysis/interface/time-contribution.interface';

export class CnisAnalyzerOutputCompleteModel extends BaseBuildableObject {
  public idade: PessoaCnisIdadeInterface;
  public tempoDeContribuicao: TempoDeContribuicaoInterface[];
  public concomitancia: ConcomitanciaInterface[];
  public carenciaTotal: CarenciaInterface[];
  public potencialValido: string;
  public restritoValido: string;
  public duracaoTotalEmDias: number;
  public indicadoresDePendencia: CnisIndicadoresDePendenciaInterface[];
  public consolidadoResumido: ConsolidadoRelacaoInterface[];
  public indicadoresDeIncapacidade: ConsolidadoRelacaoInterface[];
  public periodoDeGraca: PeriodoDeGracaResultadoInterface;
  public dataFinalDaQualidadedeDeSegurado: ManutencaoQualidadeSeguradoInterface[];
  public calculateTempoTotalComRestricoes: TempoTotalComRestricoesInterface;
  public salariosConcomitantes: SalariosConcomitantesInterface[];
  public ajusteAoTeto: SalarioTetoInterface[];
  public correcaoMonetaria: CorrecaoMonetariaItemInterface[];
  public salarioSBPosReforma: SalarioInterface;
  public salarioSBPreReforma: SalarioInterface;
  public ajusteFinal: AjusteSalarioBeneficioInterface;
  public points: number;
  public tempoPedagio100: PedagioPosReformaInterface;
  public tempoPedagio50: PedagioPosReformaInterface;
  public aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido: AnalisePrevidenciariaInterface;
  public aposentadoriaPorIdadeUrbanaComDireitoAdquirido: AnalisePrevidenciariaInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15: AnalisePrevidenciariaInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16: AnalisePrevidenciariaInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt17: AnalisePrevidenciariaInterface;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt20: AnalisePrevidenciariaInterface;
  public aposentadoriaPorIdadeHibridaComDireitoAdquirido: AnalisePrevidenciariaInterface;
  public aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18: AnalisePrevidenciariaInterface;
  public aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18: AnalisePrevidenciariaInterface;
  public aposentadoriaProgramadaComumPrevistaNoArt19: AnalisePrevidenciariaInterface;

  protected override readonly _type = CnisAnalyzerOutputCompleteModel.name;
}
