import { Inject, Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.iput.model';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { EmailMFAGateway } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.gateway';
import { EmailApplicationVariable } from '@shared/system/constant/application-variable/source/email.application-variable';

@Injectable()
export class EmailMFAService implements EmailMFAGateway {
  protected readonly _type = EmailMFAService.name;

  public constructor(
    @Inject(CacheStorageGateway)
    private readonly cacheStorageGateway: CacheStorageGateway,
    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,
  ) {}

  public async generatePersistAndSendSignInCode(
    authIdentity: AuthIdentityId,
    authIdentityEmail: Email,
  ): Promise<void> {
    const code = this.generateCode();
    const cacheStorageKey =
      this.generateSignInVerificationCodeKeyForCacheStorage(authIdentity);

    const threeMinutesInMS = 1080;
    await this.cacheStorageGateway.setData(
      cacheStorageKey,
      code,
      threeMinutesInMS,
    );

    await this.emailGateway.sendHTMLEmail(
      SendHTMLEmailInputModel.build({
        emailTemplateName:
          EmailApplicationVariable.EMAIL_SIGN_IN_VERIFICATION_CODE_TEMPLATE,
        subject:
          EmailApplicationVariable.EMAIL_SIGN_IN_VERIFICATION_CODE_SUBJECT,
        to: authIdentityEmail.toString(),
        emailTemplateParameters: {
          code,
        },
      }),
    );
  }

  public async validateSignInCode(
    authIdentity: AuthIdentityId,
    code: string,
  ): Promise<boolean> {
    const cacheStorageKey =
      this.generateSignInVerificationCodeKeyForCacheStorage(authIdentity);
    const persitedCode =
      await this.cacheStorageGateway.getData(cacheStorageKey);

    if (persitedCode === null) {
      return false;
    }

    return persitedCode === code;
  }

  private generateCode(): string {
    const LENGTH = 6;
    const BASE = 10;
    const MAX_EXCLUSIVE = BASE ** LENGTH;

    const n = Math.floor(Math.random() * MAX_EXCLUSIVE);
    return n.toString().padStart(LENGTH, '0');
  }

  private generateSignInVerificationCodeKeyForCacheStorage(
    authIdentity: AuthIdentityId,
  ): string {
    return `sign-in-verification-code:${authIdentity.toString()}`;
  }
}
