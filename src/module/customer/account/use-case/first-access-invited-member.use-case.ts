import { Inject, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CreateCustomerInputModel } from '@infra/payment-gateway/model/input/create-customer.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';
import { FirstAccessInvitedMemberResponseDto } from '@module/customer/account/dto/response/first-access-invited-member.response.dto';
import { InvalidOrganizationInviteError } from '@module/customer/account/error/invalid-organization-invite.error';
import { EmailOrganizationInviteGateway } from '@module/customer/account/lib/email-organization-invite/email-organization-invite.gateway';
import { OrganizationInviteDataModel } from '@module/customer/account/lib/email-organization-invite/model/generic/organization-invite-data.model';
import { SetOrganizationCookieUseCaseGateway } from '@module/customer/account/use-case-gateway/set-organization-cookie.use-case-gateway';
import { AuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-up.request.dto';
import { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';
import { AuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/auth-identity-sign-up.use-case-gateway';
import { SetAuthTokenCookieUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/set-auth-token-cookie.use-case-gateway';
import { ValidateAuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-up.use-case-gateway';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { FirstAccessInvitedMemberRequestDto } from '@module/customer/account/dto/request/first-access-invited-member.request.dto';

@Injectable()
export class FirstAccessInvitedMemberUseCase {
  protected readonly _type = FirstAccessInvitedMemberUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CustomerCommandRepositoryGateway)
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
    @Inject(CustomerAddressCommandRepositoryGateway)
    private readonly customerAddressCommandRepositoryGateway: CustomerAddressCommandRepositoryGateway,
    @Inject(OrganizationMemberCommandRepositoryGateway)
    private readonly organizationMemberCommandRepositoryGateway: OrganizationMemberCommandRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepositoryGateway: OrganizationQueryRepositoryGateway,
    @Inject(EmailOrganizationInviteGateway)
    private readonly emailOrganizationInviteGateway: EmailOrganizationInviteGateway,
    @Inject(ValidateAuthIdentitySignUpUseCaseGateway)
    private readonly validateAuthIdentitySignUpUseCaseGateway: ValidateAuthIdentitySignUpUseCaseGateway,
    @Inject(AuthIdentitySignUpUseCaseGateway)
    private readonly authIdentitySignUpUseCaseGateway: AuthIdentitySignUpUseCaseGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    @Inject(SetOrganizationCookieUseCaseGateway)
    private readonly setOrganizationCookieUseCaseGateway: SetOrganizationCookieUseCaseGateway,
    @Inject(SetAuthTokenCookieUseCaseGateway)
    private readonly setAuthTokenCookieUseCaseGateway: SetAuthTokenCookieUseCaseGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    dto: FirstAccessInvitedMemberRequestDto,
  ): Promise<FirstAccessInvitedMemberResponseDto> {
    const inviteData = await this.fetchInviteOrThrow(dto.inviteCode);

    const organization = await this.fetchOrganizationOrThrow(
      inviteData.organizationId,
    );

    const customerAddress = new CustomerAddressEntity({
      ...dto.customerAddress,
    });

    const customerId = new CustomerId();

    const bankCustomer = await this.paymentGateway.createCustomer(
      CreateCustomerInputModel.build({
        name: dto.name,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        federalDocument: dto.federalDocument,
        externalReference: customerId.toString(),
      }),
    );

    const customer = new CustomerEntity({
      id: customerId,
      name: dto.name,
      phoneNumber: dto.phoneNumber,
      customerAddress,
      bankExternalId: bankCustomer.id.toString(),
    });

    await this.validateAuthIdentitySignUpUseCaseGateway.execute(
      ValidateAuthIdentitySignUpRequestDto.build({
        email: dto.email,
        federalDocument: dto.federalDocument,
        password: dto.password,
        customer: customer.id,
      }),
    );

    const organizationMember = new OrganizationMemberEntity({
      customer,
      organization,
      owner: false,
    });

    const customerAddressTransaction =
      this.customerAddressCommandRepositoryGateway.createCustomerAddress(
        customerAddress,
      );

    const customerTransaction =
      this.customerCommandRepositoryGateway.createCustomer(customer);

    const organizationMemberTransaction =
      this.organizationMemberCommandRepositoryGateway.createOrganizationMember(
        organizationMember,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      customerAddressTransaction,
      customerTransaction,
      organizationMemberTransaction,
    ]);

    await transaction.commit();

    await this.emailOrganizationInviteGateway.deleteInviteData(dto.inviteCode);

    const signedUp = await this.authIdentitySignUpUseCaseGateway.execute(
      AuthIdentitySignUpRequestDto.build({
        email: dto.email,
        federalDocument: dto.federalDocument,
        password: dto.password,
        customer: customer.id,
      }),
    );

    this.setOrganizationCookieUseCaseGateway.execute(
      reply,
      inviteData.organizationId,
      false,
    );

    await this.setAuthTokenCookieUseCaseGateway.execute(
      reply,
      signedUp.authIdentityId,
      UserLevelEnum.CUSTOMER,
    );

    return FirstAccessInvitedMemberResponseDto.build({
      customerId: customer.id,
    });
  }

  private async fetchInviteOrThrow(
    inviteCode: string,
  ): Promise<OrganizationInviteDataModel> {
    const inviteData =
      await this.emailOrganizationInviteGateway.getInviteData(inviteCode);

    if (!inviteData) {
      throw new InvalidOrganizationInviteError();
    }

    return inviteData;
  }

  private async fetchOrganizationOrThrow(
    organizationId: OrganizationId,
  ): Promise<OrganizationEntity> {
    const organizationQueryResult =
      await this.organizationQueryRepositoryGateway.findOneByOrganizationId(
        organizationId,
      );

    if (!organizationQueryResult) {
      throw new InvalidOrganizationInviteError();
    }

    return new OrganizationEntity({
      id: organizationId,
      name: organizationQueryResult.name,
    });
  }
}
