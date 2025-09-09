import type { AuthenticatorCredentialsOutputModel } from '@lib/authenticator/implementation/speakeasy/output/authenticator-credentials.output.model';

export abstract class AuthenticatorGateway {
  public abstract verifyCode(secret: string, token: string): boolean;

  public abstract generateCredentials(
    username: string,
  ): Promise<AuthenticatorCredentialsOutputModel>;
}
