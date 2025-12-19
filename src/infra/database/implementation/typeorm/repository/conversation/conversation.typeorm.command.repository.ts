import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ConversationCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation/command/conversation.command.repository.gateway';
import { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';

@Injectable()
export class ConversationTypeormCommandRepository
  extends BaseTypeormCommandRepository<ConversationTypeormEntity>
  implements ConversationCommandRepositoryGateway
{
  protected readonly _type = ConversationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ConversationTypeormEntity)
    repository: Repository<ConversationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createConversation(props: ConversationEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      ConversationEntity,
      ConversationTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateConversation(
    conversationId: ConversationId,
    props: ConversationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      ConversationEntity,
      ConversationTypeormEntity,
    );

    return this.update(conversationId.toString(), mappedData);
  }

  public updateLastAIMessageAt(
    id: ConversationId,
    lastAIMessageAt: Date,
  ): TransactionType {
    return this.update(id.toString(), {
      lastAIMessageAt,
    });
  }

  public softArchive(id: ConversationId, archivedAt: Date): TransactionType {
    return this.update(id.toString(), { archivedAt });
  }
}
