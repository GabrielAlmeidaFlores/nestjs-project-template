import { Inject, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';
import { AlreadyOrganizationMemberError } from '@module/customer/account/error/already-organization-member.error';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { InvalidOrganizationInviteError } from '@module/customer/account/error/invalid-organization-invite.error';
import { InviteAcceptanceRequiresCustomerAccountError } from '@module/customer/account/error/invite-acceptance-requires-customer-account.error';
import { OrganizationInviteEmailMismatchError } from '@module/customer/account/error/organization-invite-email-mismatch.error';
import { OrganizationMemberLimitReachedError } from '@module/customer/account/error/organization-member-limit-reached.error';
import { EmailOrganizationInviteGateway } from '@module/customer/account/lib/email-organization-invite/email-organization-invite.gateway';
import { OrganizationInviteDataModel } from '@module/customer/account/lib/email-organization-invite/model/generic/organization-invite-data.model';
import { SetOrganizationCookieUseCaseGateway } from '@module/customer/account/use-case-gateway/set-organization-cookie.use-case-gateway';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { SetAuthTokenCookieUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/set-auth-token-cookie.use-case-gateway';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { GetCustomerWithCustomerAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-customer-address-relation.query.result';
import type { ConfirmInvitedMemberRequestDto } from '@module/customer/account/dto/request/confirm-invited-member.request.dto';

@Injectable()
export class ConfirmInvitedMemberUseCase {
  protected readonly _type = ConfirmInvitedMemberUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(OrganizationMemberCommandRepositoryGateway)
    private readonly organizationMemberCommandRepositoryGateway: OrganizationMemberCommandRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepositoryGateway: OrganizationQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanQueryRepositoryGateway)
    private readonly organizationPaymentPlanQueryRepositoryGateway: OrganizationPaymentPlanQueryRepositoryGateway,
    @Inject(EmailOrganizationInviteGateway)
    private readonly emailOrganizationInviteGateway: EmailOrganizationInviteGateway,
    @Inject(SetOrganizationCookieUseCaseGateway)
    private readonly setOrganizationCookieUseCaseGateway: SetOrganizationCookieUseCaseGateway,
    @Inject(SetAuthTokenCookieUseCaseGateway)
    private readonly setAuthTokenCookieUseCaseGateway: SetAuthTokenCookieUseCaseGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    dto: ConfirmInvitedMemberRequestDto,
  ): Promise<void> {
    const inviteData = await this.fetchInviteOrThrow(dto.inviteCode);

    if (!this.inviteEmailMatchesDto(inviteData, dto)) {
      throw new OrganizationInviteEmailMismatchError();
    }

    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocumentWithRelations(
        dto.email,
      );

    if (authIdentity === null) {
      throw new CustomerNotFoundError();
    }

    if (authIdentity.customer === null) {
      throw new InviteAcceptanceRequiresCustomerAccountError();
    }

    const customerWithAddress =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail(
        authIdentity.id,
        CustomerNotFoundError,
      );

    const organization = await this.fetchOrganizationOrThrow(
      inviteData.organizationId,
    );

    const existingMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationId(
        customerWithAddress.id,
        inviteData.organizationId,
      );

    if (existingMember !== null) {
      throw new AlreadyOrganizationMemberError();
    }

    await this.validateMemberLimit(inviteData.organizationId);

    const organizationMember = new OrganizationMemberEntity({
      customer: this.buildCustomerEntity(customerWithAddress),
      organization,
      owner: false,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.organizationMemberCommandRepositoryGateway.createOrganizationMember(
        organizationMember,
      ),
    ]);

    await transaction.commit();

    await this.emailOrganizationInviteGateway.deleteInviteData(dto.inviteCode);

    this.setOrganizationCookieUseCaseGateway.execute(
      reply,
      inviteData.organizationId,
      false,
    );

    await this.setAuthTokenCookieUseCaseGateway.execute(
      reply,
      authIdentity.id,
      UserLevelEnum.CUSTOMER,
    );
  }

  private inviteEmailMatchesDto(
    inviteData: OrganizationInviteDataModel,
    dto: ConfirmInvitedMemberRequestDto,
  ): boolean {
    return (
      inviteData.invitedEmail.toLowerCase() ===
      dto.email.toString().toLowerCase()
    );
  }

  private async validateMemberLimit(
    organizationId: OrganizationId,
  ): Promise<void> {
    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepositoryGateway.findOneByOrganizationId(
        organizationId,
      );

    if (!organizationPaymentPlan) {
      return;
    }

    const activeCollaborators =
      await this.organizationMemberQueryRepositoryGateway.countActiveCollaboratorsByOrganizationId(
        organizationId,
      );

    if (activeCollaborators >= organizationPaymentPlan.maxMemberCount) {
      throw new OrganizationMemberLimitReachedError();
    }
  }

  private buildCustomerEntity(
    customerWithAddress: GetCustomerWithCustomerAddressRelationQueryResult,
  ): CustomerEntity {
    const customerAddress = new CustomerAddressEntity({
      id: customerWithAddress.customerAddress.id,
      postalCode: customerWithAddress.customerAddress.postalCode,
      stateCode: customerWithAddress.customerAddress.stateCode,
      city: customerWithAddress.customerAddress.city,
      neighborhood: customerWithAddress.customerAddress.neighborhood,
      street: customerWithAddress.customerAddress.street,
      addressNumber: customerWithAddress.customerAddress.addressNumber,
    });

    return new CustomerEntity({
      id: customerWithAddress.id,
      name: customerWithAddress.name,
      phoneNumber: customerWithAddress.phoneNumber,
      customerAddress,
      bankExternalId: customerWithAddress.bankExternalId,
      profilePicture: customerWithAddress.profilePicture,
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
