import { Inject, Injectable } from '@nestjs/common';

import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { ListAdminSupportTicketsQueryParam } from '@module/customer/service-desk/domain/repository/support-ticket/query/param/list-admin-support-tickets.query.param';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { ListSupportTicketsResponseDto } from '@module/customer/service-desk/dto/response/list-support-tickets.response.dto';
import { SupportTicketListItemResponseDto } from '@module/customer/service-desk/dto/response/support-ticket-list-item.response.dto';
import { SupportAttendantNotFoundError } from '@module/customer/service-desk/error/support-attendant-not-found.error';

@Injectable()
export class ListAdminSupportTicketsByAttendantUseCase {
  protected readonly _type = ListAdminSupportTicketsByAttendantUseCase.name;

  public constructor(
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
  ) {}

  public async execute(
    supportAttendantId: SupportAttendantId,
    param: ListAdminSupportTicketsQueryParam,
  ): Promise<ListSupportTicketsResponseDto> {
    const attendant =
      await this.supportAttendantQueryRepositoryGateway.findOneSupportAttendantById(
        supportAttendantId,
      );

    if (!attendant) {
      throw new SupportAttendantNotFoundError();
    }

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
