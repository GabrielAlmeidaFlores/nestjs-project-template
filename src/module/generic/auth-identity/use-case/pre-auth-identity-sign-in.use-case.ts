import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { PreAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/pre-auth-identity-sign-in.request.dto';
import {
  PreAuthIdentityAuthenticatorDataSignInResponseDto,
  PreAuthIdentitySignInResponseDto,
} from '@module/generic/auth-identity/dto/response/pre-auth-identity-sign-in.response.dto';
import { SignInMFAOptionEnum } from '@module/generic/auth-identity/enum/sign-in-mfa-option.enum';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { AuthenticatorGateway } from '@module/generic/auth-identity/lib/authenticator/authenticator.gateway';
import { AuthenticatorCredentialsOutputModel } from '@module/generic/auth-identity/lib/authenticator/model/output/authenticator-credentials.output.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Injectable()
export class PreAuthIdentitySignInUseCase {
  protected readonly _type = PreAuthIdentitySignInUseCase.name;

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(AuthenticatorGateway)
    private readonly authenticatorGateway: AuthenticatorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: PreAuthIdentitySignInRequestDto,
  ): Promise<PreAuthIdentitySignInResponseDto> {
    const identifier = dto.federalDocument ?? dto.email;

    if (!identifier) {
      throw new WrongSignInCredentialsError();
    }

    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument(
        identifier,
      );

    if (!authIdentity) {
      throw new WrongSignInCredentialsError();
    }

    const isPasswordRight = bcrypt.compareSync(
      dto.password,
      authIdentity.password.toString(),
    );

    if (!isPasswordRight) {
      throw new WrongSignInCredentialsError();
    }

    if (
      dto.mfaOption === SignInMFAOptionEnum.AUTHENTICATOR_APP &&
      authIdentity.authenticatorAppSecret === null
    ) {
      const authenticatorCredentials =
        await this.generateAuthenticatorSecret(authIdentity);

      return PreAuthIdentitySignInResponseDto.build({
        authenticatorData:
          PreAuthIdentityAuthenticatorDataSignInResponseDto.build({
            ...authenticatorCredentials,
          }),
      });
    }

    return PreAuthIdentitySignInResponseDto.build({
      userLevel: UserLevelEnum.CUSTOMER,
    });
  }

  private async generateAuthenticatorSecret(
    authIdentity: GetAuthIdentityQueryResult,
  ): Promise<AuthenticatorCredentialsOutputModel> {
    const authenticatorCredentials =
      await this.authenticatorGateway.generateCredentials(
        authIdentity.email.toString(),
      );

    const updateAuthIdentityAuthenticatorAppSecret =
      this.authIdentityCommandRepositoryGateway.updateAuthenticatorAppSecret(
        authIdentity.id,
        authenticatorCredentials.secret,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      updateAuthIdentityAuthenticatorAppSecret,
    );
    await transaction.commit();

    return authenticatorCredentials;
  }
}
