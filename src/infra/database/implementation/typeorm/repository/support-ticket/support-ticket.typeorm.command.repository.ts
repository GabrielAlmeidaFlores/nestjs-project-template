import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { SupportTicketCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { GetSupportTicketQueryResult } from '@module/support/service-desk/domain/repository/support-ticket/query/result/get-support-ticket.query.result';
import { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket/support-ticket.entity';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

@Injectable()
export class SupportTicketTypeormCommandRepository implements SupportTicketCommandRepositoryGateway {
  protected readonly _type = SupportTicketTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SupportTicketTypeormEntity)
    private readonly repository: Repository<SupportTicketTypeormEntity>,
  ) {}

  public createTransaction(
    supportTicket: SupportTicketEntity,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repository = manager.getRepository(SupportTicketTypeormEntity);

      await repository.save(
        repository.create({
          id: supportTicket.id.toString(),
          organization: {
            id: supportTicket.organizationId.toString(),
          } as OrganizationTypeormEntity,
          requesterAuthIdentity: {
            id: supportTicket.requesterAuthIdentityId.toString(),
          } as AuthIdentityTypeormEntity,
          requesterEmail: supportTicket.requesterEmail,
          requesterName: supportTicket.requesterName,
          ticketNumber: supportTicket.ticketNumber.toString(),
          supportType: supportTicket.supportType,
          subject: supportTicket.subject,
          problem: supportTicket.problem,
          description: supportTicket.description,
          status: supportTicket.status,
        }),
      );
    };
  }

  public async create(
    supportTicket: SupportTicketEntity,
  ): Promise<GetSupportTicketQueryResult> {
    const supportTicketEntity = this.repository.create({
      organization: {
        id: supportTicket.organizationId.toString(),
      } as OrganizationTypeormEntity,
      requesterAuthIdentity: {
        id: supportTicket.requesterAuthIdentityId.toString(),
      } as AuthIdentityTypeormEntity,
      requesterEmail: supportTicket.requesterEmail,
      requesterName: supportTicket.requesterName,
      id: supportTicket.id.toString(),
      ticketNumber: supportTicket.ticketNumber.toString(),
      supportType: supportTicket.supportType,
      subject: supportTicket.subject,
      problem: supportTicket.problem,
      description: supportTicket.description,
      status: supportTicket.status,
    });

    const createdSupportTicket =
      await this.repository.save(supportTicketEntity);

    return GetSupportTicketQueryResult.build({
      id: new SupportTicketId(createdSupportTicket.id),
      ticketNumber: createdSupportTicket.ticketNumber,
      supportType: createdSupportTicket.supportType,
      requesterName: createdSupportTicket.requesterName,
      requesterEmail: createdSupportTicket.requesterEmail,
      subject: createdSupportTicket.subject,
      problem: createdSupportTicket.problem,
      description: createdSupportTicket.description,
      status: createdSupportTicket.status,
      createdAt: createdSupportTicket.createdAt,
      updatedAt: createdSupportTicket.updatedAt,
      attachments: null,
    });
  }

  public updateStatusByIdTransaction(
    supportTicketId: SupportTicketId,
    status: SupportTicketStatusEnum,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repository = manager.getRepository(SupportTicketTypeormEntity);

      await repository.update(supportTicketId.toString(), {
        status,
      });
    };
  }

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
