import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ConversationToolPolicyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-tool-policy.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ConversationToolPolicyCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-tool-policy/command/conversation-message.command.repository.gateway';
import { ConversationToolPolicyEntity } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/conversation-tool-policy.entity';
import { ConversationToolPolicyId } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/value-object/conversation-tool-policy-id/conversation-tool-policy-id.value-object';

@Injectable()
export class ConversationToolPolicyTypeormCommandRepository
  extends BaseTypeormCommandRepository<ConversationToolPolicyTypeormEntity>
  implements ConversationToolPolicyCommandRepositoryGateway
{
  protected readonly _type =
    ConversationToolPolicyTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ConversationToolPolicyTypeormEntity)
    repository: Repository<ConversationToolPolicyTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createConversationToolPolicy(
    props: ConversationToolPolicyEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      ConversationToolPolicyEntity,
      ConversationToolPolicyTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateConversationToolPolicy(
    id: ConversationToolPolicyId,
    props: ConversationToolPolicyEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      ConversationToolPolicyEntity,
      ConversationToolPolicyTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
