import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { ListCustomerSupportTicketsRequestDto } from '@module/customer/service-desk/dto/request/list-customer-support-tickets.request.dto';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketsResponseDto } from '@module/support/service-desk/dto/response/list-support-tickets.response.dto';
import { SupportTicketItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-item.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { normalizeDateRange } from '@shared/system/util/date/normalize-date-range.util';

@Injectable()
export class ListCustomerSupportTicketsUseCase {
  protected readonly _type = ListCustomerSupportTicketsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListCustomerSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    const member =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (member === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const { startDate, endDate } = normalizeDateRange(
      dto.startDate,
      dto.endDate,
    );

    const listResult =
      await this.supportTicketQueryRepositoryGateway.listPaginatedByOrganization(
        {
          page: dto.page,
          limit: dto.limit,
          organizationId: organizationSessionData.organizationId,
          requesterAuthIdentityIdFilter: sessionData.authIdentityId,
          status: dto.status ?? null,
          search: dto.search?.trim() ?? null,
          startDate: startDate ?? null,
          endDate: endDate ?? null,
        },
      );

    const resource = listResult.resource.map((ticket) =>
      SupportTicketItemResponseDto.build({
        id: ticket.id.toString(),
        ticketNumber: ticket.ticketNumber,
        requesterName: ticket.requesterName,
        requesterEmail: ticket.requesterEmail,
        subject: ticket.subject,
        requestDate: ticket.createdAt,
        status: ticket.status,
      }),
    );

    return ListSupportTicketsResponseDto.build({
      page: listResult.page,
      limit: listResult.limit,
      totalItems: listResult.totalItems,
      totalPages: listResult.totalPages,
      amountItemsCurrentPage: listResult.amountItemsCurrentPage,
      resource,
    });
  }
}
