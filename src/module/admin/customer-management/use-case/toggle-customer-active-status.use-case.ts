import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DeactivateCustomerAuthIdentityResponseDto } from '@module/admin/customer-management/dto/response/deactivate-customer-auth-identity.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class ToggleCustomerActiveStatusUseCase {
  protected readonly _type = ToggleCustomerActiveStatusUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepository: AuthIdentityQueryRepositoryGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepository: AuthIdentityCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    customerId: CustomerId,
    isActive: boolean,
  ): Promise<DeactivateCustomerAuthIdentityResponseDto> {
    await this.validateCustomerExists(customerId);

    const authIdentity =
      await this.fetchAuthIdentityByCustomerIdOrThrow(customerId);

    const updatedAuthIdentity = this.buildUpdatedAuthIdentity(
      authIdentity,
      isActive,
    );

    await this.persistUpdatedAuthIdentity(authIdentity.id, updatedAuthIdentity);

    return DeactivateCustomerAuthIdentityResponseDto.build({
      customerId,
    });
  }

  private async validateCustomerExists(customerId: CustomerId): Promise<void> {
    const customer =
      await this.customerQueryRepository.findOneByCustomerId(customerId);

    if (!customer) {
      throw new CustomerNotFoundError();
    }
  }

  private async fetchAuthIdentityByCustomerIdOrThrow(
    customerId: CustomerId,
  ): Promise<GetAuthIdentityWithRelationsQueryResult> {
    const authIdentity =
      await this.authIdentityQueryRepository.findOneAuthIdentityByCustomerId(
        customerId,
      );

    if (!authIdentity) {
      throw new CustomerNotFoundError();
    }

    return authIdentity;
  }

  private buildUpdatedAuthIdentity(
    authIdentity: GetAuthIdentityWithRelationsQueryResult,
    isActive: boolean,
  ): AuthIdentityEntity {
    return new AuthIdentityEntity({
      id: authIdentity.id,
      email: authIdentity.email,
      federalDocument: authIdentity.federalDocument,
      password: authIdentity.password,
      authenticatorAppSecret: authIdentity.authenticatorAppSecret,
      customer: authIdentity.customer?.id ?? null,
      admin: authIdentity.admin?.id ?? null,
      isActive,
      mustChangePassword: authIdentity.mustChangePassword,
      createdAt: authIdentity.createdAt,
      updatedAt: new Date(),
    });
  }

  private async persistUpdatedAuthIdentity(
    authIdentityId: AuthIdentityId,
    authIdentity: AuthIdentityEntity,
  ): Promise<void> {
    const updateAuthIdentity =
      this.authIdentityCommandRepository.updateAuthIdentity(
        authIdentityId,
        authIdentity,
      );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(updateAuthIdentity);

    await transaction.commit();
  }
}
