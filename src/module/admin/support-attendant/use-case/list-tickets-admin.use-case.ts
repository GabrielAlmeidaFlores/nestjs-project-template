import { Inject, Injectable } from '@nestjs/common';

import { ListTicketsAdminRequestDto } from '@module/admin/support-attendant/dto/request/list-tickets-admin.request.dto';
import { ListSupportTicketsQueryParam } from '@module/support/service-desk/domain/repository/support-ticket/query/param/list-support-tickets.query.param';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketsResponseDto } from '@module/support/service-desk/dto/response/list-support-tickets.response.dto';
import { SupportTicketItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-item.response.dto';

@Injectable()
export class ListTicketsAdminUseCase {
  protected readonly _type = ListTicketsAdminUseCase.name;

  public constructor(
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListTicketsAdminRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    const { startDate, endDate } = this.normalizeDateRange(
      dto.startDate,
      dto.endDate,
    );

    const listResult =
      await this.supportTicketQueryRepositoryGateway.listPaginated(
        new ListSupportTicketsQueryParam({
          page: dto.page,
          limit: dto.limit,
          supportType: dto.supportType ?? null,
          status: dto.status ?? null,
          search: dto.search?.trim() ?? null,
          startDate: startDate ?? null,
          endDate: endDate ?? null,
          assignedAttendantId: dto.supportAttendantId ?? null,
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
