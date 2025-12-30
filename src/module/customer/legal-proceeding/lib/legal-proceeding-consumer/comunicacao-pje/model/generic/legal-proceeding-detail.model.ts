import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class LegalProceedingDetailDataItemModel extends BaseBuildableObject {
  public destinatarios?: object[];
  public destinatarioadvogados?: object[];

  protected override readonly _type = LegalProceedingDetailDataItemModel.name;
}

export class LegalProceedingDetailDataModel extends BaseBuildableObject {
  public items?: LegalProceedingDetailDataItemModel[];

  protected override readonly _type = LegalProceedingDetailDataModel.name;
}

export class LegalProceedingDetailModel extends BaseBuildableObject {
  public data?: LegalProceedingDetailDataModel;

  protected override readonly _type = LegalProceedingDetailModel.name;
}
