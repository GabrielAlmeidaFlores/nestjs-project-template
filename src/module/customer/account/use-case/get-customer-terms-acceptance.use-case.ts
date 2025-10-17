import { Inject } from '@nestjs/common';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerTermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/query/customer-terms.query.repository.gateway';
import { CustomerTermsAcceptanceQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/customer-terms-acceptance.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetCustomerTermsAcceptanceDataResponseDto } from '@module/customer/account/dto/response/get-terms-acceptance-data.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { CustomerTermsNotFoundError } from '@module/customer/account/error/customer-terms-not-found.error';
import { InvalidOrganizationSessionError } from '@module/customer/account/error/invalid-organization-session.error';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class GetCustomerTermsAcceptanceUseCase {
  protected readonly _type = GetCustomerTermsAcceptanceUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CustomerTermsQueryRepositoryGateway)
    private readonly customerTermsQueryRepositoryGateway: CustomerTermsQueryRepositoryGateway,
    @Inject(CustomerTermsAcceptanceQueryRepositoryGateway)
    private readonly customerTermsAcceptanceQueryRepositoryGateway: CustomerTermsAcceptanceQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<GetCustomerTermsAcceptanceDataResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations(
        customer.id,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new InvalidOrganizationSessionError();
    }

    const terms =
      await this.customerTermsQueryRepositoryGateway.findOneByStatus(true);

    if (terms === null) {
      throw new CustomerTermsNotFoundError();
    }

    const customerTermsAcceptance =
      await this.customerTermsAcceptanceQueryRepositoryGateway.findOneByTermsIdAndCustomerId(
        terms.id,
        customer.id,
      );

    const accepted = customerTermsAcceptance !== null;

    return GetCustomerTermsAcceptanceDataResponseDto.build({
      content: terms.content,
      accepted,
    });
  }
}
