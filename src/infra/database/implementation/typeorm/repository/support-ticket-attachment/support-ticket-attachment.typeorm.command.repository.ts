import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { SupportTicketAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-attachment.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { SupportTicketAttachmentCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-attachment/command/support-ticket-attachment.command.repository.gateway';
import { SupportTicketAttachmentEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket-attachment/support-ticket-attachment.entity';

@Injectable()
export class SupportTicketAttachmentTypeormCommandRepository implements SupportTicketAttachmentCommandRepositoryGateway {
  protected readonly _type =
    SupportTicketAttachmentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SupportTicketAttachmentTypeormEntity)
    private readonly repository: Repository<SupportTicketAttachmentTypeormEntity>,
  ) {}

  public createManyTransaction(
    supportTicketAttachments: SupportTicketAttachmentEntity[],
  ): TransactionType {
    return async (executor: unknown) => {
      if (supportTicketAttachments.length === 0) {
        return;
      }

      const manager = executor as EntityManager;
      const repository = manager.getRepository(
        SupportTicketAttachmentTypeormEntity,
      );
      const entities = repository.create(
        supportTicketAttachments.map((supportTicketAttachment) => ({
          supportTicket: {
            id: supportTicketAttachment.supportTicketId.toString(),
          } as SupportTicketTypeormEntity,
          fileName: supportTicketAttachment.fileName,
        })),
      );

      await repository.save(entities);
    };
  }

  public async createMany(
    supportTicketAttachments: SupportTicketAttachmentEntity[],
  ): Promise<void> {
    if (supportTicketAttachments.length === 0) {
      return;
    }

    const entities = this.repository.create(
      supportTicketAttachments.map((supportTicketAttachment) => ({
        supportTicket: {
          id: supportTicketAttachment.supportTicketId.toString(),
        } as SupportTicketTypeormEntity,
        fileName: supportTicketAttachment.fileName,
      })),
    );

    await this.repository.save(entities);
  }
}
