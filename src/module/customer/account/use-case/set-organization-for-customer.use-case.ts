import { Inject } from '@nestjs/common';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { SetOrganizationForCustomerResponseDto } from '@module/customer/account/dto/response/set-organization-for-customer.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { OrganizationNotAvailableForCustomerError } from '@module/customer/account/error/organization-not-available-for-customer.error';
import { OrganizationSessionGateway } from '@module/customer/account/lib/organization-session/organization-session.gateway';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { NodeApplicationVariable } from '@shared/system/constant/application-variable/source/node.application-variable';

import type { SetOrganizationForCustomerRequestDto } from '@module/customer/account/dto/request/set-organization-for-customer.request.dto';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import type { FastifyReply } from 'fastify';

export class SetOrganizationForCustomerUseCase {
  protected readonly _type = SetOrganizationForCustomerUseCase.name;

  public constructor(
    @Inject(OrganizationSessionGateway)
    private readonly organizationSessionGateway: OrganizationSessionGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
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
      await this.organizationMemberQueryRepositoryGateway.findOneOrganizationByCustomerAndOrganizationId(
        customer.id,
        dto.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationNotAvailableForCustomerError();
    }

    const jwtOrganizationSession =
      this.organizationSessionGateway.createSession(dto.organizationId);

    const sevenDaysInSeconds = 604800;

    reply.setCookie(ApiCookieEnum.ORGANIZATION, jwtOrganizationSession, {
      httpOnly: true,
      secure: NodeApplicationVariable.PRODUCTION_ENVIRONMENT,
      sameSite: 'lax',
      path: '/',
      maxAge: sevenDaysInSeconds,
    });

    return SetOrganizationForCustomerResponseDto.build({
      owner: organizationMember.owner,
    });
  }
}
