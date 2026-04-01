import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { SupportTicketMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-message.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { SupportTicketMessageCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-message/command/support-ticket-message.command.repository.gateway';
import { CreateSupportTicketMessageCommandParamType } from '@module/support/service-desk/domain/repository/support-ticket-message/command/type/input/create-support-ticket-message.command.param';
import { GetSupportTicketMessageQueryResult } from '@module/support/service-desk/domain/repository/support-ticket-message/query/result/get-support-ticket-message.query.result';

@Injectable()
export class SupportTicketMessageTypeormCommandRepository implements SupportTicketMessageCommandRepositoryGateway {
  protected readonly _type = SupportTicketMessageTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SupportTicketMessageTypeormEntity)
    private readonly repository: Repository<SupportTicketMessageTypeormEntity>,
  ) {}

  public createTransaction(
    param: CreateSupportTicketMessageCommandParamType,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repository = manager.getRepository(
        SupportTicketMessageTypeormEntity,
      );

      await repository.save(
        repository.create({
          supportTicket: {
            id: param.supportTicketId.toString(),
          } as SupportTicketTypeormEntity,
          senderAuthIdentity: {
            id: param.senderAuthIdentityId.toString(),
          } as AuthIdentityTypeormEntity,
          senderName: param.senderName,
          content: param.content,
        }),
      );
    };
  }

  public async create(
    param: CreateSupportTicketMessageCommandParamType,
  ): Promise<GetSupportTicketMessageQueryResult> {
    const createdMessage = await this.repository.save(
      this.repository.create({
        supportTicket: {
          id: param.supportTicketId.toString(),
        } as SupportTicketTypeormEntity,
        senderAuthIdentity: {
          id: param.senderAuthIdentityId.toString(),
        } as AuthIdentityTypeormEntity,
        senderName: param.senderName,
        content: param.content,
      }),
    );

    return GetSupportTicketMessageQueryResult.build({
      senderName: createdMessage.senderName,
      content: createdMessage.content,
      createdAt: createdMessage.createdAt,
    });
  }
}
