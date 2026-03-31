import { Inject, Injectable } from '@nestjs/common';

import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportAccountNotFoundError } from '@module/support/account/error/support-account-not-found.error';
import { SupportTicketCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketMessageCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-message/command/support-ticket-message.command.repository.gateway';
import { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { CreateSupportTicketMessageRequestDto } from '@module/support/service-desk/dto/request/create-support-ticket-message.request.dto';
import { SupportTicketMessageItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-message-item.response.dto';
import { SupportTicketAlreadyResolvedError } from '@module/support/service-desk/error/support-ticket-already-resolved.error';
import { SupportTicketNotFoundError } from '@module/support/service-desk/error/support-ticket-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSupportTicketMessageUseCase {
  protected readonly _type = CreateSupportTicketMessageUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportTicketMessageCommandRepositoryGateway)
    private readonly supportTicketMessageCommandRepositoryGateway: SupportTicketMessageCommandRepositoryGateway,
    @Inject(SupportTicketCommandRepositoryGateway)
    private readonly supportTicketCommandRepositoryGateway: SupportTicketCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    supportTicketId: SupportTicketId,
    dto: CreateSupportTicketMessageRequestDto,
  ): Promise<SupportTicketMessageItemResponseDto> {
    const supportAttendant =
      await this.supportAttendantQueryRepositoryGateway.findOneByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!supportAttendant) {
      throw new SupportAccountNotFoundError();
    }

    const supportTicket =
      await this.supportTicketQueryRepositoryGateway.findOneByIdAndSupportType(
        supportTicketId,
        supportAttendant.supportType,
      );

    if (!supportTicket) {
      throw new SupportTicketNotFoundError();
    }

    if (supportTicket.status === SupportTicketStatusEnum.RESOLVED) {
      throw new SupportTicketAlreadyResolvedError();
    }

    const createdMessage =
      await this.supportTicketMessageCommandRepositoryGateway.create({
        supportTicketId,
        senderAuthIdentityId: dto.senderAuthIdentityId,
        senderName: dto.senderName,
        senderType: 'support',
        content: dto.messageText,
      });

    if (supportTicket.status === SupportTicketStatusEnum.WAITING_RESPONSE) {
      await this.supportTicketCommandRepositoryGateway.updateStatusById(
        supportTicket.id,
        SupportTicketStatusEnum.IN_PROGRESS,
      );
    }

    return SupportTicketMessageItemResponseDto.build({
      senderName: createdMessage.senderName,
      messageText: createdMessage.content,
      messageDateTime: createdMessage.createdAt,
    });
  }
}
