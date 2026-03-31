import { Inject, Injectable } from '@nestjs/common';

import { ListAdminSupportTicketsRequestDto } from '@module/admin/service-desk/dto/request/list-admin-support-tickets.request.dto';
import { ListAdminSupportTicketsQueryParam } from '@module/customer/service-desk/domain/repository/support-ticket/query/param/list-admin-support-tickets.query.param';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketsResponseDto } from '@module/customer/service-desk/dto/response/list-support-tickets.response.dto';
import { SupportTicketListItemResponseDto } from '@module/customer/service-desk/dto/response/support-ticket-list-item.response.dto';

@Injectable()
export class ListAdminSupportTicketsUseCase {
  protected readonly _type = ListAdminSupportTicketsUseCase.name;

  public constructor(
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
  ) {}

  public async execute(
    requestDto: ListAdminSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    const param = new ListAdminSupportTicketsQueryParam({
      page: requestDto.page,
      limit: requestDto.limit,
      sortField: requestDto.sortField ?? null,
      status: requestDto.status ?? null,
      supportType: requestDto.supportType ?? null,
      ticketNumber: requestDto.ticketNumber ?? null,
      search: requestDto.search ?? null,
      from: requestDto.from ?? null,
      to: requestDto.to ?? null,
    });

    const result =
      await this.supportTicketQueryRepositoryGateway.listSupportTicketsForAdmin(
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
