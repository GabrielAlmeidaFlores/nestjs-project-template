import { Inject, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { OrganizationCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization/command/organization.command.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';
import { CustomerSignUpResponseDto } from '@module/customer/account/dto/response/customer-sign-up.response.dto';
import { SetOrganizationCookieUseCaseGateway } from '@module/customer/account/use-case-gateway/set-organization-cookie.use-case-gateway';
import { AuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-up.request.dto';
import { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';
import { AuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/auth-identity-sign-up.use-case-gateway';
import { SetAuthTokenCookieUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/set-auth-token-cookie.use-case-gateway';
import { ValidateAuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-up.use-case-gateway';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { CustomerSignUpRequestDto } from '@module/customer/account/dto/request/customer-sign-up.request.dto';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';

@Injectable()
export class CustomerSignUpUseCase {
  protected readonly _type = CustomerSignUpUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CustomerCommandRepositoryGateway)
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
    @Inject(CustomerAddressCommandRepositoryGateway)
    private readonly customerAddressCommandRepositoryGateway: CustomerAddressCommandRepositoryGateway,
    @Inject(ValidateAuthIdentitySignUpUseCaseGateway)
    private readonly validateAuthIdentitySignUpUseCasePort: ValidateAuthIdentitySignUpUseCaseGateway,
    @Inject(OrganizationCommandRepositoryGateway)
    private readonly organizationCommandRepositoryGateway: OrganizationCommandRepositoryGateway,
    @Inject(OrganizationMemberCommandRepositoryGateway)
    private readonly organizationMemberCommandRepositoryGateway: OrganizationMemberCommandRepositoryGateway,
    @Inject(AuthIdentitySignUpUseCaseGateway)
    private readonly authIdentitySignUpUseCasePort: AuthIdentitySignUpUseCaseGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    @Inject(SetOrganizationCookieUseCaseGateway)
    private readonly setOrganizationCookieUseCaseGateway: SetOrganizationCookieUseCaseGateway,
    @Inject(SetAuthTokenCookieUseCaseGateway)
    private readonly setAuthTokenCookieUseCaseGateway: SetAuthTokenCookieUseCaseGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    dto: CustomerSignUpRequestDto,
  ): Promise<CustomerSignUpResponseDto> {
    const customerAddress = new CustomerAddressEntity({
      ...dto.customerAddress,
    });

    const customer = new CustomerEntity({
      name: dto.name,
      customerAddress,
    });

    const organization = new OrganizationEntity({
      name: customer.name,
    });

    const organizationMember = new OrganizationMemberEntity({
      customer,
      organization,
      owner: true,
    });

    await this.validateAuthIdentitySignUpUseCasePort.execute(
      ValidateAuthIdentitySignUpRequestDto.build({
        ...dto,
        customer: customer.id,
      }),
    );

    const customerTransaction =
      this.customerCommandRepositoryGateway.createCustomer(customer);

    const customerAddressTransaction =
      this.customerAddressCommandRepositoryGateway.createCustomerAddress(
        customerAddress,
      );

    const organizationTransaction =
      this.organizationCommandRepositoryGateway.createOrganization(
        organization,
      );

    const organizationMemberTransaction =
      this.organizationMemberCommandRepositoryGateway.createOrganizationMember(
        organizationMember,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      customerAddressTransaction,
      customerTransaction,
      organizationTransaction,
      organizationMemberTransaction,
    ]);

    await transaction.commit();

    const signupAsAuthIdentity =
      await this.authIdentitySignUpUseCasePort.execute(
        AuthIdentitySignUpRequestDto.build({
          ...dto,
          customer: customer.id,
        }),
      );

    this.setOrganizationCookieUseCaseGateway.execute(
      reply,
      organization.id,
      true,
    );

    await this.setAuthTokenCookieUseCaseGateway.execute(
      reply,
      signupAsAuthIdentity.authIdentityId,
      UserLevelEnum.CUSTOMER,
    );

    return CustomerSignUpResponseDto.build({
      customer: customer.id,
    });
  }
}
