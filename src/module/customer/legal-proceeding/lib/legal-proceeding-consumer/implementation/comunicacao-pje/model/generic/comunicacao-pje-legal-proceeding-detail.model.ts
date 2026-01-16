import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class ComunicacaoPjeLegalProceedingDetailDataItemModel extends BaseBuildableObject {
  public destinatarios?: object[];
  public destinatarioadvogados?: object[];

  protected override readonly _type =
    ComunicacaoPjeLegalProceedingDetailDataItemModel.name;
}

export class ComunicacaoPjeLegalProceedingDetailDataModel extends BaseBuildableObject {
  public items?: ComunicacaoPjeLegalProceedingDetailDataItemModel[];

  protected override readonly _type =
    ComunicacaoPjeLegalProceedingDetailDataModel.name;
}

export class ComunicacaoPjeLegalProceedingDetailModel extends BaseBuildableObject {
  public data?: ComunicacaoPjeLegalProceedingDetailDataModel;

  protected override readonly _type =
    ComunicacaoPjeLegalProceedingDetailModel.name;
}
