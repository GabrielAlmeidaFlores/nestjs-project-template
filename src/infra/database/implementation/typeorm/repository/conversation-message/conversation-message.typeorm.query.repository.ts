import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { ConversationMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-message.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ConversationMessageQueryRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-message/query/conversation.query.repository.gateway';
import { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ListConversationMessageResponseDto } from '@module/ai/chat/dto/response/list-conversation-message.response.dto';

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

  public async listByConversationId(
    conversationId: ConversationId,
  ): Promise<ListConversationMessageResponseDto> {
    const data = await this.findOne({
      where: {
        conversation: {
          id: conversationId.toString(),
        },
      },
    });

    const mappedData = this.mapperGateway.map(
      data,
      ConversationMessageTypeormEntity,
      ListConversationMessageResponseDto,
    );

    return mappedData;
  }
}
