import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class AuthenticatorCredentialsOutputModel extends BaseBuildableObject {
  public readonly secret: string;
  public readonly base32: string;
  public readonly qrCode: string;
  public readonly otpauth_url: string;

  protected override readonly _type = AuthenticatorCredentialsOutputModel.name;
}
