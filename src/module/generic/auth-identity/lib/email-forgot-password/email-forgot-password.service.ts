import { Inject, Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.iput.model';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';
import { EmailApplicationVariable } from '@shared/system/constant/application-variable/source/email.application-variable';

@Injectable()
export class EmailForgotPasswordService implements EmailForgotPasswordGateway {
  protected readonly _type = EmailForgotPasswordService.name;

  public constructor(
    @Inject(CacheStorageGateway)
    private readonly cacheStorageGateway: CacheStorageGateway,
    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,
  ) {}

  public async generatePersistAndSendForgotPasswordCode(
    authIdentity: AuthIdentityId,
    authIdentityName: string,
    authIdentityEmail: Email,
  ): Promise<void> {
    const code = this.generateCode();
    const cacheStorageKey =
      this.generateForgotPasswordCodeKeyForCacheStorage(authIdentity);

    const fiveMinutesInMS = 300;
    await this.cacheStorageGateway.setData(
      cacheStorageKey,
      code,
      fiveMinutesInMS,
    );

    await this.emailGateway.sendHTMLEmail(
      SendHTMLEmailInputModel.build({
        emailTemplateName:
          EmailApplicationVariable.EMAIL_FORGOT_PASSWORD_CODE_TEMPLATE,
        subject: EmailApplicationVariable.EMAIL_FORGOT_PASSWORD_CODE_SUBJECT,
        to: authIdentityEmail.toString(),
        emailTemplateParameters: {
          code,
          name: authIdentityName,
        },
      }),
    );
  }

  public async validateForgotPasswordCode(
    authIdentity: AuthIdentityId,
    code: string,
  ): Promise<boolean> {
    const cacheStorageKey =
      this.generateForgotPasswordCodeKeyForCacheStorage(authIdentity);
    const persistedCode =
      await this.cacheStorageGateway.getData(cacheStorageKey);

    if (persistedCode === null) {
      return false;
    }

    return persistedCode === code;
  }

  public async invalidateForgotPasswordCode(
    authIdentity: AuthIdentityId,
  ): Promise<void> {
    const cacheStorageKey =
      this.generateForgotPasswordCodeKeyForCacheStorage(authIdentity);

    await this.cacheStorageGateway.deleteData(cacheStorageKey);
  }

  private generateCode(): string {
    const LENGTH = 6;
    const BASE = 10;
    const MAX_EXCLUSIVE = BASE ** LENGTH;

    const n = Math.floor(Math.random() * MAX_EXCLUSIVE);
    return n.toString().padStart(LENGTH, '0');
  }

  private generateForgotPasswordCodeKeyForCacheStorage(
    authIdentity: AuthIdentityId,
  ): string {
    return `forgot-password-code:${authIdentity.toString()}`;
  }
}
