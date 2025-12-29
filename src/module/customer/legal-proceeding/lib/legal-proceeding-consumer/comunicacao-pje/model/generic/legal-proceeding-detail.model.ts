import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class LegalProceedingDetailModel extends BaseBuildableObject {
  public data?: {
    items?: Array<{
      destinatarios?: object[];
      destinatarioadvogados?: object[];
    }>;
  };

  protected override readonly _type = LegalProceedingDetailModel.name;
}
