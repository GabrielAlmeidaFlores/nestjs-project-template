import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';

import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityResetPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-reset-password.request.dto';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';
import { AuthIdentityResetPasswordResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-reset-password.response.dto';
import { NewPasswordMatchesCurrentError } from '@module/generic/auth-identity/error/new-password-matches-current.error';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';

@Injectable()
export class AuthIdentityResetPasswordUseCase {
  protected readonly _type = AuthIdentityResetPasswordUseCase.name;

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(EmailForgotPasswordGateway)
    private readonly emailForgotPasswordGateway: EmailForgotPasswordGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
  ) {}

  public async execute(
    dto: AuthIdentityResetPasswordRequestDto,
  ): Promise<AuthIdentityResetPasswordResponseDto> {
    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument(
        dto.email,
      );

    if (!authIdentity) {
      throw new NotFoundException('User not found');
    }
    const isSamePassword = bcrypt.compareSync(
      dto.newPassword,
      authIdentity.password.toString(),
    );
    if (isSamePassword) {
      throw new NewPasswordMatchesCurrentError();
    }

    const isValidCode =
      await this.emailForgotPasswordGateway.validateForgotPasswordCode(
        authIdentity.id,
        dto.code,
      );

    if (!isValidCode) {
      throw new UnauthorizedException('Invalid or expired code');
    }
    const authEntity = new AuthIdentityEntity({
      ...authIdentity,
      password: dto.newPassword,
    });

    const updateAuthIdentity =
      this.authIdentityCommandRepositoryGateway.updateAuthIdentity(
        authIdentity.id,
        authEntity,
      );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(updateAuthIdentity);
    await transaction.commit();

    await this.emailForgotPasswordGateway.invalidateForgotPasswordCode(
      authIdentity.id,
    );

    return AuthIdentityResetPasswordResponseDto.build({
      authIdentity: authIdentity.id,
    });
  }
}
