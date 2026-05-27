import { Inject, Injectable } from '@nestjs/common';

import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityForgotPasswordValidateCodeRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password-code.request.dto';
import { AuthIdentityForgotPasswordCodeResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-forgot-password-code.response.dto';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';

@Injectable()
export class AuthIdentityForgotPasswordValidateCodeUseCase {
  protected readonly _type = AuthIdentityForgotPasswordValidateCodeUseCase.name;

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepository: AuthIdentityQueryRepositoryGateway,
    @Inject(EmailForgotPasswordGateway)
    private readonly emailForgotPassword: EmailForgotPasswordGateway,
  ) {}

  public async execute(
    dto: AuthIdentityForgotPasswordValidateCodeRequestDto,
  ): Promise<AuthIdentityForgotPasswordCodeResponseDto> {
    const { email, code } = dto;

    const authIdentity =
      await this.authIdentityQueryRepository.findOneAuthIdentityByEmail(email);
    if (!authIdentity) {
      return AuthIdentityForgotPasswordCodeResponseDto.build({ valid: false });
    }
    const valid = await this.emailForgotPassword.validateForgotPasswordCode(
      authIdentity.id,
      code,
    );

    return AuthIdentityForgotPasswordCodeResponseDto.build({ valid: valid });
  }
}
