import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { ComunicacaoPjeLegalProceedingDetailItemStatusEnum } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/implementation/comunicacao-pje/enum/comunicacao-pje-legal-proceeding-detail-item-status.enum';

export class ComunicacaoPjeLegalProceedingDetailItemModel extends BaseBuildableObject {
  public readonly id: number;
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
  public readonly numeroComunicacao: number;
  public readonly ativo: boolean;
  public readonly hash: string;
  public readonly status: ComunicacaoPjeLegalProceedingDetailItemStatusEnum;
  public readonly datadisponibilizacao: string;
  public readonly meiocompleto: string;
  public readonly numeroprocessocommascara: string;
  public readonly destinatarios?: unknown[];
  public readonly destinatarioadvogados?: unknown[];
  protected override readonly _type =
    ComunicacaoPjeLegalProceedingDetailItemModel.name;
}

export class ComunicacaoPjeLegalProceedingDetailDataItemModel extends BaseBuildableObject {
  public readonly status: string | null;
  public readonly message: string;
  public readonly count: number;
  public readonly items: ComunicacaoPjeLegalProceedingDetailItemModel[];
  protected override readonly _type =
    ComunicacaoPjeLegalProceedingDetailDataItemModel.name;
}

export class ComunicacaoPjeLegalProceedingDetailDataModel extends BaseBuildableObject {
  public readonly ok: boolean;
  public readonly data: ComunicacaoPjeLegalProceedingDetailDataItemModel;
  protected override readonly _type =
    ComunicacaoPjeLegalProceedingDetailDataModel.name;
}
