import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ConversationQueryRepositoryGateway } from '@module/ai/chat/domain/repository/conversation/query/conversation.query.repository.gateway';
import { ConversationQueryParam } from '@module/ai/chat/domain/repository/conversation/query/param/conversation.query.param';
import { GetConversationWithRelationsQueryResult } from '@module/ai/chat/domain/repository/conversation/query/result/get-conversation-with-relation.query.result';
import { GetConversationQueryResult } from '@module/ai/chat/domain/repository/conversation/query/result/get-conversation.query.result';
import { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
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

  public async listConversationById(
    listData: ConversationQueryParam,
  ): Promise<ListDataOutputModel<GetConversationQueryResult>> {
    const limit = Number(listData.limit);
    const page = Number(listData.page);
    const skip = (page - 1) * limit;

    const qb = this.repository
      .createQueryBuilder('c')
      .innerJoin('c.customer', 'customer')
      .where('customer.id = :customerId', {
        customerId: listData.customerId.toString(),
      });

    if (listData.title !== null && listData.title !== undefined) {
      // Mantém mesma regra atual (LIKE), mas no QB
      qb.andWhere('c.title LIKE :title', {
        title: `%${listData.title}%`,
      });
    }

    // Se você quiser ordenar pelo "mais recente relevante" (atividade),
    // troque createdAt por lastAIMessageAt (ou COALESCE).
    // Por enquanto sigo seu padrão atual (sortField=createdAt).
    qb.orderBy('c.createdAt', 'DESC').skip(skip).take(limit);

    const [rowsDesc, totalItems] = await qb.getManyAndCount();

    // Devolve em ASC (mais antigo -> mais novo) para UI manter o "último por último"
    const rowsAsc = rowsDesc.slice().reverse();

    const mapped = this.mapperGateway.mapArray(
      rowsAsc,
      ConversationTypeormEntity,
      GetConversationQueryResult,
    );

    return new ListDataOutputModel<GetConversationQueryResult>({
      page,
      limit,
      totalItems,
      resource: mapped,
    });
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
