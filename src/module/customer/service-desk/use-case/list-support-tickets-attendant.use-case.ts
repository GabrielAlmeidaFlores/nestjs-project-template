import { Inject, Injectable } from '@nestjs/common';

import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { ListAdminSupportTicketsQueryParam } from '@module/customer/service-desk/domain/repository/support-ticket/query/param/list-admin-support-tickets.query.param';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketsRequestDto } from '@module/customer/service-desk/dto/request/list-support-tickets.request.dto';
import { ListSupportTicketsResponseDto } from '@module/customer/service-desk/dto/response/list-support-tickets.response.dto';
import { SupportTicketListItemResponseDto } from '@module/customer/service-desk/dto/response/support-ticket-list-item.response.dto';
import { SupportAttendantNotFoundError } from '@module/customer/service-desk/error/support-attendant-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListSupportTicketsAttendantUseCase {
  protected readonly _type = ListSupportTicketsAttendantUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    requestDto: ListSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    const attendant =
      await this.supportAttendantQueryRepositoryGateway.findOneSupportAttendantByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!attendant) {
      throw new SupportAttendantNotFoundError();
    }

    const param = new ListAdminSupportTicketsQueryParam({
      page: requestDto.page,
      limit: requestDto.limit,
      sortField: requestDto.sortField ?? null,
      status: requestDto.status ?? null,
      supportType: attendant.supportType,
      ticketNumber: requestDto.ticketNumber ?? null,
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
