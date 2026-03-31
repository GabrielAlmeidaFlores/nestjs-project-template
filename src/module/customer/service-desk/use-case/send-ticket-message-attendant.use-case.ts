import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportTicketCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { GetSupportTicketDetailQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail.query.result';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketMessageCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket-message/command/support-ticket-message.command.repository.gateway';
import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { TicketMessageSenderTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/enum/ticket-message-sender-type.enum';
import { SupportTicketMessageEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/support-ticket-message.entity';
import { SendTicketMessageRequestDto } from '@module/customer/service-desk/dto/request/send-ticket-message.request.dto';
import { SendSupportTicketMessageResponseDto } from '@module/customer/service-desk/dto/response/send-support-ticket-message.response.dto';
import { SupportAttendantNotFoundError } from '@module/customer/service-desk/error/support-attendant-not-found.error';
import { SupportTicketInvalidStatusError } from '@module/customer/service-desk/error/support-ticket-invalid-status.error';
import { SupportTicketInvalidSupportTypeError } from '@module/customer/service-desk/error/support-ticket-invalid-support-type.error';
import { SupportTicketNotFoundError } from '@module/customer/service-desk/error/support-ticket-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class SendTicketMessageAttendantUseCase {
  protected readonly _type = SendTicketMessageAttendantUseCase.name;

  public constructor(
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportTicketCommandRepositoryGateway)
    private readonly supportTicketCommandRepositoryGateway: SupportTicketCommandRepositoryGateway,
    @Inject(SupportTicketMessageCommandRepositoryGateway)
    private readonly supportTicketMessageCommandRepositoryGateway: SupportTicketMessageCommandRepositoryGateway,
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    supportTicketId: SupportTicketId,
    dto: SendTicketMessageRequestDto,
  ): Promise<SendSupportTicketMessageResponseDto> {
    const attendant =
      await this.supportAttendantQueryRepositoryGateway.findOneSupportAttendantByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!attendant) {
      throw new SupportAttendantNotFoundError();
    }

    const ticket = await this.fetchTicketOrThrow(supportTicketId);

    this.assertTicketNotResolved(ticket);
    this.assertSupportTypeMatch(ticket.supportType, attendant.supportType);

    const message = new SupportTicketMessageEntity({
      supportTicketId: ticket.id,
      senderAuthIdentityId: sessionData.authIdentityId,
      senderName: attendant.name,
      senderType: TicketMessageSenderTypeEnum.ATTENDANT,
      content: dto.content,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.supportTicketMessageCommandRepositoryGateway.createSupportTicketMessage(
        message,
      ),
      this.supportTicketCommandRepositoryGateway.updateSupportTicketStatus(
        ticket.id,
        SupportTicketStatusEnum.AWAITING_RESPONSE,
      ),
    ]);

    await transaction.commit();

    return SendSupportTicketMessageResponseDto.build({
      supportTicketId: ticket.id,
    });
  }

  private async fetchTicketOrThrow(
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailQueryResult> {
    const ticket =
      await this.supportTicketQueryRepositoryGateway.findOneSupportTicketById(
        supportTicketId,
      );

    if (!ticket) {
      throw new SupportTicketNotFoundError();
    }

    return ticket;
  }

  private assertTicketNotResolved(
    ticket: GetSupportTicketDetailQueryResult,
  ): void {
    if (ticket.status === SupportTicketStatusEnum.RESOLVED) {
      throw new SupportTicketInvalidStatusError();
    }
  }

  private assertSupportTypeMatch(
    ticketSupportType: SupportTypeEnum,
    attendantSupportType: SupportTypeEnum,
  ): void {
    if (ticketSupportType !== attendantSupportType) {
      throw new SupportTicketInvalidSupportTypeError();
    }
  }
}
