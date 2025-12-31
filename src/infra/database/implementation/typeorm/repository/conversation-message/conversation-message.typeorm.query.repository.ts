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
    const limit = Number(listData.limit);
    const page = Number(listData.page);

    const skip = (page - 1) * limit;

    const qb = this.repository
      .createQueryBuilder('m')
      .innerJoin('m.conversation', 'c')
      .innerJoin('c.customer', 'customer')
      .where('c.id = :conversationId', {
        conversationId: listData.conversationId.toString(),
      })
      .andWhere('customer.id = :customerId', {
        customerId: listData.customerId.toString(),
      })
      .orderBy('m.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    const [rowsDesc, totalItems] = await qb.getManyAndCount();

    const rowsAsc = rowsDesc.slice().reverse();

    const mapped = this.mapperGateway.mapArray(
      rowsAsc,
      ConversationMessageTypeormEntity,
      GetChatMessagesToConversationQueryResult,
    );

    return new ListDataOutputModel<GetChatMessagesToConversationQueryResult>({
      page,
      limit,
      totalItems,
      resource: mapped,
    });
  }
}
