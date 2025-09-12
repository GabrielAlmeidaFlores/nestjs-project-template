import type { AuthenticatorCredentialsOutputModel } from '@module/generic/auth-identity/lib/authenticator/model/output/authenticator-credentials.output.model';

export abstract class AuthenticatorGateway {
  public abstract verifyCode(secret: string, token: string): boolean;

  public abstract generateCredentials(
    username: string,
  ): Promise<AuthenticatorCredentialsOutputModel>;
}
