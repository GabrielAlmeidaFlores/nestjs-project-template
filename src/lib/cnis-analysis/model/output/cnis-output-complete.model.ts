import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CarenciaInterface } from '@lib/cnis-analysis/dto/carencia';
import type { ManutencaoInterface } from '@lib/cnis-analysis/dto/manutencao';

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

  protected override readonly _type = CnisOutputCompleteModel.name;
}
