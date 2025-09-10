import { AuthIdentityEntity } from '@module/generic/auth/domain/schema/entity/auth-identity/auth-identity.entity';
import { SignUpResponseDto } from '@module/generic/auth/dto/response/sign-up.response.dto';
import { EmailAlreadyInUseError } from '@module/generic/auth/error/email-already-in-use.error';
import { FederalDocumentAlreadyInUseError } from '@module/generic/auth/error/federal-document-already-in-use.error';

import type { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import type { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import type { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import type { SignUpRequestDto } from '@module/generic/auth/dto/request/sign-up.request.dto';

export class SignUpUseCase {
  protected readonly _type = SignUpUseCase.name;

  public constructor(
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
  ) {}

  public async execute(dto: SignUpRequestDto): Promise<SignUpResponseDto> {
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

    const authIdentity = new AuthIdentityEntity(dto);

    const createAuthIdentity =
      this.authIdentityCommandRepositoryGateway.createAuthIdentity(
        authIdentity,
      );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(createAuthIdentity);

    await transaction.commit();

    return SignUpResponseDto.build({
      authIdentity: authIdentity.id,
    });
  }
}
