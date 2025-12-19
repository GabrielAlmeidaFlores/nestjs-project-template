import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { GetConversationQueryResult } from '@module/ai/chat/domain/repository/conversation/query/result/get-conversation.query.result';
import { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';

@Injectable()
export class GetConversationQueryResultAutoMapperProfile {
  protected readonly _type = GetConversationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToDomainEntity = (
      source: ConversationTypeormEntity,
    ): GetConversationQueryResult => {
      return GetConversationQueryResult.build({
        id: new ConversationId(source.id),
        assistantType: source.assistantType ?? null,
        status: source.status ?? null,
        lastAIMessageAt: source.lastAIMessageAt ?? null,
        archivedAt: source.archivedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      ConversationTypeormEntity,
      GetConversationQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetConversationQueryResult,
    ): ConversationTypeormEntity => {
      return ConversationTypeormEntity.build({
        id: source.id.toString(),
        assistantType: source.assistantType ?? null,
        status: source.status ?? null,
        lastAIMessageAt: source.lastAIMessageAt ?? null,
        archivedAt: source.archivedAt ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetConversationQueryResult,
      ConversationTypeormEntity,
      mappingFunction,
    );
  }
}
