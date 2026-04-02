import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportAccountNotFoundError } from '@module/support/account/error/support-account-not-found.error';
import { SupportTicketCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketMessageCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-message/command/support-ticket-message.command.repository.gateway';
import { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { SupportTicketMessageEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket-message/support-ticket-message.entity';
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
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
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

    const supportTicketMessage = new SupportTicketMessageEntity({
      supportTicketId,
      senderAuthIdentityId: sessionData.authIdentityId,
      senderName: supportAttendant.name,
      content: dto.messageText,
    });

    const transactionEvents = [
      this.supportTicketMessageCommandRepositoryGateway.createTransaction({
        supportTicketId: supportTicketMessage.supportTicketId,
        senderAuthIdentityId: supportTicketMessage.senderAuthIdentityId,
        senderName: supportTicketMessage.senderName,
        content: supportTicketMessage.content,
      }),
    ];

    if (supportTicket.status === SupportTicketStatusEnum.AWAITING_RESPONSE) {
      transactionEvents.push(
        this.supportTicketCommandRepositoryGateway.updateStatusByIdTransaction(
          supportTicket.id,
          SupportTicketStatusEnum.IN_PROGRESS,
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactionEvents);
    await transaction.commit();

    return SupportTicketMessageItemResponseDto.build({
      senderAuthIdentityId:
        supportTicketMessage.senderAuthIdentityId.toString(),
      senderName: supportTicketMessage.senderName,
      messageText: supportTicketMessage.content,
      messageDateTime: supportTicketMessage.createdAt,
    });
  }
}
