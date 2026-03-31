import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { SupportTicketCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { GetSupportTicketQueryResult } from '@module/support/service-desk/domain/repository/support-ticket/query/result/get-support-ticket.query.result';
import { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

@Injectable()
export class SupportTicketTypeormCommandRepository implements SupportTicketCommandRepositoryGateway {
  protected readonly _type = SupportTicketTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SupportTicketTypeormEntity)
    private readonly repository: Repository<SupportTicketTypeormEntity>,
  ) {}

  public async updateStatusById(
    supportTicketId: SupportTicketId,
    status: SupportTicketStatusEnum,
  ): Promise<GetSupportTicketQueryResult | null> {
    const supportTicket = await this.repository.findOne({
      where: {
        id: supportTicketId.toString(),
      },
    });

    if (supportTicket === null) {
      return null;
    }

    supportTicket.status = status;
    const updatedSupportTicket = await this.repository.save(supportTicket);

    return GetSupportTicketQueryResult.build({
      id: new SupportTicketId(updatedSupportTicket.id),
      ticketNumber: updatedSupportTicket.ticketNumber,
      supportType: updatedSupportTicket.supportType,
      requesterName: updatedSupportTicket.requesterName,
      requesterEmail: updatedSupportTicket.requesterEmail,
      subject: updatedSupportTicket.subject,
      problem: updatedSupportTicket.problem,
      description: updatedSupportTicket.description,
      status: updatedSupportTicket.status,
      createdAt: updatedSupportTicket.createdAt,
      updatedAt: updatedSupportTicket.updatedAt,
      attachments: null,
    });
  }
}
