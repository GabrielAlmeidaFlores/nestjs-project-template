import { Inject, Injectable } from '@nestjs/common';

import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportAccountNotFoundError } from '@module/support/account/error/support-account-not-found.error';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketsRequestDto } from '@module/support/service-desk/dto/request/list-support-tickets.request.dto';
import { ListSupportTicketsResponseDto } from '@module/support/service-desk/dto/response/list-support-tickets.response.dto';
import { SupportTicketItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-item.response.dto';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { normalizeDateRange } from '@shared/system/util/date/normalize-date-range.util';

@Injectable()
export class ListSupportTicketsUseCase {
  protected readonly _type = ListSupportTicketsUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: ListSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    const { startDate, endDate } = normalizeDateRange(
      dto.startDate,
      dto.endDate,
    );
    const supportAttendant =
      await this.supportAttendantQueryRepositoryGateway.findOneByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!supportAttendant) {
      throw new SupportAccountNotFoundError();
    }

    const listResult =
      await this.supportTicketQueryRepositoryGateway.listPaginated({
        page: dto.page,
        limit: dto.limit,
        supportType: supportAttendant.supportType,
        status: dto.status ?? null,
        search: dto.search?.trim() ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
      });

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
