import { Inject } from '@nestjs/common';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { SetOrganizationForCustomerResponseDto } from '@module/customer/account/dto/response/set-organization-for-customer.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { OrganizationNotAvailableForCustomerError } from '@module/customer/account/error/organization-not-available-for-customer.error';
import { SetOrganizationCookieUseCaseGateway } from '@module/customer/account/use-case-gateway/set-organization-cookie.use-case-gateway';

import type { SetOrganizationForCustomerRequestDto } from '@module/customer/account/dto/request/set-organization-for-customer.request.dto';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import type { FastifyReply } from 'fastify';

export class SetOrganizationForCustomerUseCase {
  protected readonly _type = SetOrganizationForCustomerUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SetOrganizationCookieUseCaseGateway)
    private readonly setOrganizationCookieUseCaseGateway: SetOrganizationCookieUseCaseGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    sessionData: SessionDataModel,
    dto: SetOrganizationForCustomerRequestDto,
  ): Promise<SetOrganizationForCustomerResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationId(
        customer.id,
        dto.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationNotAvailableForCustomerError();
    }

    this.setOrganizationCookieUseCaseGateway.execute(
      reply,
      dto.organizationId,
      organizationMember.owner,
    );

    return SetOrganizationForCustomerResponseDto.build({
      owner: organizationMember.owner,
    });
  }
}
