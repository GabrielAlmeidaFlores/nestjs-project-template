import { randomBytes } from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';

import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.input.model';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { EmailOrganizationInviteGateway } from '@module/customer/account/lib/email-organization-invite/email-organization-invite.gateway';
import { OrganizationInviteDataModel } from '@module/customer/account/lib/email-organization-invite/model/generic/organization-invite-data.model';
import { EmailApplicationVariable } from '@shared/system/constant/application-variable/source/email.application-variable';

@Injectable()
export class EmailOrganizationInviteService implements EmailOrganizationInviteGateway {
  protected readonly _type = EmailOrganizationInviteService.name;

  private readonly INVITE_CODE_TTL_SECONDS: number;
  private readonly INVITE_CODE_LENGTH: number;
  private readonly INVITE_CODE_CHARS: string;

  public constructor(
    @Inject(CacheStorageGateway)
    private readonly cacheStorageGateway: CacheStorageGateway,
    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,
  ) {
    this.INVITE_CODE_TTL_SECONDS = 172800;
    this.INVITE_CODE_LENGTH = 6;
    this.INVITE_CODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  }

  public async generatePersistAndSendInviteCode(
    organizationId: string,
    organizationName: string,
    invitedEmail: string,
    invitedName: string,
  ): Promise<string> {
    const code = this.generateCode();
    const dataKey = this.buildInviteDataKey(code);
    const lockKey = this.buildInviteLockKey(organizationId, invitedEmail);

    const inviteData = JSON.stringify({
      organizationId,
      invitedEmail,
      invitedName,
    });

    await this.cacheStorageGateway.setData(
      dataKey,
      inviteData,
      this.INVITE_CODE_TTL_SECONDS,
    );

    await this.cacheStorageGateway.setData(
      lockKey,
      '1',
      this.INVITE_CODE_TTL_SECONDS,
    );

    await this.emailGateway.sendHTMLEmail(
      SendHTMLEmailInputModel.build({
        emailTemplateName:
          EmailApplicationVariable.EMAIL_ORGANIZATION_INVITE_TEMPLATE,
        subject: EmailApplicationVariable.EMAIL_ORGANIZATION_INVITE_SUBJECT,
        to: invitedEmail,
        emailTemplateParameters: {
          nome: invitedName,
          'nome-da-organização': organizationName,
          code,
          firstAccessUrl: `${EmailApplicationVariable.APP_FRONTEND_URL}/primeiro-acesso?code=${code}`,
        },
      }),
    );

    return code;
  }

  public async getInviteData(
    code: string,
  ): Promise<OrganizationInviteDataModel | null> {
    const dataKey = this.buildInviteDataKey(code);
    const raw = await this.cacheStorageGateway.getData(dataKey);

    if (typeof raw !== 'string' || raw.length === 0) {
      return null;
    }

    const parsed = JSON.parse(raw) as {
      organizationId: string;
      invitedEmail: string;
      invitedName: string;
    };

    return new OrganizationInviteDataModel({
      organizationId: new OrganizationId(parsed.organizationId),
      invitedEmail: parsed.invitedEmail,
      invitedName: parsed.invitedName,
    });
  }

  public async deleteInviteData(code: string): Promise<void> {
    const dataKey = this.buildInviteDataKey(code);
    await this.cacheStorageGateway.deleteData(dataKey);
  }

  private generateCode(): string {
    const bytes = randomBytes(this.INVITE_CODE_LENGTH);
    let result = '';
    for (let i = 0; i < this.INVITE_CODE_LENGTH; i++) {
      result +=
        this.INVITE_CODE_CHARS[
          bytes.readUInt8(i) % this.INVITE_CODE_CHARS.length
        ];
    }
    return result;
  }

  private buildInviteDataKey(code: string): string {
    return `org-invite:${code}`;
  }

  private buildInviteLockKey(organizationId: string, email: string): string {
    return `org-invite-lock:${organizationId}:${email}`;
  }
}
