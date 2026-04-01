import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.input.model';
import { CreateSupportAttendantRequestDto } from '@module/admin/support-attendant/dto/request/create-support-attendant.request.dto';
import { CreateSupportAttendantResponseDto } from '@module/admin/support-attendant/dto/response/create-support-attendant.response.dto';
import { SupportAttendantEmailAlreadyExistsError } from '@module/admin/support-attendant/error/support-attendant-email-already-exists.error';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SupportAttendantCommandRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/command/support-attendant.command.repository.gateway';
import { SupportAttendantEntity } from '@module/support/account/domain/schema/entity/support-attendant/support-attendant.entity';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { EmailApplicationVariable } from '@shared/system/constant/application-variable/source/email.application-variable';
import { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

@Injectable()
export class CreateSupportAttendantUseCase {
  protected readonly _type = CreateSupportAttendantUseCase.name;

  public constructor(
    @Inject(SupportAttendantCommandRepositoryGateway)
    private readonly supportAttendantCommandRepository: SupportAttendantCommandRepositoryGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepository: AuthIdentityCommandRepositoryGateway,
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepository: AuthIdentityQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepository: BaseTransactionRepositoryGateway,
    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,
  ) {}

  public async execute(
    dto: CreateSupportAttendantRequestDto,
  ): Promise<CreateSupportAttendantResponseDto> {
    await this.validateEmailNotInUse(dto.email);

    const password = this.generatePassword();
    const supportAttendantId = new SupportAttendantId();
    const authIdentityId = new AuthIdentityId();

    const supportAttendant = new SupportAttendantEntity({
      id: supportAttendantId,
      name: dto.name,
      email: dto.email.toString(),
      supportType: dto.supportType,
      isActive: true,
    });

    const authIdentity = new AuthIdentityEntity({
      id: authIdentityId,
      email: dto.email,
      federalDocument: dto.federalDocument,
      password,
      supportAttendant: supportAttendantId,
      isActive: true,
    });

    const transaction = await this.baseTransactionRepository.execute([
      this.supportAttendantCommandRepository.createSupportAttendant(
        supportAttendant,
      ),
      this.authIdentityCommandRepository.createAuthIdentity(authIdentity),
    ]);
    await transaction.commit();

    await this.sendInviteEmail(dto, password);

    return CreateSupportAttendantResponseDto.build({
      id: supportAttendantId.toString(),
      name: dto.name,
      email: dto.email,
      supportType: dto.supportType,
    });
  }

  private async validateEmailNotInUse(email: Email): Promise<void> {
    const existing =
      await this.authIdentityQueryRepository.findOneAuthIdentityByEmailOrFederalDocument(
        email,
      );

    if (existing) {
      throw new SupportAttendantEmailAlreadyExistsError();
    }
  }

  private async sendInviteEmail(
    dto: CreateSupportAttendantRequestDto,
    password: string,
  ): Promise<void> {
    const supportTypeLabel =
      dto.supportType === SupportTypeEnum.TECHNICAL ? 'Técnico' : 'Jurídico';

    await this.emailGateway.sendHTMLEmail(
      SendHTMLEmailInputModel.build({
        emailTemplateName:
          EmailApplicationVariable.EMAIL_SUPPORT_ATTENDANT_INVITE_TEMPLATE,
        subject:
          EmailApplicationVariable.EMAIL_SUPPORT_ATTENDANT_INVITE_SUBJECT,
        to: dto.email.toString(),
        emailTemplateParameters: {
          nome: dto.name,
          'tipo-suporte': supportTypeLabel,
          email: dto.email.toString(),
          senha: password,
          loginUrl: EmailApplicationVariable.APP_FRONTEND_URL,
        },
      }),
    );
  }

  private generatePassword(): string {
    const upper = 'ABCDEFGHJKMNPQRSTUVWXYZ';
    const lower = 'abcdefghjkmnpqrstuvwxyz';
    const digits = '23456789';
    const special = '@#$!';
    const all = upper + lower + digits + special;

    const pick = (chars: string): string =>
      chars.charAt(Math.floor(Math.random() * chars.length));

    const required = [pick(upper), pick(lower), pick(digits), pick(special)];
    const remaining = Array.from({ length: 8 }, () => pick(all));

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return [...required, ...remaining].sort(() => Math.random() - 0.5).join('');
  }
}
