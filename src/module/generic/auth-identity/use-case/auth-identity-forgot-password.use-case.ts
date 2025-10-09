import { Inject, Injectable } from '@nestjs/common';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityForgotPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password.request.dto';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { AuthIdentityForgotPasswordResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-forgot-password.response.dto';

@Injectable()
export class AuthIdentityForgotPasswordUseCase {
  protected readonly _type = AuthIdentityForgotPasswordUseCase.name;

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(EmailForgotPasswordGateway)
    private readonly emailForgotPassword: EmailForgotPasswordGateway,
  ) {}

  public async execute(
    dto: AuthIdentityForgotPasswordRequestDto,
  ): Promise<AuthIdentityForgotPasswordResponseDto> {
    const email = dto.email;

    if (!email) {
      throw new WrongSignInCredentialsError();
    }

    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument(
        email,
      );

    if (!authIdentity) {
      throw new WrongSignInCredentialsError();
    }

    await this.emailForgotPassword.generatePersistAndSendForgotPasswordCode(
      authIdentity.id,
      email,
    );

    return AuthIdentityForgotPasswordResponseDto.build({
      message: 'O código foi enviado com sucesso',
    });
  }
}
