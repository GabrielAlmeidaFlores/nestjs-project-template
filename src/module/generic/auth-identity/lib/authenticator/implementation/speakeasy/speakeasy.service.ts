import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';
import * as speakeasy from 'speakeasy';

import { AuthenticatorGateway } from '@module/generic/auth-identity/lib/authenticator/authenticator.gateway';
import { AuthenticatorCredentialsOutputModel } from '@module/generic/auth-identity/lib/authenticator/model/output/authenticator-credentials.output.model';
import { AuthenticatorApplicationVariable } from '@shared/system/constant/application-variable/source/authenticator.application-variable';

@Injectable()
export class SpeakeasyService implements AuthenticatorGateway {
  protected readonly _type = SpeakeasyService.name;

  public verifyCode(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      token,
      encoding: 'ascii',
    });
  }

  public async generateCredentials(
    username: string,
  ): Promise<AuthenticatorCredentialsOutputModel> {
    const credentials = speakeasy.generateSecret({
      name: `${AuthenticatorApplicationVariable.AUTHENTICATOR_APP_NAME}: ${username}`,
      issuer: AuthenticatorApplicationVariable.AUTHENTICATOR_APP_NAME,
      length: 20,
    });

    const otpauth_url = credentials.otpauth_url ?? '';

    const qrCode = await qrcode.toDataURL(otpauth_url, {
      errorCorrectionLevel: 'H',
    });

    return AuthenticatorCredentialsOutputModel.build({
      qrCode,
      otpauth_url,
      secret: credentials.ascii,
      base32: credentials.base32,
    });
  }
}
