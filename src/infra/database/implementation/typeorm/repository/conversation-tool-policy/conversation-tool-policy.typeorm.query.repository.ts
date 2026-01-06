import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { ConversationToolPolicyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-tool-policy.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ConversationToolPolicyQueryRepositoryGateway } from '@module/ai/domain/repository/conversation-tool-policy/query/conversation.query.repository.gateway';
import { GetConversationToolPolicyQueryResult } from '@module/ai/domain/repository/conversation-tool-policy/query/result/get-conversation-tool-policy.query.result';
import { ConversationId } from '@module/ai/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ConversationToolPolicyId } from '@module/ai/domain/schema/entity/conversation-tool-policy/value-object/conversation-tool-policy-id/conversation-tool-policy-id.value-object';

@Injectable()
export class ConversationToolPolicyTypeormQueryRepository
  extends BaseTypeormQueryRepository<ConversationToolPolicyTypeormEntity>
  implements ConversationToolPolicyQueryRepositoryGateway
{
  protected readonly _type = ConversationToolPolicyTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(ConversationToolPolicyTypeormEntity)
    repository: Repository<ConversationToolPolicyTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findById(
    id: ConversationToolPolicyId,
  ): Promise<GetConversationToolPolicyQueryResult> {
    const data = await this.findOne({
      where: {
        id: id.toString(),
      },
    });

    const mappedData = this.mapperGateway.map(
      data,
      ConversationToolPolicyTypeormEntity,
      GetConversationToolPolicyQueryResult,
    );

    return mappedData;
  }

  public async getByConversationId(
    conversationId: ConversationId,
  ): Promise<GetConversationToolPolicyQueryResult> {
    const data = await this.findOne({
      where: {
        conversation: {
          id: conversationId.toString(),
        },
      },
      relations: {
        conversation: true,
      },
    });

    return this.mapperGateway.map(
      data,
      ConversationToolPolicyTypeormEntity,
      GetConversationToolPolicyQueryResult,
    );
  }
}
