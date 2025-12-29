import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { LegalProceedingDetailItemStatusEnum } from '@module/customer/legal-proceeding/domain/schema/enum/legal-proceeding-detail-item-status.enum';

export class LegalProceedingDetailItemModel extends BaseBuildableObject {
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
  public readonly status: LegalProceedingDetailItemStatusEnum;
  public readonly datadisponibilizacao: string;
  public readonly meiocompleto: string;
  public readonly numeroprocessocommascara: string;
  protected override readonly _type = LegalProceedingDetailItemModel.name;
}

export class LegalProceedingDetailDataItemModel extends BaseBuildableObject {
  public readonly status: string;
  public readonly message: string;
  public readonly count: number;
  public readonly items: LegalProceedingDetailItemModel[];
  protected override readonly _type = LegalProceedingDetailDataItemModel.name;
}

export class LegalProceedingDetailDataModel extends BaseBuildableObject {
  public readonly ok: boolean;
  public readonly data: LegalProceedingDetailDataItemModel;
  protected override readonly _type = LegalProceedingDetailDataModel.name;
}
