import { Inject, Injectable } from '@nestjs/common';

import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityForgotPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password.request.dto';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';

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
  ): Promise<void> {
    const email = dto.email;

    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocumentWithRelations(
        email,
      );

    if (!authIdentity) {
      throw new WrongSignInCredentialsError();
    }

    const authIdentityName = authIdentity.customer?.name;

    if (authIdentityName === undefined) {
      throw new WrongSignInCredentialsError();
    }

    await this.emailForgotPassword.generatePersistAndSendForgotPasswordCode(
      authIdentity.id,
      authIdentityName,
      email,
    );
  }
}
