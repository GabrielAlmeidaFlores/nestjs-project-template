import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { UserCommandRepositoryGateway } from '@module/client/user/domain/repository/user/command/user.command.repository.gateway';
import { UserEntity } from '@module/client/user/domain/schema/entity/user/user.entity';
import { UserEntityPropsInputModel } from '@module/client/user/domain/schema/entity/user/user.entity.props.input.model';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { AuthIdentityEntityPropsInputModel } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity.props.input.model';
import { AuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-up.request.dto';
import { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';
import { AuthIdentitySignUpResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-up.response.dto';
import { ValidateAuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-up.use-case-gateway';

import type { AuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/auth-identity-sign-up.use-case-gateway';

@Injectable()
export class AuthIdentitySignUpUseCase implements AuthIdentitySignUpUseCaseGateway {
  protected readonly _type = AuthIdentitySignUpUseCase.name;

  public constructor(
    @Inject(ValidateAuthIdentitySignUpUseCaseGateway)
    private readonly validateAuthIdentitySignUpUseCasePort: ValidateAuthIdentitySignUpUseCaseGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(UserCommandRepositoryGateway)
    private readonly userCommandRepositoryGateway: UserCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: AuthIdentitySignUpRequestDto,
  ): Promise<AuthIdentitySignUpResponseDto> {
    await this.validateAuthIdentitySignUpUseCasePort.execute(
      ValidateAuthIdentitySignUpRequestDto.build({ email: dto.email }),
    );

    const authIdentity = new AuthIdentityEntity(
      AuthIdentityEntityPropsInputModel.build({
        email: new Email(dto.email.toString()),
        password: dto.password,
      }),
    );

    const user = new UserEntity(
      UserEntityPropsInputModel.build({
        authIdentityId: authIdentity.id,
        name: dto.name,
        username: dto.username,
      }),
    );

    const createAuthIdentity =
      this.authIdentityCommandRepositoryGateway.createAuthIdentity(
        authIdentity,
      );

    const createUser = this.userCommandRepositoryGateway.createUser(user);

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createAuthIdentity,
      createUser,
    ]);

    await transaction.commit();

    return AuthIdentitySignUpResponseDto.build({
      authIdentityId: authIdentity.id,
    });
  }
}
