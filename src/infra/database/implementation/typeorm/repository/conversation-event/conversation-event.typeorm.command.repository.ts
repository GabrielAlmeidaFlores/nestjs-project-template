import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ConversationEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-event.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ConversationEventCommandRepositoryGateway } from '@module/ai/domain/repository/conversation-event/command/conversation-message.command.repository.gateway';
import { ConversationEventEntity } from '@module/ai/domain/schema/entity/conversation-event/conversation-event.entity';

@Injectable()
export class ConversationEventTypeormCommandRepository
  extends BaseTypeormCommandRepository<ConversationEventTypeormEntity>
  implements ConversationEventCommandRepositoryGateway
{
  protected readonly _type = ConversationEventTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ConversationEventTypeormEntity)
    repository: Repository<ConversationEventTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createConversationEvent(
    props: ConversationEventEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      ConversationEventEntity,
      ConversationEventTypeormEntity,
    );

    return this.create(mappedData);
  }
}
