import { randomBytes, randomInt } from 'node:crypto';

import bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';

import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.input.model';
import { InviteSupportAttendantRequestDto } from '@module/admin/service-desk/dto/request/invite-support-attendant.request.dto';
import { InviteSupportAttendantResponseDto } from '@module/admin/service-desk/dto/response/invite-support-attendant.response.dto';
import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportAttendantAlreadyExistsError } from '@module/customer/service-desk/error/support-attendant-already-exists.error';
import { SupportAttendantInviteResendTooSoonError } from '@module/customer/service-desk/error/support-attendant-invite-resend-too-soon.error';
import { EmailApplicationVariable } from '@shared/system/constant/application-variable/source/email.application-variable';

interface InviteDataInterface {
  name: string;
  email: string;
  supportType: SupportTypeEnum;
  tempPasswordHash: string;
}

@Injectable()
export class InviteNewSupportAttendantUseCase {
  protected readonly _type = InviteNewSupportAttendantUseCase.name;

  private readonly INVITE_TTL_SECONDS = 172800;

  private readonly RESEND_COOLDOWN_SECONDS = 60;

  private readonly TEMP_PASSWORD_CHARSET =
    'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';

  private readonly TEMP_PASSWORD_LENGTH = 12;

  private readonly BCRYPT_ROUNDS = 10;

  private readonly SUPPORT_TYPE_LABEL: Record<SupportTypeEnum, string> = {
    [SupportTypeEnum.TECHNICAL]: 'técnico',
    [SupportTypeEnum.LEGAL]: 'jurídico',
  };

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(CacheStorageGateway)
    private readonly cacheStorageGateway: CacheStorageGateway,
    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,
  ) {}

  public async execute(
    dto: InviteSupportAttendantRequestDto,
  ): Promise<InviteSupportAttendantResponseDto> {
    await this.assertAttendantNotAlreadyRegistered(dto.email);

    const existingCode = await this.getExistingInviteCode(dto.email);

    if (existingCode !== null) {
      await this.assertResendCooldownNotActive(dto.email);
      await this.cacheStorageGateway.deleteData(
        this.buildInviteDataKey(existingCode),
      );
    }

    const temporaryPassword = this.generateTemporaryPassword();
    const tempPasswordHash = await bcrypt.hash(
      temporaryPassword,
      this.BCRYPT_ROUNDS,
    );
    const code = this.generateCode();

    await this.persistInviteData(code, dto, tempPasswordHash);

    if (existingCode !== null) {
      await this.setResendCooldown(dto.email);
    }

    await this.sendInviteEmail(code, dto, temporaryPassword);

    return InviteSupportAttendantResponseDto.build({ inviteCode: code });
  }

  private async assertAttendantNotAlreadyRegistered(
    email: string,
  ): Promise<void> {
    const existing =
      await this.supportAttendantQueryRepositoryGateway.findOneSupportAttendantByEmail(
        email,
      );

    if (existing) {
      throw new SupportAttendantAlreadyExistsError();
    }
  }

  private async getExistingInviteCode(email: string): Promise<string | null> {
    return this.cacheStorageGateway.getData(this.buildInviteLockKey(email));
  }

  private async assertResendCooldownNotActive(email: string): Promise<void> {
    const cooldown = await this.cacheStorageGateway.getData(
      this.buildResendCooldownKey(email),
    );

    if (cooldown !== null) {
      throw new SupportAttendantInviteResendTooSoonError();
    }
  }

  private async setResendCooldown(email: string): Promise<void> {
    await this.cacheStorageGateway.setData(
      this.buildResendCooldownKey(email),
      '1',
      this.RESEND_COOLDOWN_SECONDS,
    );
  }

  private async persistInviteData(
    code: string,
    dto: InviteSupportAttendantRequestDto,
    tempPasswordHash: string,
  ): Promise<void> {
    const inviteData: InviteDataInterface = {
      name: dto.name,
      email: dto.email,
      supportType: dto.supportType,
      tempPasswordHash,
    };

    await this.cacheStorageGateway.setData(
      this.buildInviteDataKey(code),
      JSON.stringify(inviteData),
      this.INVITE_TTL_SECONDS,
    );

    await this.cacheStorageGateway.setData(
      this.buildInviteLockKey(dto.email),
      code,
      this.INVITE_TTL_SECONDS,
    );
  }

  private async sendInviteEmail(
    code: string,
    dto: InviteSupportAttendantRequestDto,
    temporaryPassword: string,
  ): Promise<void> {
    const activationUrl = `${EmailApplicationVariable.APP_FRONTEND_URL}/suporte/ativar?code=${code}`;
    const tipoSuporte = this.SUPPORT_TYPE_LABEL[dto.supportType];

    await this.emailGateway.sendHTMLEmail(
      SendHTMLEmailInputModel.build({
        emailTemplateName:
          EmailApplicationVariable.EMAIL_SUPPORT_INVITE_TEMPLATE,
        subject: EmailApplicationVariable.EMAIL_SUPPORT_INVITE_SUBJECT,
        to: dto.email,
        emailTemplateParameters: {
          nome: dto.name,
          tipoSuporte,
          senha: temporaryPassword,
          activationUrl,
        },
      }),
    );
  }

  private generateTemporaryPassword(): string {
    const charset = this.TEMP_PASSWORD_CHARSET;
    let password = '';

    for (let i = 0; i < this.TEMP_PASSWORD_LENGTH; i++) {
      password += charset[randomInt(charset.length)];
    }

    return password;
  }

  private generateCode(): string {
    return randomBytes(32).toString('hex');
  }

  private buildInviteDataKey(code: string): string {
    return `supportInviteData:${code}`;
  }

  private buildInviteLockKey(email: string): string {
    return `supportInviteLock:${email}`;
  }

  private buildResendCooldownKey(email: string): string {
    return `supportInviteResendCooldown:${email}`;
  }
}
