import { Inject, Injectable } from '@nestjs/common';

import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { InviteEmailAlreadyInUseError } from '@module/customer/account/error/invite-email-already-in-use.error';
import { OrganizationMemberLimitReachedError } from '@module/customer/account/error/organization-member-limit-reached.error';
import { OrganizationNotFoundError } from '@module/customer/account/error/organization-not-found.error';
import { EmailOrganizationInviteGateway } from '@module/customer/account/lib/email-organization-invite/email-organization-invite.gateway';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';

import type { InviteOrganizationMemberRequestDto } from '@module/customer/account/dto/request/invite-organization-member.request.dto';
import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class InviteOrganizationMemberUseCase {
  protected readonly _type = InviteOrganizationMemberUseCase.name;

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepositoryGateway: OrganizationQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanQueryRepositoryGateway)
    private readonly organizationPaymentPlanQueryRepositoryGateway: OrganizationPaymentPlanQueryRepositoryGateway,
    @Inject(EmailOrganizationInviteGateway)
    private readonly emailOrganizationInviteGateway: EmailOrganizationInviteGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    dto: InviteOrganizationMemberRequestDto,
  ): Promise<void> {
    await this.validateEmailNotInUse(dto, organizationSessionData);
    await this.validateMemberLimit(organizationSessionData);

    const organization = await this.findOrganizationOrThrow(
      organizationSessionData,
    );

    await this.emailOrganizationInviteGateway.generatePersistAndSendInviteCode(
      organizationSessionData.organizationId.toString(),
      organization.name,
      dto.email.toString(),
      dto.invitedName,
    );
  }

  private async validateEmailNotInUse(
    dto: InviteOrganizationMemberRequestDto,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<void> {
    const existing =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocumentByOrganization(
        dto.email,
        organizationSessionData.organizationId,
      );

    if (existing) {
      throw new InviteEmailAlreadyInUseError();
    }
  }

  private async validateMemberLimit(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<void> {
    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepositoryGateway.findOneByOrganizationId(
        organizationSessionData.organizationId,
      );

    if (!organizationPaymentPlan) {
      return;
    }

    const activeCollaborators =
      await this.organizationMemberQueryRepositoryGateway.countActiveCollaboratorsByOrganizationId(
        organizationSessionData.organizationId,
      );

    if (activeCollaborators >= organizationPaymentPlan.maxMemberCount) {
      throw new OrganizationMemberLimitReachedError();
    }
  }

  private async findOrganizationOrThrow(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<{ name: string }> {
    const organization =
      await this.organizationQueryRepositoryGateway.findOneByOrganizationId(
        organizationSessionData.organizationId,
      );

    if (!organization) {
      throw new OrganizationNotFoundError();
    }

    return organization;
  }
}
