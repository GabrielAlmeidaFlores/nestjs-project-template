import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ConversationQueryRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation/query/conversation.query.repository.gateway';
import { GetConversationWithRelationsQueryResult } from '@module/ai/infra/chat/domain/repository/conversation/query/result/get-conversation-with-relation.query.result';
import { GetConversationQueryResult } from '@module/ai/infra/chat/domain/repository/conversation/query/result/get-conversation.query.result';
import { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

@Injectable()
export class ConversationTypeormQueryRepository
  extends BaseTypeormQueryRepository<ConversationTypeormEntity>
  implements ConversationQueryRepositoryGateway
{
  protected readonly _type = ConversationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(ConversationTypeormEntity)
    repository: Repository<ConversationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findById(
    id: ConversationId,
  ): Promise<GetConversationQueryResult | null> {
    const data = await this.findOne({
      where: {
        id: id.toString(),
      },
    });

    if (data === null) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      ConversationTypeormEntity,
      GetConversationQueryResult,
    );

    return mappedData;
  }

  public async findByIdAndCustomerId(
    id: ConversationId,
    customerId: CustomerId,
  ): Promise<GetConversationWithRelationsQueryResult | null> {
    const data = await this.findOne({
      where: {
        id: id.toString(),
        customer: {
          id: customerId.toString(),
        },
      },
    });

    if (data === null) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      ConversationTypeormEntity,
      GetConversationWithRelationsQueryResult,
    );

    return mappedData;
  }
}
