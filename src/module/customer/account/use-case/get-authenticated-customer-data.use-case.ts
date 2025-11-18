import { Inject } from '@nestjs/common';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import {
  GetAuthenticatedCustomerDataResponseDto,
  GetCustomerDataResponseDto,
  GetOrganizationDataResponseDto,
} from '@module/customer/account/dto/response/get-authenticated-customer-data.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { InvalidOrganizationSessionError } from '@module/customer/account/error/invalid-organization-session.error';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class GetAuthenticatedCustomerDataUseCase {
  protected readonly _type = GetAuthenticatedCustomerDataUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<GetAuthenticatedCustomerDataResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationIdWithRelations(
        customer.id,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new InvalidOrganizationSessionError();
    }

    const response = GetAuthenticatedCustomerDataResponseDto.build({
      organization: GetOrganizationDataResponseDto.build({
        organizationId: organizationMember.organization.id,
        organizationName: organizationMember.organization.name,
        organizationOwner: organizationMember.owner,
      }),
      customer: GetCustomerDataResponseDto.build({
        customerId: organizationMember.customer.id,
        email: organizationMember.customer.authIdentity.email,
        federalDocument:
          organizationMember.customer.authIdentity.federalDocument,
        name: organizationMember.customer.name,
      }),
    });

    if (organizationMember.customer.profilePicture !== null) {
      const customerProfilePicture =
        await this.fileProcessorGateway.getCustomerProfilePicture(
          organizationMember.customer.profilePicture,
        );

      response.customer.profilePicture = customerProfilePicture.toString();
    }

    if (organizationMember.organization.organizationLogo !== null) {
      const organizationLogo =
        await this.fileProcessorGateway.getOrganizationLogo(
          organizationMember.organization.organizationLogo,
        );

      response.organization.organizationLogo = organizationLogo.toString();
    }

    return response;
  }
}
