import { Inject, Injectable } from '@nestjs/common';

import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { ValidateOrganizationInviteResponseDto } from '@module/customer/account/dto/response/validate-organization-invite.response.dto';
import { InvalidOrganizationInviteError } from '@module/customer/account/error/invalid-organization-invite.error';
import { EmailOrganizationInviteGateway } from '@module/customer/account/lib/email-organization-invite/email-organization-invite.gateway';

@Injectable()
export class ValidateOrganizationInviteUseCase {
  protected readonly _type = ValidateOrganizationInviteUseCase.name;

  public constructor(
    @Inject(EmailOrganizationInviteGateway)
    private readonly emailOrganizationInviteGateway: EmailOrganizationInviteGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepositoryGateway: OrganizationQueryRepositoryGateway,
  ) {}

  public async execute(
    inviteCode: string,
  ): Promise<ValidateOrganizationInviteResponseDto> {
    const inviteData =
      await this.emailOrganizationInviteGateway.getInviteData(inviteCode);

    if (!inviteData) {
      throw new InvalidOrganizationInviteError();
    }

    const organization =
      await this.organizationQueryRepositoryGateway.findOneByOrganizationId(
        inviteData.organizationId,
      );

    if (!organization) {
      throw new InvalidOrganizationInviteError();
    }

    return ValidateOrganizationInviteResponseDto.build({
      organizationName: organization.name,
      invitedName: inviteData.invitedName,
    });
  }
}
