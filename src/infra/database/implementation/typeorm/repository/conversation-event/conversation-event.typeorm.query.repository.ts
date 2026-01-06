import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { ConversationEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-event.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ConversationEventQueryRepositoryGateway } from '@module/ai/domain/repository/conversation-event/query/conversation.query.repository.gateway';
import { ConversationId } from '@module/ai/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ListConversationEventResponseDto } from '@module/ai/dto/response/list-conversation-event.response.dto';

@Injectable()
export class ConversationEventTypeormQueryRepository
  extends BaseTypeormQueryRepository<ConversationEventTypeormEntity>
  implements ConversationEventQueryRepositoryGateway
{
  protected readonly _type = ConversationEventTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(ConversationEventTypeormEntity)
    repository: Repository<ConversationEventTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByConversationId(
    conversationId: ConversationId,
  ): Promise<ListConversationEventResponseDto> {
    const data = await this.findOne({
      where: {
        conversation: {
          id: conversationId.toString(),
        },
      },
    });

    const mappedData = this.mapperGateway.map(
      data,
      ConversationEventTypeormEntity,
      ListConversationEventResponseDto,
    );

    return mappedData;
  }
}
