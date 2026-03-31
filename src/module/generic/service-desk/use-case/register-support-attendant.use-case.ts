import bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { SupportAttendantCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/command/support-attendant.command.repository.gateway';
import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportAttendantEntity } from '@module/customer/service-desk/domain/schema/entity/support-attendant/support-attendant.entity';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportAttendantInviteNotFoundError } from '@module/customer/service-desk/error/support-attendant-invite-not-found.error';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SetAuthTokenCookieUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/set-auth-token-cookie.use-case-gateway';
import { RegisterSupportAttendantRequestDto } from '@module/generic/service-desk/dto/request/register-support-attendant.request.dto';
import { RegisterSupportAttendantResponseDto } from '@module/generic/service-desk/dto/response/register-support-attendant.response.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

interface InviteDataInterface {
  name: string;
  email: string;
  supportType: SupportTypeEnum;
  tempPasswordHash: string;
}

@Injectable()
export class RegisterSupportAttendantUseCase {
  protected readonly _type = RegisterSupportAttendantUseCase.name;

  public constructor(
    @Inject(SupportAttendantCommandRepositoryGateway)
    private readonly supportAttendantCommandRepositoryGateway: SupportAttendantCommandRepositoryGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(CacheStorageGateway)
    private readonly cacheStorageGateway: CacheStorageGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(SetAuthTokenCookieUseCaseGateway)
    private readonly setAuthTokenCookieUseCaseGateway: SetAuthTokenCookieUseCaseGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    dto: RegisterSupportAttendantRequestDto,
  ): Promise<RegisterSupportAttendantResponseDto> {
    const inviteData = await this.fetchAndValidateInvite(
      dto.inviteCode,
      dto.tempPassword,
    );

    const supportAttendant = this.buildSupportAttendantEntity(inviteData);
    const authIdentity = this.buildAuthIdentityEntity(
      inviteData,
      supportAttendant.id,
      dto.tempPassword,
    );

    await this.persistEntities(supportAttendant, authIdentity);
    await this.cleanupInviteKeys(dto.inviteCode, inviteData.email);

    await this.setAuthTokenCookieUseCaseGateway.execute(
      reply,
      authIdentity.id,
      UserLevelEnum.SUPPORT,
    );

    return RegisterSupportAttendantResponseDto.build({
      userLevel: UserLevelEnum.SUPPORT,
      mustChangePassword: true,
    });
  }

  private async fetchAndValidateInvite(
    inviteCode: string,
    tempPassword: string,
  ): Promise<InviteDataInterface> {
    const raw = await this.cacheStorageGateway.getData(
      this.buildInviteDataKey(inviteCode),
    );

    if (raw === null) {
      throw new SupportAttendantInviteNotFoundError();
    }

    const inviteData = JSON.parse(raw) as InviteDataInterface;
    const isValidPassword = bcrypt.compareSync(
      tempPassword,
      inviteData.tempPasswordHash,
    );

    if (!isValidPassword) {
      throw new SupportAttendantInviteNotFoundError();
    }

    return inviteData;
  }

  private buildSupportAttendantEntity(
    inviteData: InviteDataInterface,
  ): SupportAttendantEntity {
    return new SupportAttendantEntity({
      id: new SupportAttendantId(),
      name: inviteData.name,
      email: inviteData.email,
      supportType: inviteData.supportType,
      isActive: true,
    });
  }

  private buildAuthIdentityEntity(
    inviteData: InviteDataInterface,
    supportAttendantId: SupportAttendantId,
    tempPassword: string,
  ): AuthIdentityEntity {
    return new AuthIdentityEntity({
      id: new AuthIdentityId(),
      email: new Email(inviteData.email),
      federalDocument: null,
      password: tempPassword,
      supportAttendant: supportAttendantId,
      isActive: true,
      mustChangePassword: true,
    });
  }

  private async persistEntities(
    supportAttendant: SupportAttendantEntity,
    authIdentity: AuthIdentityEntity,
  ): Promise<void> {
    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.supportAttendantCommandRepositoryGateway.createSupportAttendant(
        supportAttendant,
      ),
      this.authIdentityCommandRepositoryGateway.createAuthIdentity(authIdentity),
    ]);

    await transaction.commit();
  }

  private async cleanupInviteKeys(
    inviteCode: string,
    email: string,
  ): Promise<void> {
    await this.cacheStorageGateway.deleteData(
      this.buildInviteDataKey(inviteCode),
    );

    await this.cacheStorageGateway.deleteData(this.buildInviteLockKey(email));
  }

  private buildInviteDataKey(code: string): string {
    return `supportInviteData:${code}`;
  }

  private buildInviteLockKey(email: string): string {
    return `supportInviteLock:${email}`;
  }
}
