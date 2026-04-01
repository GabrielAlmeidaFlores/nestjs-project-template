import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { ListCustomerSupportTicketsRequestDto } from '@module/customer/service-desk/dto/request/list-customer-support-tickets.request.dto';
import { ListSupportTicketsByOrganizationQueryParam } from '@module/support/service-desk/domain/repository/support-ticket/query/param/list-support-tickets-by-organization.query.param';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketsResponseDto } from '@module/support/service-desk/dto/response/list-support-tickets.response.dto';
import { SupportTicketItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-item.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

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

    const { startDate, endDate } = this.normalizeDateRange(
      dto.startDate,
      dto.endDate,
    );

    const listResult =
      await this.supportTicketQueryRepositoryGateway.listPaginatedByOrganization(
        new ListSupportTicketsByOrganizationQueryParam({
          page: dto.page,
          limit: dto.limit,
          organizationId: organizationSessionData.organizationId,
          requesterAuthIdentityIdFilter: sessionData.authIdentityId,
          status: dto.status ?? null,
          search: dto.search?.trim() ?? null,
          startDate: startDate ?? null,
          endDate: endDate ?? null,
        }),
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

  private normalizeDateRange(
    start?: Date,
    end?: Date,
  ): { startDate: Date | null; endDate: Date | null } {
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (start instanceof Date && !Number.isNaN(start.getTime())) {
      startDate = new Date(
        start.toISOString().split('T')[0] + 'T00:00:00.000Z',
      );
    }

    if (end instanceof Date && !Number.isNaN(end.getTime())) {
      endDate = new Date(end.toISOString().split('T')[0] + 'T23:59:59.999Z');
    }

    return { startDate, endDate };
  }
}
