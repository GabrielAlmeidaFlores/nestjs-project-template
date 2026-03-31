import { Inject, Injectable } from '@nestjs/common';

import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportAccountNotFoundError } from '@module/support/account/error/support-account-not-found.error';
import { SupportTicketCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { ResolveSupportTicketResponseDto } from '@module/support/service-desk/dto/response/resolve-support-ticket.response.dto';
import { SupportTicketNotFoundError } from '@module/support/service-desk/error/support-ticket-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ResolveSupportTicketUseCase {
  protected readonly _type = ResolveSupportTicketUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportTicketCommandRepositoryGateway)
    private readonly supportTicketCommandRepositoryGateway: SupportTicketCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    supportTicketId: SupportTicketId,
  ): Promise<ResolveSupportTicketResponseDto> {
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

    const updatedSupportTicket =
      await this.supportTicketCommandRepositoryGateway.updateStatusById(
        supportTicket.id,
        SupportTicketStatusEnum.RESOLVED,
      );

    if (!updatedSupportTicket) {
      throw new SupportTicketNotFoundError();
    }

    return ResolveSupportTicketResponseDto.build({
      ticketNumber: updatedSupportTicket.ticketNumber,
      status: updatedSupportTicket.status,
      resolvedAt: updatedSupportTicket.updatedAt,
    });
  }
}
