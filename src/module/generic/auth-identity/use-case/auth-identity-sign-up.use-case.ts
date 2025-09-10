import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';
import { AuthIdentitySignUpResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-up.response.dto';
import { ValidateAuthIdentitySignUpUseCasePort } from '@module/generic/auth-identity/use-case-port/validate-auth-identity-sign-up.use-case-port';

import type { AuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-up.request.dto';
import type { AuthIdentitySignUpUseCasePort } from '@module/generic/auth-identity/use-case-port/auth-identity-sign-up.use-case-port';

@Injectable()
export class AuthIdentitySignUpUseCase
  implements AuthIdentitySignUpUseCasePort
{
  protected readonly _type = AuthIdentitySignUpUseCase.name;

  public constructor(
    private readonly validateAuthIdentitySignUpUseCasePort: ValidateAuthIdentitySignUpUseCasePort,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: AuthIdentitySignUpRequestDto,
  ): Promise<AuthIdentitySignUpResponseDto> {
    await this.validateAuthIdentitySignUpUseCasePort.execute(
      ValidateAuthIdentitySignUpRequestDto.build({ ...dto }),
    );

    const authIdentity = new AuthIdentityEntity(dto);

    const createAuthIdentity =
      this.authIdentityCommandRepositoryGateway.createAuthIdentity(
        authIdentity,
      );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(createAuthIdentity);

    await transaction.commit();

    return AuthIdentitySignUpResponseDto.build({
      authIdentity: authIdentity.id,
    });
  }
}
