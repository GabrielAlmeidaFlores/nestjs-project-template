import { Inject, Injectable } from '@nestjs/common';

import { ListSupportTicketsQueryParam } from '@module/customer/service-desk/domain/repository/support-ticket/query/param/list-support-tickets.query.param';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketsRequestDto } from '@module/customer/service-desk/dto/request/list-support-tickets.request.dto';
import { ListSupportTicketsResponseDto } from '@module/customer/service-desk/dto/response/list-support-tickets.response.dto';
import { SupportTicketListItemResponseDto } from '@module/customer/service-desk/dto/response/support-ticket-list-item.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListSupportTicketsUseCase {
  protected readonly _type = ListSupportTicketsUseCase.name;

  public constructor(
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    orgSession: OrganizationSessionDataModel,
    requestDto: ListSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    const param = new ListSupportTicketsQueryParam({
      page: requestDto.page,
      limit: requestDto.limit,
      sortField: requestDto.sortField ?? null,
      status: requestDto.status ?? null,
      supportType: requestDto.supportType ?? null,
      ticketNumber: requestDto.ticketNumber ?? null,
      from: requestDto.from ?? null,
      to: requestDto.to ?? null,
    });

    const result = orgSession.owner
      ? await this.supportTicketQueryRepositoryGateway.listSupportTicketsByOrganizationId(
          orgSession.organizationId,
          param,
        )
      : await this.supportTicketQueryRepositoryGateway.listSupportTicketsByRequester(
          orgSession.organizationId,
          sessionData.authIdentityId,
          param,
        );

    const resource = result.resource.map((item) =>
      SupportTicketListItemResponseDto.build({
        supportTicketId: item.id,
        ticketNumber: item.ticketNumber,
        requesterEmail: item.requesterEmail,
        requesterName: item.requesterName,
        subject: item.subject,
        supportType: item.supportType,
        status: item.status,
        ...(item.assignedAttendantName !== null && {
          assignedAttendantName: item.assignedAttendantName,
        }),
        createdAt: item.createdAt,
      }),
    );

    return ListSupportTicketsResponseDto.build({
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      amountItemsCurrentPage: result.amountItemsCurrentPage,
      resource,
    });
  }
}
