import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ConversationMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-message.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ConversationMessageCommandRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation-message/command/conversation-message.command.repository.gateway';
import { ConversationMessageEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/conversation-message.entity';

@Injectable()
export class ConversationMessageTypeormCommandRepository
  extends BaseTypeormCommandRepository<ConversationMessageTypeormEntity>
  implements ConversationMessageCommandRepositoryGateway
{
  protected readonly _type = ConversationMessageTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ConversationMessageTypeormEntity)
    repository: Repository<ConversationMessageTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createConversationMessage(
    props: ConversationMessageEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      ConversationMessageEntity,
      ConversationMessageTypeormEntity,
    );

    return this.create(mappedData);
  }
}
