import { Injectable } from '@nestjs/common';

import { EmailAlreadyInUseError } from '@module/generic/auth-identity/error/email-already-in-use.error';
import { FederalDocumentAlreadyInUseError } from '@module/generic/auth-identity/error/federal-document-already-in-use.error';

import type { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import type { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';
import type { ValidateAuthIdentitySignUpUseCasePort } from '@module/generic/auth-identity/use-case-port/validate-auth-identity-sign-up.use-case-port';

@Injectable()
export class ValidateAuthIdentitySignUpUseCase
  implements ValidateAuthIdentitySignUpUseCasePort
{
  protected readonly _type = ValidateAuthIdentitySignUpUseCase.name;

  public constructor(
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ValidateAuthIdentitySignUpRequestDto,
  ): Promise<void> {
    const verifyAuthIdentityEmail =
      await this.authIdentityQueryRepositoryGateway.findAuthIdentityByEmailOrFederalDocument(
        dto.email,
      );

    if (verifyAuthIdentityEmail) {
      throw new EmailAlreadyInUseError();
    }

    const verifyAuthIdentityFederalDocument =
      await this.authIdentityQueryRepositoryGateway.findAuthIdentityByEmailOrFederalDocument(
        dto.federalDocument,
      );

    if (verifyAuthIdentityFederalDocument) {
      throw new FederalDocumentAlreadyInUseError();
    }
  }
}
