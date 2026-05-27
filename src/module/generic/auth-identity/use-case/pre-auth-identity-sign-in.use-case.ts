import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { PreAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/pre-auth-identity-sign-in.request.dto';
import { AccountDeactivatedError } from '@module/generic/auth-identity/error/account-deactivated.error';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { EmailMFAGateway } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.gateway';

@Injectable()
export class PreAuthIdentitySignInUseCase {
  protected readonly _type = PreAuthIdentitySignInUseCase.name;

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(EmailMFAGateway)
    private readonly emailMFAGateway: EmailMFAGateway,
  ) {}

  public async execute(dto: PreAuthIdentitySignInRequestDto): Promise<void> {
    const authIdentity = await this.fetchActiveAuthIdentityOrThrow(dto);

    await this.emailMFAGateway.generatePersistAndSendSignInCode(
      authIdentity.id,
      authIdentity.email.toString(),
      dto.email,
    );
  }

  private async fetchActiveAuthIdentityOrThrow(
    dto: PreAuthIdentitySignInRequestDto,
  ) {
    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailWithRelations(
        dto.email,
      );

    if (!authIdentity) {
      throw new WrongSignInCredentialsError();
    }

    if (!authIdentity.isActive) {
      throw new AccountDeactivatedError();
    }

    const isPasswordCorrect = bcrypt.compareSync(
      dto.password,
      authIdentity.password.toString(),
    );

    if (!isPasswordCorrect) {
      throw new WrongSignInCredentialsError();
    }

    return authIdentity;
  }
}
