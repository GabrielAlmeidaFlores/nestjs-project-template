import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { ConversationMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-message.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ConversationMessageQueryRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation-message/query/conversation-message.query.repository.gateway';
import { ChatMessageToConversationQueryParam } from '@module/ai/infra/chat/domain/repository/conversation-message/query/param/chat-message-to-conversation.query.param';
import { GetChatMessagesToConversationQueryResult } from '@module/ai/infra/chat/domain/repository/conversation-message/query/result/get-chat-messages-to-conversation.query.result';

@Injectable()
export class ConversationMessageTypeormQueryRepository
  extends BaseTypeormQueryRepository<ConversationMessageTypeormEntity>
  implements ConversationMessageQueryRepositoryGateway
{
  protected readonly _type = ConversationMessageTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(ConversationMessageTypeormEntity)
    repository: Repository<ConversationMessageTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByConversationIdAndCustomerId(
    listData: ChatMessageToConversationQueryParam,
  ): Promise<ListDataOutputModel<GetChatMessagesToConversationQueryResult>> {
    const data = await this.list(listData, {
      where: {
        conversation: {
          id: listData.conversationId.toString(),
          customer: {
            id: listData.customerId.toString(),
          },
        },
      },
      order: {
        createdAt: 'ASC',
      },
      relations: {
        conversation: true,
      },
    });

    const mapped = this.mapperGateway.mapArray(
      data.resource,
      ConversationMessageTypeormEntity,
      GetChatMessagesToConversationQueryResult,
    );

    return new ListDataOutputModel<GetChatMessagesToConversationQueryResult>({
      ...data,
      resource: mapped,
    });
  }
}
