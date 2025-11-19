import { Inject } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { UpdateCustomerPasswordRequestDto } from '@module/customer/account/dto/request/update-customer-password.request.dto';
import { UpdateCustomerPasswordResponseDto } from '@module/customer/account/dto/response/update-customer-password.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { WrongCurrentCustomerPasswordError } from '@module/customer/account/error/wrong-current-customer-password.error';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { NewPasswordMatchesCurrentError } from '@module/generic/auth-identity/error/new-password-matches-current.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class UpdateCustomerPasswordUseCase {
  protected readonly _type = UpdateCustomerPasswordUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: UpdateCustomerPasswordRequestDto,
  ): Promise<UpdateCustomerPasswordResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

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
      throw new WrongCurrentCustomerPasswordError();
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

    return UpdateCustomerPasswordResponseDto.build({
      customer: customer.id,
    });
  }
}
