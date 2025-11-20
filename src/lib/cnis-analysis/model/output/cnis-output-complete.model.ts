import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CarenciaInterface } from '@lib/cnis-analysis/dto/carencia';
import type { CorrecaoMonetariaItemInterface } from '@lib/cnis-analysis/dto/correcao-monetaria';
import type { ManutencaoInterface } from '@lib/cnis-analysis/dto/manutencao';
import type { PedagioInterface } from '@lib/cnis-analysis/dto/pedagio';
import type { SalarioInterface } from '@lib/cnis-analysis/dto/salario';
import type { SalariosConcomitantesInterface } from '@lib/cnis-analysis/dto/salario-concomitante';
import type { TetoInterface } from '@lib/cnis-analysis/dto/teto';

export class CnisOutputCompleteModel extends BaseBuildableObject {
  public idade: object;
  public tempoDeContribuicao: object;
  public concomitancia: object;
  public carenciaTotal: CarenciaInterface[];
  public potencialValido: string;
  public restritoValido: string;
  public duracaoTotalEmDias: number;
  public indicadoresDePendencia: object[];
  public consolidadoResumido: object[];
  public indicadoresDeIncapacidade: object[];
  public periodoDeGraca: object;
  public dataFinalDaQualidadedeDeSegurado: ManutencaoInterface[];
  public calculateTempoTotalComRestricoes: object;
  public salariosConcomitantes: SalariosConcomitantesInterface[];
  public ajusteAoTeto: TetoInterface[];
  public correcaoMonetaria: CorrecaoMonetariaItemInterface[];
  public salarioSBPosReforma: SalarioInterface;
  public salarioSBPreReforma: SalarioInterface;
  public ajusteFinal: object;
  public points: object;
  public tempoPedagio100: PedagioInterface;
  public tempoPedagio50: PedagioInterface;
  public aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido: object;
  public aposentadoriaPorIdadeUrbanaComDireitoAdquirido: object;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15: object;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16: object;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt17: object;
  public aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt20: object;
  public aposentadoriaPorIdadeHibridaComDireitoAdquirido: object;
  public aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18: object;
  public aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18: object;

  protected override readonly _type = CnisOutputCompleteModel.name;
}
