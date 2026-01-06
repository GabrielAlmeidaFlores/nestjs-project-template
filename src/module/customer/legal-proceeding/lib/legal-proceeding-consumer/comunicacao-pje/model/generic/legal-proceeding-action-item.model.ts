import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class ComunicacaoPjeLegalProceedingActionItemDestinatarioModel extends BaseBuildableObject {
  public readonly nome: string;
  public readonly polo: string;
  public readonly comunicacao_id: string;

  protected override readonly _type =
    ComunicacaoPjeLegalProceedingActionItemDestinatarioModel.name;
}

export class ComunicacaoPjeLegalProceedingActionItemAdvogadoDetailModel extends BaseBuildableObject {
  public readonly id: string;
  public readonly nome: string;
  public readonly numero_oab: string;
  public readonly uf_oab: string;

  protected override readonly _type =
    ComunicacaoPjeLegalProceedingActionItemAdvogadoDetailModel.name;
}

export class ComunicacaoPjeLegalProceedingActionItemAdvogadoModel extends BaseBuildableObject {
  public readonly id: string;
  public readonly comunicacao_id: string;
  public readonly advogado_id: string;
  public readonly created_at: string;
  public readonly updated_at: string;
  public readonly advogado: ComunicacaoPjeLegalProceedingActionItemAdvogadoDetailModel;

  protected override readonly _type =
    ComunicacaoPjeLegalProceedingActionItemAdvogadoModel.name;
}

export class ComunicacaoPjeLegalProceedingActionItemModel extends BaseBuildableObject {
  public readonly id: string;
  public readonly data_disponibilizacao: string;
  public readonly siglaTribunal: string;
  public readonly tipoComunicacao: string;
  public readonly nomeOrgao: string;
  public readonly texto: string;
  public readonly numero_processo: string;
  public readonly meio: string;
  public readonly link: string;
  public readonly tipoDocumento: string;
  public readonly nomeClasse: string;
  public readonly codigoClasse: string;
  public readonly numeroComunicacao: string;
  public readonly ativo: string;
  public readonly hash: string;
  public readonly datadisponibilizacao: string;
  public readonly meiocompleto: string;
  public readonly numeroprocessocommascara: string;
  public readonly destinatarios: ComunicacaoPjeLegalProceedingActionItemDestinatarioModel[];
  public readonly destinatarioadvogados: ComunicacaoPjeLegalProceedingActionItemAdvogadoModel[];

  protected override readonly _type =
    ComunicacaoPjeLegalProceedingActionItemModel.name;
}
