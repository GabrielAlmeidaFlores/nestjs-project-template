import { Inject, Injectable } from '@nestjs/common';

import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { EmailAlreadyInUseError } from '@module/generic/auth-identity/error/email-already-in-use.error';

import type { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';
import type { ValidateAuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-up.use-case-gateway';

@Injectable()
export class ValidateAuthIdentitySignUpUseCase
  implements ValidateAuthIdentitySignUpUseCaseGateway
{
  protected readonly _type = ValidateAuthIdentitySignUpUseCase.name;

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ValidateAuthIdentitySignUpRequestDto,
  ): Promise<void> {
    const existing =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmail(
        dto.email,
      );

    if (existing) {
      throw new EmailAlreadyInUseError();
    }
  }
}
