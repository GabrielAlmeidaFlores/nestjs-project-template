import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class LegalProceedingActionAdvogadoDetailOutputModel extends BaseBuildableObject {
  public readonly id: string;

  public readonly nome: string;

  public readonly numeroOab: string;

  public readonly ufOab: string;

  protected override readonly _type =
    LegalProceedingActionAdvogadoDetailOutputModel.name;
}

export class LegalProceedingActionAdvogadoOutputModel extends BaseBuildableObject {
  public readonly id: string;

  public readonly comunicacaoId: string;

  public readonly advogadoId: string;

  public readonly createdAt: string;

  public readonly updatedAt: string;

  public readonly advogado: LegalProceedingActionAdvogadoDetailOutputModel;

  protected override readonly _type =
    LegalProceedingActionAdvogadoOutputModel.name;
}

export class LegalProceedingActionDestinatarioOutputModel extends BaseBuildableObject {
  public readonly nome: string;

  public readonly polo: string;

  public readonly comunicacaoId: string;

  protected override readonly _type =
    LegalProceedingActionDestinatarioOutputModel.name;
}

export class LegalProceedingActionOutputModel extends BaseBuildableObject {
  public readonly id: string;

  public readonly dataDisponibilizacao: string;

  public readonly siglaTribunal: string;

  public readonly tipoComunicacao: string;

  public readonly nomeOrgao: string;

  public readonly texto: string;

  public readonly numeroProcesso: string;

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

  public readonly destinatarios: LegalProceedingActionDestinatarioOutputModel[];

  public readonly destinatarioadvogados: LegalProceedingActionAdvogadoOutputModel[];

  protected override readonly _type = LegalProceedingActionOutputModel.name;
}
