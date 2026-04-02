import { Inject, Injectable } from '@nestjs/common';

import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketMessagesQueryParam } from '@module/support/service-desk/domain/repository/support-ticket-message/query/param/list-support-ticket-messages.query.param';
import { SupportTicketMessageQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-message/query/support-ticket-message.query.repository.gateway';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { ListSupportTicketMessagesRequestDto } from '@module/support/service-desk/dto/request/list-support-ticket-messages.request.dto';
import { ListSupportTicketMessagesResponseDto } from '@module/support/service-desk/dto/response/list-support-ticket-messages.response.dto';
import { SupportTicketMessageItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-message-item.response.dto';
import { SupportTicketNotFoundError } from '@module/support/service-desk/error/support-ticket-not-found.error';

@Injectable()
export class ListSupportTicketMessagesAdminUseCase {
  protected readonly _type = ListSupportTicketMessagesAdminUseCase.name;

  public constructor(
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportTicketMessageQueryRepositoryGateway)
    private readonly supportTicketMessageQueryRepositoryGateway: SupportTicketMessageQueryRepositoryGateway,
  ) {}

  public async execute(
    supportTicketId: SupportTicketId,
    dto: ListSupportTicketMessagesRequestDto,
  ): Promise<ListSupportTicketMessagesResponseDto> {
    const supportTicket =
      await this.supportTicketQueryRepositoryGateway.findOneByIdWithAttachments(
        supportTicketId,
      );

    if (!supportTicket) {
      throw new SupportTicketNotFoundError();
    }

    const listResult =
      await this.supportTicketMessageQueryRepositoryGateway.listPaginatedBySupportTicketId(
        new ListSupportTicketMessagesQueryParam({
          page: dto.page,
          limit: dto.limit,
          supportTicketId,
        }),
      );

    const resource = listResult.resource.map((message) =>
      SupportTicketMessageItemResponseDto.build({
        senderAuthIdentityId: message.senderAuthIdentityId.toString(),
        senderName: message.senderName,
        messageText: message.content,
        messageDateTime: message.createdAt,
      }),
    );

    return ListSupportTicketMessagesResponseDto.build({
      page: listResult.page,
      limit: listResult.limit,
      totalItems: listResult.totalItems,
      totalPages: listResult.totalPages,
      amountItemsCurrentPage: listResult.amountItemsCurrentPage,
      resource,
    });
  }
}
