import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class CreateBillingOutputModel extends BaseBuildableObject {
  public readonly id: string;
  public readonly pixQrCode?: string;
  public readonly pixCopyPaste?: string;

  protected override readonly _type = CreateBillingOutputModel.name;
}
