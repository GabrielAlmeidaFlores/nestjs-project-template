import { Inject } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { UpdateAuthIdentityRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-update-password.request.dto';
import { UpdateAuthIdentityResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-update-password.response.dto';
import { NewPasswordMatchesCurrentError } from '@module/generic/auth-identity/error/new-password-matches-current.error';
import { WrongCurrentAuthIdentityPasswordError } from '@module/generic/auth-identity/error/wrong-current-auth-identity-password.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class AuthIdentityUpdatePasswordUseCase {
  protected readonly _type = AuthIdentityUpdatePasswordUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: UpdateAuthIdentityRequestDto,
  ): Promise<UpdateAuthIdentityResponseDto> {
    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityById(
        sessionData.authIdentityId,
      );

    if (authIdentity === null) {
      throw new CustomerNotFoundError();
    }
    const isSamePassword = bcrypt.compareSync(
      dto.password,
      authIdentity.password.toString(),
    );
    if (!isSamePassword) {
      throw new WrongCurrentAuthIdentityPasswordError();
    }
    const isSamePasswordAsPrevious = bcrypt.compareSync(
      dto.newPassword,
      authIdentity.password.toString(),
    );
    if (isSamePasswordAsPrevious) {
      throw new NewPasswordMatchesCurrentError();
    }
    const authEntity = new AuthIdentityEntity({
      ...authIdentity,
      password: dto.newPassword,
    });

    const updateAuthIdentity =
      this.authIdentityCommandRepositoryGateway.updateAuthIdentity(
        authIdentity.id,
        authEntity,
      );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(updateAuthIdentity);
    await transaction.commit();

    return UpdateAuthIdentityResponseDto.build({
      authIdentity: authEntity.id,
    });
  }
}
